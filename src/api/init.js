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

export {
    serverUrl,
    getReqInit,
    postReqInit,
    deleteReqInit,
}