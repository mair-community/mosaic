/**
 * Pure transform: MOSAIC catalog schema -> the website's flat project schema.
 *
 * MOSAIC (catalog/mosaic.json) models domain/type/platform/language/url as
 * arrays and uses affiliations/sub_affiliations. The website's store and
 * components expect flat string fields (p.domain, p.platform === 'github', ...).
 *
 * We flatten to the primary value for the indexed/filterable fields, map
 * domain/type slugs to human labels via the MOSAIC taxonomy, and preserve the
 * full arrays under plural keys (domains, types, platforms, urls) for future use.
 *
 * Shared by the Pinia store (runtime) and scripts/sync-stars-ranking.js (build).
 */

const first = (v) => (Array.isArray(v) ? v[0] : v)
const toArray = (v) => (Array.isArray(v) ? v : v == null ? [] : [v])
const idNameMap = (arr) =>
  Object.fromEntries((arr || []).map((x) => [x.id, x.name]))

export function buildMaps({ domains, types, platforms, statuses } = {}) {
  return {
    domain: idNameMap(domains),
    type: idNameMap(types),
    platform: idNameMap(platforms),
    status: idNameMap(statuses),
  }
}

export function transformEntry(e, maps = {}) {
  const label = (group, slug) => (maps[group] && maps[group][slug]) || slug || null

  const domainSlug = first(e.domain)
  const typeSlug = first(e.type)
  const platformSlug = first(e.platform)

  return {
    name: e.name,
    description: e.description,
    url: first(e.url) || '',
    // Keep platform/status as lowercase slugs: the store filters on
    // `platform === 'github'` and ProjectCard maps status slugs to colors.
    platform: platformSlug || null,
    status: e.status || null,
    // Map type/domain slugs to readable labels for badges and filters.
    type: label('type', typeSlug),
    domain: label('domain', domainSlug),
    tags: Array.isArray(e.tags) ? e.tags : [],
    maintainers: [],
    unit_primary: toArray(e.affiliations),
    unit_secondary: toArray(e.sub_affiliations),
    language: first(e.language) || null,
    license: e.license ?? null,
    doi: e.doi ?? null,
    created_at: e.created_at || null,
    // Full MOSAIC arrays preserved for a future multi-value UI.
    types: toArray(e.type).map((t) => label('type', t)),
    domains: toArray(e.domain).map((d) => label('domain', d)),
    platforms: toArray(e.platform),
    urls: toArray(e.url),
  }
}

export function transformCatalog(catalog, maps) {
  return (catalog || []).map((e) => transformEntry(e, maps))
}
