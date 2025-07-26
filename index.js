const allowedReferers = [
  "https://lynhandmike.delgaudio.dev",
  "https://www.lynhandmike.delgaudio.dev", // optional www
  "https://rsvp.delgaudio.dev",
  "https://www.rsvp.delgaudio.dev", // optional www
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
      return fetch(request);
    }

    // Restrict all other paths
    const referer = request.headers.get("Referer");
    const origin = request.headers.get("Origin");

    if (isAllowedReferer(referer) || isAllowedReferer(origin)) {
      return fetch(request);
    }

    return new Response("Access Denied", { status: 403 });
  },
};
