import {Client} from "@gradio/client/dist/client";

export default {
  async fetch(request, env, ctx) {
    const client = await Client.connect("aureliusivan/DiffuseCraft");
    const result = await client.predict("/update_task_options", {
      model_name: "stabilityai/stable-diffusion-xl-base-1.0", task_name: "txt2img",
    });

    return new Response(JSON.stringify(result));
  },
};