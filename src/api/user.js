import { getReqInit, postReqInit, serverUrl } from "./init";

async function createTopic(data = {}) {
    try {
        const raw = await fetch(serverUrl + "/user/createTopic", { ...postReqInit, body: JSON.stringify(data) });
        const res = await raw.json();

        if (!res.success) {
            return { data: null, error: res.msg };
        }

        return { data: res.data, error: null };


    } catch (error) {
        console.log(error);
        return { data: null, error };
    }
}

async function joinTopic(data) {
    try {
        const raw = await fetch(serverUrl + "/user/joinTopic", { ...postReqInit, body: JSON.stringify(data) });
        const res = await raw.json();

        if (!res.success) {
            return { data: null, error: res.msg };
        }

        return { data: res.data, error: null };


    } catch (error) {
        console.log(error);
        return { data: null, error };
    }
}

async function getTopics() {
    try {
        const raw = await fetch(serverUrl + "/user/getTopics", { ...getReqInit });
        const res = await raw.json();

        if (!res.success) {
            return { data: null, error: res.msg };
        }

        return { data: res.data, error: null };


    } catch (error) {
        console.log(error);
        return { data: null, error };
    }
}

async function getTopicUsers(topicId) {

    try {
        const raw = await fetch(serverUrl + "/user/getTopicUsers?" + new URLSearchParams({ topicId }), { ...getReqInit });
        const res = await raw.json();

        if (!res.success) {
            return { data: null, error: res.msg };
        }

        return { data: res.data, error: null };


    } catch (error) {
        console.log(error);
        return { data: null, error };
    }
}

async function searchTopics(topicName) {
    try {
        const raw = await fetch(serverUrl + "/user/searchTopics?" + new URLSearchParams({ topicName }), { ...getReqInit });

        const res = await raw.json();
        // console.log(res);

        if (!res.success) {
            return { data: null, error: res.msg };
        }
        // console.log(res.data);

        return { data: res.data, error: null };
    } catch (error) {
        console.log(error);
        return { data: null, error };
    }
}

async function getThumbnails() {
    try {
        const raw = await fetch(serverUrl + "/user/getThumbnails", { ...getReqInit });

        const res = await raw.json();
        // console.log(res);

        if (!res.success) {
            return { data: null, error: res.msg };
        }
        // console.log(res.data);

        return { data: res.data, error: null };
    } catch (error) {
        console.log(error);
        return { data: null, error };
    }
}

export {
    getThumbnails,
    createTopic,
    getTopics,
    getTopicUsers,
    joinTopic,
    searchTopics
}