import { LoaderFunction } from "@remix-run/node";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export const loader: LoaderFunction = async () => {
  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error("UNSPLASH_ACCESS_KEY is not configured");
  }

  try {
    // Use id as seed to always get the same image for the same advertisement
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&query=advertisement&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from Unsplash");
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({
        url: data.urls.regular,
        alt: data.alt_description || "Advertisement image",
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=7200", // Cache for 2 hours
        },
      }
    );
  } catch (error) {
    console.error("Unsplash API error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch image from Unsplash",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
