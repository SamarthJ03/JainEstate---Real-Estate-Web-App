import apiRequest from "./apiRequest"
export const singlePageLoader = async ({request,params}) => {
const res = await apiRequest("/posts/" + params.id);
return res.data;
}

export const listPageLoader = async ({request,params}) => {
    const query = request.url.split("?")[1];
    const postPromise = await apiRequest("/posts?" + query);
    return {
        postResponse : postPromise
    };
    };


    export const profilePageLoader = async () => {
        const postPromise = await apiRequest("/users/profilePosts");
        const chatPromise = await apiRequest("/chats");
        return {
            postResponse : postPromise,
            chatResponse : chatPromise
        };
        };    