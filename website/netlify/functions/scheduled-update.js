/**
 * Netlify Scheduled Function: Trigger rebuild when updates available
 * Runs every hour to check for updates and trigger a Netlify rebuild
 * 
 * This triggers a new build which will pull the latest catalog
 * from the mair-community/mosaic repository during the build process.
 *
 * Cron schedule: "0 * * * *" (every hour at minute 0)
 */

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'mair-community';
const REPO_NAME = 'mosaic';
const FILE_PATH = 'catalog/mosaic.json';

export const handler = async (event) => {
  console.log('Scheduled update check started at:', new Date().toISOString());

  try {
    // Fetch the latest software.json metadata from GitHub
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
    
    // Check if SHA has changed (i.e., file was updated)
    const currentSha = process.env.LAST_SOFTWARE_SHA || '';
    const newSha = data.sha;

    if (currentSha !== newSha) {
      console.log('Update detected! Triggering rebuild...');
      console.log(`  Old SHA: ${currentSha || 'none'}`);
      console.log(`  New SHA: ${newSha}`);

      // Trigger Netlify rebuild via Build Hook
      const buildHookUrl = process.env.NETLIFY_BUILD_HOOK;
      
      if (buildHookUrl) {
        const buildResponse = await fetch(buildHookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            trigger_title: 'Scheduled update: MOSAIC catalog changed'
          })
        });

        if (buildResponse.ok) {
          console.log('✓ Rebuild triggered successfully');
          
          return {
            statusCode: 200,
            body: JSON.stringify({
              success: true,
              action: 'rebuild_triggered',
              message: 'Update detected, rebuild triggered',
              oldSha: currentSha,
              newSha: newSha,
              timestamp: new Date().toISOString(),
            }),
          };
        } else {
          throw new Error(`Failed to trigger build: ${buildResponse.status}`);
        }
      } else {
        console.log('⚠ No build hook configured, skipping rebuild');
        
        return {
          statusCode: 200,
          body: JSON.stringify({
            success: true,
            action: 'update_detected_no_hook',
            message: 'Update detected but no build hook configured',
            newSha: newSha,
            timestamp: new Date().toISOString(),
          }),
        };
      }
    } else {
      console.log('No updates detected');
      
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          action: 'no_update',
          message: 'No updates available',
          sha: currentSha,
          timestamp: new Date().toISOString(),
        }),
      };
    }
  } catch (error) {
    console.error('Error in scheduled update:', error);
    
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

// The schedule is defined in netlify.toml
