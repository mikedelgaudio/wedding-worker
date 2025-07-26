const allowedReferers = [
  "https://lynhandmike.delgaudio.dev",
  "https://www.lynhandmike.delgaudio.dev", // optional www
  "https://rsvp.delgaudio.dev",
  "https://www.rsvp.delgaudio.dev", // optional www
];

export default {
  async fetch(request) {
    const referer = request.headers.get("Referer") || "";
    const origin = request.headers.get("Origin") || "";

    const isAllowed = allowedReferers.some(
      (domain) => referer.startsWith(domain) || origin.startsWith(domain)
    );

    if (!isAllowed) {
      return new Response("Access Denied", { status: 403 });
    }

    return fetch(request); // Allow access
  },
};
