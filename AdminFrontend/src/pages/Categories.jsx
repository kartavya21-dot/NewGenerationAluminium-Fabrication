import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categories";
import { getImages } from "../api/images";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  const [name, setName] = useState("");
  const [selectedFileId, setSelectedFileId] = useState("");
  const [showImagePicker, setShowImagePicker] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [catData, imgData] = await Promise.all([
        getCategories(),
        getImages(),
      ]);
      setCategories(catData);
      setImages(imgData);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !selectedFileId) {
      setError("Name and image are required");
      return;
    }

    const selectedImage = images.find((img) => img.file_id === selectedFileId);

    if (!selectedImage) {
      setError("Selected image not found");
      return;
    }

    try {
      await createCategory({
        name,
        image: {
          image_url: selectedImage.url,
          file_id: selectedFileId,
        },
      });
      
      fetchData();
      setName("");
      setSelectedFileId("");
      setShowImagePicker(false);
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to create category");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;

    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert("Failed to delete category");
    }
  };

  const handleUpdate = async (category) => {
    const newName = prompt("New category name", category.name);
    if (!newName) return;

    try {
      const updated = await updateCategory(category.id, {
        name: newName,
      });
      setCategories((prev) =>
        prev.map((c) => (c.id === category.id ? updated : c))
      );
    } catch {
      alert("Update failed");
    }
  };

  const selectedImage = images.find((img) => img.file_id === selectedFileId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-1">Categories</h1>
            <p className="text-slate-600">Organize your products by category</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
            <span className="text-sm text-slate-600">Total: </span>
            <span className="text-lg font-bold text-emerald-600">{categories.length}</span>
          </div>
        </div>

        {/* Create Category */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800">Create Category</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Image Picker Button */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category Image
              </label>
              <button
                onClick={() => setShowImagePicker(!showImagePicker)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg text-left flex items-center justify-between bg-white hover:bg-slate-50 transition-colors focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <span className={selectedImage ? "text-slate-900" : "text-slate-500"}>
                  {selectedImage ? selectedImage.name : "Select an image"}
                </span>
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${showImagePicker ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Image Grid */}
              {showImagePicker && (
                <div className="mt-3 p-4 border-2 border-emerald-200 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-3 gap-3">
                    {images.map((img) => (
                      <div
                        key={img.file_id}
                        onClick={() => {
                          setSelectedFileId(img.file_id);
                          setShowImagePicker(false);
                        }}
                        className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                          selectedFileId === img.file_id
                            ? "border-emerald-600 ring-4 ring-emerald-200 shadow-lg"
                            : "border-slate-200 hover:border-emerald-300 hover:shadow-md"
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-2 bg-white">
                          <p className="text-xs text-slate-600 truncate">{img.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {images.length === 0 && (
                    <p className="text-slate-500 text-center py-4">No images available</p>
                  )}
                </div>
              )}
            </div>

            {/* Preview selected image */}
            {selectedImage && (
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl">
                <img
                  src={selectedImage.url}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg border-2 border-white shadow-md"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{selectedImage.name}</p>
                  <p className="text-xs text-slate-600">
                    {(selectedImage.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={() => setSelectedFileId("")}
                  className="text-slate-400 hover:text-slate-600 hover:bg-white p-2 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            <button
              onClick={handleCreate}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg"
            >
              Create Category
            </button>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Category List */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800">Existing Categories</h2>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-600">Loading categories...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <p className="text-slate-600 text-lg font-medium">No categories yet</p>
              <p className="text-slate-500 text-sm mt-1">Create your first category to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="group bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-emerald-300 transition-all duration-300"
                >
                  <div className="relative h-40 overflow-hidden bg-slate-100">
                    <img
                      src={cat.image.image_url}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-slate-800 mb-3 truncate">
                      {cat.name}
                    </h3>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(cat)}
                        className="flex-1 bg-emerald-50 text-emerald-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}