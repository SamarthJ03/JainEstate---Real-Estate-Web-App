import apiRequest from './apiRequest';

export const profilePageLoader = async () => {
  try {
    const [postResponse, chatResponse] = await Promise.all([
      apiRequest('/users/profilePosts'),
      apiRequest('/chats'),
    ]);
    return {
      postResponse: postResponse,
      chatResponse: chatResponse,
    };
  } catch (error) {
    console.error('Loader Error:', error.response?.data || error.message);
    throw error;
  }
};

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest('/posts/' + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split('?')[1];
  const postPromise = await apiRequest('/posts?' + query);
  return {
    postResponse: postPromise,
  };
};