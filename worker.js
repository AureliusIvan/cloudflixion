export default {
  async fetch(request, env, ctx) {
    return new Response(JSON.stringify("Hello World!"));
  },
};