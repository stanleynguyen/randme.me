module.exports = {
  hosts: [
    {
      fallback: {
        200: "./index.html",
      },
      root: "src/",
      headers: [{ fields: { "X-Frame-Options": "deny" } }],
      manifest: "serverpush.json",
    },
  ],
};
