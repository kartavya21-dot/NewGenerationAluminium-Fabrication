from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
import base64

from deps.auth import get_current_admin
from services.imagekit_service import imagekit


router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
    admin=Depends(get_current_admin),
):
    # --------------------
    # Validate file type
    # --------------------
    if file.content_type not in ["image/jpeg", "image/png", "image/webp"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid image type",
        )

    # --------------------
    # Read & encode image
    # --------------------
    file_bytes = await file.read()

    if len(file_bytes) > 5 * 1024 * 1024:  # 5MB limit
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image size must be less than 5MB",
        )

    encoded_file = base64.b64encode(file_bytes).decode("utf-8")

    # --------------------
    # Upload to ImageKit
    # --------------------
    try:
        result = imagekit.upload(
            file=encoded_file,
            file_name=file.filename,
            folder="/products",
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Image upload failed",
        )

    # --------------------
    # Return URL + file_id
    # --------------------
    return {
        "url": result["url"],
        "file_id": result["fileId"],
    }