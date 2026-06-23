/**
 * API Service for Netlify Functions
 * Handles communication with serverless functions
 */

const API_BASE = '/.netlify/functions';

/**
 * Check for updates in software.json from GitHub
 */
export async function checkForUpdates() {
  try {
    const response = await fetch(`${API_BASE}/check-updates`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error checking for updates:', error);
    throw error;
  }
}

/**
 * Fetch GitHub statistics for projects
 */
export async function fetchGitHubStats(projects) {
  try {
    const response = await fetch(`${API_BASE}/fetch-github-stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projects }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    throw error;
  }
}

/**
 * Get repositories ranked by GitHub stars
 */
export async function getRankingByStars() {
  try {
    const response = await fetch(`${API_BASE}/rank-by-stars`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching rankings:', error);
    throw error;
  }
}

/**
 * Compare local data with remote data
 */
export function compareDataVersions(localData, remoteData) {
  const localProjects = new Map(localData.map(p => [p.name, p]));
  const remoteProjects = new Map(remoteData.map(p => [p.name, p]));
  
  const added = [];
  const removed = [];
  const updated = [];
  
  // Find added and updated projects
  for (const [name, remoteProject] of remoteProjects) {
    const localProject = localProjects.get(name);
    
    if (!localProject) {
      added.push(remoteProject);
    } else if (JSON.stringify(localProject) !== JSON.stringify(remoteProject)) {
      updated.push({
        name,
        local: localProject,
        remote: remoteProject,
      });
    }
  }
  
  // Find removed projects
  for (const [name, localProject] of localProjects) {
    if (!remoteProjects.has(name)) {
      removed.push(localProject);
    }
  }
  
  return {
    hasChanges: added.length > 0 || removed.length > 0 || updated.length > 0,
    added,
    removed,
    updated,
    summary: {
      addedCount: added.length,
      removedCount: removed.length,
      updatedCount: updated.length,
    },
  };
}
