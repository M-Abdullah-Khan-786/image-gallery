"use client";

import { useState, useEffect } from "react";
import ImageCard from "@/components/ImageCard";
import Modal from "@/components/Modal";
import { searchImages } from "@/utils/unsplash";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (page === 1) return;
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const data = await searchImages(query, page);
      if (page === 1) {
        setImages(data.results);
      } else {
        setImages((prev) => {
          const ids = new Set(prev.map((img) => img.id));
          const filtered = data.results.filter((img: any) => !ids.has(img.id));
          return [...prev, ...filtered];
        });
      }
      setHasMore(data.results.length > 0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setImages([]);
    fetchImages();
  };

  const handleLoadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Image Gallery</h1>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 rounded border border-gray-300"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <ImageCard
            key={`${image.id}-${image.urls.small}`}
            image={image}
            onClick={() => setSelectedImage(image.urls.regular)}
          />
        ))}
      </div>

      {isLoading && <p className="text-center mt-4">Loading...</p>}

      {hasMore && !isLoading && images.length > 0 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Load More
          </button>
        </div>
      )}

      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage || ""}
      />
    </main>
  );
}
