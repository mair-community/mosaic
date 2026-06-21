#!/usr/bin/env python3
import json
from pathlib import Path

SOFTWARE_PATH = Path("catalog/mosaic.json")
BADGE_PATH = Path("catalog/mosaic-badge.json")

def main():
    data = json.loads(SOFTWARE_PATH.read_text(encoding="utf-8"))
    count = len(data)

    badge = {
        "schemaVersion": 1,
        "label": "MOSAIC",
        "message": str(count),
        "color": "#980100"
    }

    BADGE_PATH.write_text(json.dumps(badge, indent=2) + "\n", encoding="utf-8")
    print(f"Updated {BADGE_PATH} with count={count}")

if __name__ == "__main__":
    main()
