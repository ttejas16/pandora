import { getReqInit, postReqInit, deleteReqInit, serverUrl } from "./init";

async function getQuestionAnalytics(testId) {
    try {
        const raw = await fetch(serverUrl + "/test/getQuestionAnalytics?" + new URLSearchParams({ testId }), { ...getReqInit });

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

export {
    createTest,
    getTests,
    submitTest,
    getAnalytics,
    deleteTest,
    getTestQuestions,
    getQuestionAnalytics
}