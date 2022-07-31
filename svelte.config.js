import adapter from "@sveltejs/adapter-static";
const config = {
  kit: {
    adapter: adapter({
      fallback: "index.html",
    }),

    prerender: {
      // This can be false if you're using a fallback (i.e. SPA mode)
      default: true,
    },
  },
};

export default config;
