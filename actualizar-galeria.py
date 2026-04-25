from pathlib import Path
import json
from PIL import Image

BASE = Path(__file__).parent
GALLERY = BASE / "assets" / "gallery"
THUMBS = BASE / "assets" / "thumbs"
DATA = BASE / "js" / "gallery-data.js"
EXTS = {".jpg", ".jpeg", ".png", ".webp"}

THUMBS.mkdir(parents=True, exist_ok=True)

def guess_category(name: str) -> str:
    n = name.lower()
    if any(x in n for x in ["lago", "destino"]):
        return "Destino"
    if any(x in n for x in ["boda", "novios"]):
        return "Bodas"
    if any(x in n for x in ["pareja", "compromiso", "cita", "abrazo"]):
        return "Parejas"
    return "Editorial"

items = []
for file in sorted(GALLERY.iterdir()):
    if file.suffix.lower() not in EXTS or not file.is_file():
        continue

    title = file.stem.replace("-", " ").replace("_", " ").title()
    thumb = THUMBS / f"{file.stem}.webp"

    try:
        img = Image.open(file).convert("RGB")
        img.thumbnail((900, 900), Image.LANCZOS)
        img.save(thumb, "WEBP", quality=85, method=6)
        thumb_path = f"assets/thumbs/{thumb.name}"
    except Exception:
        thumb_path = f"assets/gallery/{file.name}"

    items.append({
        "src": f"assets/gallery/{file.name}",
        "thumb": thumb_path,
        "title": title,
        "description": "Nueva fotografía agregada al portafolio.",
        "category": guess_category(file.stem)
    })

DATA.write_text("window.GALLERY_PHOTOS = " + json.dumps(items, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
print(f"Galería actualizada con {len(items)} fotografías.")
