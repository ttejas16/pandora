const serverUrl = "http://localhost:3000";


const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const getReqInit = {
    method: 'GET',
    headers: { "Content-Type": "application/json" },
}

const postReqInit = {
    credentials: "include",
    method: 'POST',
    headers: { "Content-Type": "application/json" },
}


async function signUp(data) {
    const res = await fetch(serverUrl + "/auth/signup", { ...postReqInit, body: JSON.stringify({ ...data }) });
    const resData = await res.json();
    return resData;
}

async function login({ email, password }) {
    const res = await fetch(serverUrl + "/auth/login", { ...postReqInit, body: JSON.stringify({ username: email, password }) });
    const resData = await res.json();
    console.log(resData);

    return resData;
}

async function checkEmailValidity(email) {
    console.log(email);

    if (!emailRegex.test(email)) {
        return "Invalid email format!"
    }

    const res = await fetch(serverUrl + "/auth/checkEmail", { ...postReqInit, body: JSON.stringify({ email }) });
    const data = await res.json();
    return data;
}

function checkUserNameValidity() {

}

export {
    login,
    signUp,
    checkEmailValidity,
    checkUserNameValidity
}