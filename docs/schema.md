# Catalog Schema

This document explains the fields used in `catalog/mosaic.json`.

## Schema fields

### `name`
Public project name.

### `description`
Two short sentences:
1. what the project does
2. why it matters

### `url`
List of public project URLs such as:
- GitHub
- Hugging Face
- website
- PyPI
- Zenodo

### `platform`
List of platform labels matching the same order as `url` when possible.

See:
- [`taxonomy/platform.json`](../taxonomy/platform.json)

### `type`
List of project types.

See:
- [`taxonomy/types.json`](../taxonomy/types.json)

### `domain`
List of domains.

See:
- [`taxonomy/domains.json`](../taxonomy/domains.json)

### `tags`
Short keywords for search and filtering.

### `affiliations`
Broad institutions or organizations.

### `sub_affiliations`
More specific units such as departments, labs, centers, programs, or units.

### `language`
Programming or implementation languages.

### `license`
Project license such as `MIT`, `Apache-2.0`, or `GPL-3.0-only`. May be `null` if unknown.

### `doi`
DOI string if available, otherwise `null`.

### `status`
One value from [`taxonomy/status.json`](../taxonomy/status.json)

### `created_at`
Creation date in `YYYY-MM-DD`.

## Practical rules

- `url` and `platform` should usually have the same length
- `type`, `domain`, and `language` can have more than one value
- use taxonomy labels instead of inventing new ones
- if a needed label is missing, propose it in the taxonomy
