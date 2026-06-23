import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { buildMaps, transformCatalog } from '../src/services/mosaicTransform.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const GITHUB_API = 'https://api.github.com';
const CATALOG_DIR = join(__dirname, '..', '..', 'catalog');
const TAXONOMY_DIR = join(__dirname, '..', '..', 'taxonomy');
const OUTPUT_PATH = join(__dirname, '..', 'src', 'data', 'stars-ranking.json');

const readJson = (p) => JSON.parse(readFileSync(p, 'utf-8'));

/**
 * Build the GitHub stars ranking directly from catalog/mosaic.json (the source
 * of truth in this repo). Fetches live star counts for GitHub-hosted projects
 * and writes src/data/stars-ranking.json, consumed by the Rankings page.
 */
async function syncStarsRanking() {
  console.log('🌟 Building stars ranking from catalog/mosaic.json...');

  try {
    const maps = buildMaps({
      domains: readJson(join(TAXONOMY_DIR, 'domains.json')),
      types: readJson(join(TAXONOMY_DIR, 'types.json')),
      platforms: readJson(join(TAXONOMY_DIR, 'platform.json')),
      statuses: readJson(join(TAXONOMY_DIR, 'status.json')),
    });
    const projects = transformCatalog(readJson(join(CATALOG_DIR, 'mosaic.json')), maps);

    const githubProjects = projects.filter((p) => p.platform === 'github' && p.url);
    console.log(`  Found ${githubProjects.length} GitHub projects`);

    const starData = [];
    let successCount = 0;

    for (const project of githubProjects) {
      try {
        const urlMatch = project.url.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!urlMatch) {
          console.warn(`  ⚠ Invalid GitHub URL for ${project.name}: ${project.url}`);
          continue;
        }
        const [, owner, repoRaw] = urlMatch;
        const repo = repoRaw.replace(/\.git$/, '');

        const repoResponse = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'MOSAIC-Website',
            ...(process.env.GITHUB_TOKEN && {
              Authorization: `token ${process.env.GITHUB_TOKEN}`,
            }),
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
            type: project.type,
            status: project.status,
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            watchers: repoData.watchers_count,
            language: repoData.language,
            license: project.license,
            tags: project.tags,
            lastUpdated: new Date().toISOString(),
          });
          successCount++;
        } else {
          console.warn(`  ⚠ Failed to fetch stars for ${project.name}: ${repoResponse.status}`);
        }

        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`  ✗ Error fetching stars for ${project.name}:`, error.message);
      }
    }

    starData.sort((a, b) => b.stars - a.stars);
    const totalStars = starData.reduce((sum, p) => sum + p.stars, 0);

    writeFileSync(OUTPUT_PATH, JSON.stringify(starData, null, 2) + '\n');
    console.log(`✓ Wrote ${successCount} projects, total stars: ${totalStars}`);
  } catch (error) {
    console.error('✗ Error building stars ranking:', error.message);
    // Don't fail the build.
    process.exit(0);
  }
}

syncStarsRanking();
