import { LoaderFunction } from "@remix-run/node";
import { getCachedImage, setCachedImage } from "../services/imageCache";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || "";
  const type = url.searchParams.get("type") || "advertisement";

  // Kiểm tra cache trước
  const cachedUrl = getCachedImage(id);
  if (cachedUrl) {
    return new Response(JSON.stringify({ url: cachedUrl }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error("UNSPLASH_ACCESS_KEY is not configured");
  }

  try {
    const orientation = type === "advertisement" ? "landscape" : "squarish";

    const collections =
      type === "advertisement" ? "317099" : "317099,3694365,1163637";

    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&collections=${collections}&orientation=${orientation}`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.urls.regular;

    // Cache kết quả
    setCachedImage(id, imageUrl);

    return new Response(
      JSON.stringify({
        url: imageUrl,
        alt: data.alt_description || "Image",
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  } catch (error) {
    console.error("Unsplash API error:", error);

    // Fallback to backup URL if Unsplash fails
    const fallbackUrl = `https://picsum.photos/seed/${id}/800/600`;
    return new Response(
      JSON.stringify({
        url: fallbackUrl,
        alt: "Fallback image",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
