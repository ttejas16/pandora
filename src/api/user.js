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

const deleteReqInit = {
    credentials: "include",
    method: 'DELETE',
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

async function createTest(topicId, title, endDate, description, questions) {
    try {
        const raw = await fetch(serverUrl + "/user/createTest", {
            ...postReqInit,
            body: JSON.stringify({ topicId, title, endDate, description, questions })
        });

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

async function getTests(topicId) {
    try {
        const raw = await fetch(serverUrl + "/user/getTests?" + new URLSearchParams({ topicId }), {
            ...getReqInit
        });

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

async function getTestQuestions(testId) {
    try {
        const raw = await fetch(serverUrl + "/user/getQuestions?" + new URLSearchParams({ testId }), {
            ...getReqInit
        });

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


async function submitTest(testId, answers) {
    try {
        const raw = await fetch(serverUrl + "/user/submitTest", { ...postReqInit, body: JSON.stringify({ testId, answers }) });

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

async function getAnalytics(testId) {
    try {
        const raw = await fetch(serverUrl + "/user/getTestAnalytics?" + new URLSearchParams({ testId }), { ...getReqInit });

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

async function deleteTest(testId) {
    try {
        const raw = await fetch(serverUrl + "/user/deleteTest?" + new URLSearchParams({ testId }), { ...deleteReqInit });

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
    createTopic,
    getTopics,
    getTopicUsers,
    joinTopic,
    createTest,
    getTests,
    getTestQuestions,
    submitTest,
    getAnalytics,
    searchTopics,
    deleteTest,
    getReqInit,
    serverUrl
}