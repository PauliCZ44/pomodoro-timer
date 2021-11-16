exports.handler = async function (event, context) {
  const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_ACCES,
    //...other fetch options
  });
  console.log(event);
  console.log(context);
  try {
    const { id } = event.queryStringParameters;
    const response = await unsplash.photos.getRandom({
      featured: true,
      query: "landscape nature",
      orientation: "landscape",
      count: 1,
    });
    return {
      statusCode: 200,
      body: response,
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
