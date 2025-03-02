const serverUrl = "http://localhost:3000";

const getReqInit = {
    credentials: "include",
    method: 'GET',
    headers: { "Content-Type": "application/json" },
}

const postReqInit = {
    credentials: "include",
    method: 'POST',
    headers: { "Content-Type": "application/json" },
}

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


export {
    createTopic,
    getTopics,
    getTopicUsers,
    joinTopic
}