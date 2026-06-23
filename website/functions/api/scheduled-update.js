/**
 * Cloudflare Pages Function: Trigger rebuild when updates available
 * 
 * For scheduled execution, you'll need to set up a separate Cloudflare Worker
 * with a Cron Trigger, or use an external cron service to call this endpoint.
 * 
 * This can be triggered via: POST /api/scheduled-update
 */

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'mair-community';
const REPO_NAME = 'mosaic';
const FILE_PATH = 'catalog/mosaic.json';

export async function onRequest(context) {
  const { env } = context;
  
  console.log('Scheduled update check started at:', new Date().toISOString());

  try {
    // Fetch the latest software.json metadata from GitHub
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
    const newSha = data.sha;

    console.log('Checked for updates');
    console.log(`  Current SHA: ${newSha}`);

    // Trigger Cloudflare Pages rebuild via Deploy Hook
    const deployHookUrl = env.CF_PAGES_WEBHOOK_URL;

    if (deployHookUrl) {
      const rebuildResponse = await fetch(deployHookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!rebuildResponse.ok) {
        throw new Error(`Failed to trigger rebuild: ${rebuildResponse.status}`);
      }

      console.log('Rebuild triggered successfully');
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Update detected and rebuild triggered',
        sha: newSha,
        timestamp: new Date().toISOString()
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      console.log('No CF_PAGES_WEBHOOK_URL configured, skipping rebuild trigger');
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Update check completed (no webhook configured)',
        sha: newSha,
        timestamp: new Date().toISOString()
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('Error in scheduled update:', error);
    
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
