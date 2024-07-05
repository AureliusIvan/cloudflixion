import {IgApiClient} from 'instagram-private-api';
import {sample} from 'node:';


export default {
  async fetch(request, env, ctx) {

    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME)
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    // The same as preLoginFlow()
    // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
    process.nextTick(async () => await ig.simulate.postLoginFlow());
    // Create UserFeed instance to get loggedInUser's posts
    const userFeed = ig.feed.user(loggedInUser.pk);
    const myPostsFirstPage = await userFeed.items();
    // All the feeds are auto-paginated, so you just need to call .items() sequentially to get next page
    const myPostsSecondPage = await userFeed.items();
    await ig.media.like({
      // Like our first post from first page or first post from second page randomly
      mediaId: sample([myPostsFirstPage[0].id, myPostsSecondPage[0].id]), moduleInfo: {
        module_name: 'profile', user_id: loggedInUser.pk, username: loggedInUser.username,
      }, d: sample([0, 1]),
    });
    return new Response(JSON.stringify("Hello World!"));
  },
};