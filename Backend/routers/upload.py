from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status, Query
from deps.auth import get_current_admin
from services.imagekit_service import (
    upload_image_to_imagekit,
    delete_image_from_imagekit,
    list_images_from_imagekit
)

router = APIRouter(prefix="/upload", tags=["Upload"])


@router.post("/image")
async def upload_image(
    file: UploadFile = File(...),
    admin=Depends(get_current_admin),
):
    if file.content_type not in ["image/jpeg", "image/png", "image/webp"]:
        raise HTTPException(status_code=400, detail="Invalid image type")

    file_bytes = await file.read()

    if len(file_bytes) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Image too large")

    try:
        result = upload_image_to_imagekit(
            file_bytes=file_bytes,
            filename=file.filename,
        )
    except Exception as e:
        print("ImageKit upload error:", e)
        raise HTTPException(status_code=500, detail="Image upload failed")

    return {
        "url": result["url"],
        "file_id": result["fileId"],
    }

@router.post("/image-bulk")
async def upload_image_bulk(
    files: list[UploadFile] = File(...),
    admin=Depends(get_current_admin),
):
    results = []

    for file in files:
        # 1️⃣ Validate type
        if file.content_type not in ["image/jpeg", "image/png", "image/webp"]:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid image type: {file.filename}",
            )

        # 2️⃣ Read file
        file_bytes = await file.read()

        # 3️⃣ Validate size (per file)
        if len(file_bytes) > 5 * 1024 * 1024:
            raise HTTPException(
                status_code=400,
                detail=f"Image too large: {file.filename}",
            )

        # 4️⃣ Upload
        try:
            result = upload_image_to_imagekit(
                file_bytes=file_bytes,
                filename=file.filename,
            )
        except Exception as e:
            print("ImageKit upload error:", e)
            raise HTTPException(
                status_code=500,
                detail=f"Failed to upload {file.filename}",
            )

        # 5️⃣ Collect result
        results.append({
            "url": result["url"],
            "file_id": result["fileId"],
            "name": file.filename,
        })

    return results


@router.delete("/image/{file_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_image(
    file_id: str,
    admin=Depends(get_current_admin),
):
    try:
        delete_image_from_imagekit(file_id)
    except Exception as e:
        print("ImageKit delete error:", e)
        raise HTTPException(
            status_code=500,
            detail="Image deletion failed",
        )
    
@router.get("/images")
def list_images(
    limit: int = Query(50, le=100),
    skip: int = Query(0),
    admin=Depends(get_current_admin),
):
    try:
        images = list_images_from_imagekit(limit=limit, skip=skip)
    except Exception as e:
        print("ImageKit list error:", e)
        raise HTTPException(
            status_code=500,
            detail="Failed to fetch images",
        )

    return [
        {
            "file_id": img["fileId"],
            "url": img["url"],
            "name": img["name"],
            "size": img["size"],
        }
        for img in images
    ]