#!/usr/bin/env python3
from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

try:
    import jsonschema
except ImportError:
    jsonschema = None

ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = ROOT / "catalog" / "mosaic.json"
SCHEMA_PATH = ROOT / "catalog" / "schema.json"
TAXONOMY_DIR = ROOT / "taxonomy"

def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))

def taxonomy_ids(filename: str) -> set[str]:
    return {item["id"] for item in load_json(TAXONOMY_DIR / filename)}

def validate_schema(data, schema) -> list[str]:
    if jsonschema is None:
        return ["jsonschema is not installed. Run: pip install jsonschema"]
    validator = jsonschema.Draft202012Validator(schema)
    errors = []
    for err in sorted(validator.iter_errors(data), key=lambda e: list(e.path)):
        location = " -> ".join(str(x) for x in err.path) or "<root>"
        errors.append(f"Schema error at {location}: {err.message}")
    return errors

def validate_date(value: str) -> bool:
    try:
        datetime.strptime(value, "%Y-%m-%d")
        return True
    except ValueError:
        return False

def main() -> int:
    mosaic = load_json(CATALOG_PATH)
    schema = load_json(SCHEMA_PATH)

    errors = []
    errors.extend(validate_schema(mosaic, schema))

    allowed = {
        "platform": taxonomy_ids("platform.json"),
        "type": taxonomy_ids("types.json"),
        "domain": taxonomy_ids("domains.json"),
        "status": taxonomy_ids("status.json"),
    }

    names = set()
    urls = set()

    for project in mosaic:
        name = project["name"]

        if name in names:
            errors.append(f"Duplicate project name: {name}")
        names.add(name)

        if len(project["url"]) != len(project["platform"]):
            errors.append(f"{name}: 'url' and 'platform' should usually have the same length.")

        for u in project["url"]:
            if u in urls:
                errors.append(f"Duplicate URL across catalog: {u}")
            urls.add(u)

        for field in ("platform", "type", "domain"):
            for value in project[field]:
                if value not in allowed[field]:
                    errors.append(f"{name}: invalid {field} value '{value}'")

        if not validate_date(project["created_at"]):
            errors.append(f"{name}: invalid created_at date '{project['created_at']}'")

    if errors:
        print("Validation failed:\n")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Validation successful: {len(mosaic)} project(s) checked.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
