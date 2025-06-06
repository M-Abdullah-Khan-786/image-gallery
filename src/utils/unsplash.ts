export async function searchImages(query: string, page: number = 1) {
  const res = await fetch(`/api/search?query=${query}&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch images");
  return res.json();
}
