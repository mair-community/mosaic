/**
 * Netlify Scheduled Function: Update GitHub Stars Ranking
 * Runs every hour to fetch GitHub stars data and trigger rebuild
 * 
 * This fetches star counts for all GitHub projects and triggers a rebuild
 * which will update the rankings JSON file during the build process.
 * 
 * Cron schedule: "0 * * * *" (every hour at minute 0)
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

export const handler = async (event) => {
  console.log('Scheduled stars ranking update started at:', new Date().toISOString());

  try {
    // Fetch the software.json from the repository
    const response = await fetch(
      `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'MAIR-Website',
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `token ${process.env.GITHUB_TOKEN}`
          })
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
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
            'User-Agent': 'MAIR-Website',
            ...(process.env.GITHUB_TOKEN && {
              'Authorization': `token ${process.env.GITHUB_TOKEN}`
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
            platform: project.platform,
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            language: repoData.language,
            lastUpdated: new Date().toISOString(),
          });
          successCount++;
        } else {
          console.warn(`Failed to fetch stars for ${project.name}: ${repoResponse.status}`);
          errorCount++;
        }

        // Rate limiting: small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.error(`Error fetching stars for ${project.name}:`, error.message);
        errorCount++;
      }
    }

    console.log(`Stars update completed: ${successCount} successful, ${errorCount} errors`);

    // Sort by stars descending
    starData.sort((a, b) => b.stars - a.stars);

    // Check if we have updated data and trigger rebuild
    const buildHookUrl = process.env.NETLIFY_BUILD_HOOK;
    const currentStarsCount = starData.reduce((sum, p) => sum + p.stars, 0);
    const lastStarsCount = parseInt(process.env.LAST_STARS_COUNT || '0');

    if (currentStarsCount !== lastStarsCount && buildHookUrl) {
      console.log('Stars data changed, triggering rebuild...');
      console.log(`  Previous total stars: ${lastStarsCount}`);
      console.log(`  New total stars: ${currentStarsCount}`);

      const buildResponse = await fetch(buildHookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trigger_title: 'Scheduled update: GitHub stars ranking changed'
        })
      });

      if (buildResponse.ok) {
        console.log('✓ Rebuild triggered successfully');

        return {
          statusCode: 200,
          body: JSON.stringify({
            success: true,
            action: 'rebuild_triggered',
            message: 'Stars ranking updated, rebuild triggered',
            projectsChecked: githubProjects.length,
            successCount,
            errorCount,
            totalStars: currentStarsCount,
            previousStars: lastStarsCount,
            starData: starData.slice(0, 10), // Return top 10 for verification
            timestamp: new Date().toISOString(),
          }),
        };
      } else {
        throw new Error(`Failed to trigger build: ${buildResponse.status}`);
      }
    } else {
      console.log('No significant changes in stars data or no build hook configured');

      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          action: 'no_rebuild_needed',
          message: 'Stars data unchanged or no build hook configured',
          projectsChecked: githubProjects.length,
          successCount,
          errorCount,
          totalStars: currentStarsCount,
          timestamp: new Date().toISOString(),
        }),
      };
    }
  } catch (error) {
    console.error('Error in stars ranking update:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      }),
    };
  }
};
