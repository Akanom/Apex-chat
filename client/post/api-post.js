const listNewsFeed = async (params, credentials, signal) => {
  try {
    let res = await fetch("/api/post/feed/" + params.userId, {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/json",
        Autorization: "Bearer" + credentials.t,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};


export{listNewsFeed}