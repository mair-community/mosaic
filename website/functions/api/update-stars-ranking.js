/**
 * Cloudflare Pages Function: Update GitHub Stars Ranking
 * 
 * For scheduled execution, you'll need to set up a separate Cloudflare Worker
 * with a Cron Trigger, or use an external cron service to call this endpoint.
 * 
 * This can be triggered via: POST /api/update-stars-ranking
 */

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'mair-community';
const REPO_NAME = 'mosaic';
const FILE_PATH = 'catalog/mosaic.json';

// MOSAIC stores platform/url as arrays; flatten to the primary value.
const flattenProject = (p) => ({
  ...p,
  url: Array.isArray(p.url) ? p.url[0] : p.url,
  platform: Array.isArray(p.platform) ? p.platform[0] : p.platform,
  domain: Array.isArray(p.domain) ? p.domain[0] : p.domain,
});
const isGithub = (p) =>
  Array.isArray(p.platform) ? p.platform.includes('github') : p.platform === 'github';

export async function onRequest(context) {
  const { env } = context;
  
  console.log('Stars ranking update started at:', new Date().toISOString());

  try {
    // Fetch the software.json from the repository
    const response = await fetch(
      `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'MOSAIC-Website',
          ...(env.GITHUB_TOKEN && {
            'Authorization': `token ${env.GITHUB_TOKEN}`
          })
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = atob(data.content);
    const projects = JSON.parse(content);

    // Filter GitHub projects (tolerating MOSAIC's array schema)
    const githubProjects = projects.filter(isGithub).map(flattenProject).filter(p => p.url);

    console.log(`Found ${githubProjects.length} GitHub projects to check`);

    // Fetch star counts for all GitHub projects
    const starData = [];
    let successCount = 0;
    let errorCount = 0;

    for (const project of githubProjects) {
      try {
        // Extract owner/repo from GitHub URL
        const urlMatch = project.url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!urlMatch) {
          console.warn(`Invalid GitHub URL for ${project.name}: ${project.url}`);
          continue;
        }

        const [, owner, repo] = urlMatch;
        const repoUrl = `${GITHUB_API}/repos/${owner}/${repo}`;

        const repoResponse = await fetch(repoUrl, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'MOSAIC-Website',
            ...(env.GITHUB_TOKEN && {
              'Authorization': `token ${env.GITHUB_TOKEN}`
            })
          },
        });

        if (repoResponse.ok) {
          const repoData = await repoResponse.json();
          starData.push({
            name: project.name,
            url: project.url,
            description: project.description,
            domain: project.domain,
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            lastUpdated: repoData.updated_at
          });
          successCount++;
        } else {
          console.warn(`Failed to fetch ${owner}/${repo}: ${repoResponse.status}`);
          errorCount++;
        }

        // Rate limiting - small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (err) {
        console.error(`Error fetching ${project.name}:`, err.message);
        errorCount++;
      }
    }

    // Sort by stars descending
    starData.sort((a, b) => b.stars - a.stars);

    console.log(`Fetched ${successCount} projects successfully, ${errorCount} errors`);

    // Trigger rebuild to update the stars-ranking.json
    const deployHookUrl = env.CF_PAGES_WEBHOOK_URL;

    if (deployHookUrl) {
      await fetch(deployHookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Rebuild triggered');
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Stars ranking update completed',
      stats: {
        total: githubProjects.length,
        success: successCount,
        errors: errorCount
      },
      ranking: starData.slice(0, 10), // Return top 10
      timestamp: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in stars ranking update:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
