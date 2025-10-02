const allowedReferers = [
  "https://wedding.delgaudio.dev",
  "https://www.wedding.delgaudio.dev", // optional www
  "http://localhost:5173", // Local development
  "http://localhost:4173",
];

const publicPaths = [
  "/public-hero.jpg", // Full public access here
];

function isAllowedReferer(header) {
  return allowedReferers.some((domain) => header?.startsWith(domain));
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Allow access to public images
    if (publicPaths.includes(url.pathname)) {
      console.log("Public access granted for path:", url.pathname);
      return fetch(request);
    }

    // Restrict all other paths
    const referer = request.headers.get("Referer");
    const origin = request.headers.get("Origin");

    if (isAllowedReferer(referer) || isAllowedReferer(origin)) {
      console.log("Access granted for referer:", referer || origin);
      return fetch(request);
    }

    console.log("Access denied for referer:", referer || origin);
    return new Response("Access Denied", { status: 403 });
  },
};
