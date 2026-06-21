# CONTRIBUTING

Thank you for contributing to MOSAIC.

MOSAIC is meant to be simple to contribute to, while still structured enough to support search, filtering, reporting, and ecosystem analysis.

## What can be submitted

A project may be included if it is open source and clearly matches at least one of these:

- built or maintained by Moroccans
- developed in Morocco
- designed for Moroccan problems
- meaningfully used by the Moroccan AI ecosystem

## What should not be submitted

These are usually out of scope:

- private repositories
- repositories with no public license
- empty or placeholder repositories
- personal pages with no real open-source project
- duplicate entries
- projects with no meaningful AI component
- projects with no clear Moroccan connection

## Easiest way to submit

Use the **Submit project** issue template.

If you prefer, you can also open a pull request and edit:
- [`catalog/mosaic.json`](catalog/mosaic.json)
- one or more files in [`taxonomy/`](taxonomy/) if a needed category is missing

## Tips for a good submission

- keep `description` short and clear
- make the Moroccan connection concrete
- use the taxonomy files
- keep tags short and useful
- stay factual, not promotional
- keep `url` and `platform` in the same order when possible

## Catalog schema quick reference

Each entry in `catalog/mosaic.json` should look like this:

```json
{
  "name": "Project Name",
  "description": "One sentence on what it does. One sentence on why it matters.",
  "url": ["https://github.com/org/repo"],
  "platform": ["github"],
  "type": ["library"],
  "domain": ["general-purpose-ai"],
  "tags": ["open-source", "morocco", "research"],
  "affiliations": ["University Name"],
  "sub_affiliations": ["Lab Name"],
  "language": ["Python"],
  "license": "MIT",
  "doi": null,
  "status": "active",
  "created_at": "YYYY-MM-DD"
}
```

## Minimal example

```json
{
  "name": "Example Project",
  "description": "Example Project is a Python library for local language NLP. It helps make Moroccan AI tooling easier to reuse.",
  "url": ["https://github.com/example/example-project"],
  "platform": ["github"],
  "type": ["library"],
  "domain": ["language-culture-heritage"],
  "tags": ["darija", "nlp"],
  "affiliations": ["Independent"],
  "sub_affiliations": [],
  "language": ["Python"],
  "license": "MIT",
  "doi": null,
  "status": "active",
  "created_at": "2026-01-01"
}
```

## Proposing new domains or categories

If a valid label is missing in any taxonomy file, you can propose it.

Two easy options:
1. open an issue and explain what is missing
2. open a pull request and update the relevant JSON file in `taxonomy/`

Please include:
- the proposed label
- a short description
- why existing labels are not enough

## Review and acceptance criteria

Submissions are reviewed on three criteria:

- **Validity**: the project is real, public, and open source
- **Consistency**: the entry follows the schema and taxonomy
- **Accuracy**: the metadata is correct and not misleading

## Code of conduct

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
