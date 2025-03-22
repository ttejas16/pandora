import { getReqInit, serverUrl } from "./user";

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

export {
    getQuestionAnalytics
}