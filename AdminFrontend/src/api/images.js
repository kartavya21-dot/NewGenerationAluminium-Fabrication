import api from "./axios";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/upload/image", formData);
  return res.data;
};

export const uploadImageBulk = async (files) => {
  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));

  const res = await api.post("/upload/image-bulk", formData);
  return res.data;
};

export const getImages = async () => {
  const res = await api.get("/upload/images");
  return res.data;
};

export const deleteImage = async (fileId) => {
  await api.delete(`/upload/image/${fileId}`);
};
