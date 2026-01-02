import base64
import requests
from core.config import settings


# Use the correct API upload endpoint, not the CDN URL
IMAGEKIT_DELETE_URL = "https://api.imagekit.io/v1/files"
IMAGEKIT_UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload"
IMAGEKIT_FILES_URL = "https://api.imagekit.io/v1/files"

def upload_image_to_imagekit(
    file_bytes: bytes,
    filename: str,
):
    response = requests.post(
        IMAGEKIT_UPLOAD_URL,
        auth=(settings.IMAGEKIT_PRIVATE_KEY, ""),
        files={
            "file": (filename, file_bytes),
        },
        data={
            "fileName": f"products/{filename}",
        },
        timeout=15,
    )

    if response.status_code != 200:
        raise Exception(response.text)

    return response.json()

def delete_image_from_imagekit(file_id: str):
    response = requests.delete(
        f"{IMAGEKIT_DELETE_URL}/{file_id}",
        auth=(settings.IMAGEKIT_PRIVATE_KEY, ""),
        timeout=10,
    )

    # ImageKit returns 204 No Content on success
    if response.status_code not in (200, 204):
        raise Exception(response.text)

def list_images_from_imagekit(limit: int = 50, skip: int = 0):
    response = requests.get(
        IMAGEKIT_FILES_URL,
        auth=(settings.IMAGEKIT_PRIVATE_KEY, ""),
        params={
            "limit": limit,
            "skip": skip,
        },
        timeout=10,
    )

    if response.status_code != 200:
        raise Exception(response.text)

    return response.json()