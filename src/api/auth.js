const serverUrl = "http://localhost:3000";


const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

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


async function signUp(data) {
    try {
        const raw = await fetch(serverUrl + "/auth/signup", { ...postReqInit, body: JSON.stringify({ ...data }) });
        const res = await raw.json();
        if (!res.success) {
            return { data: null, error: res.msg };
        }

        return { data: res.user, error: null };

    } catch (err) {
        return { data: null, error: err };
    }
}

async function login({ email, password }) {

    try {
        const raw = await fetch(serverUrl + "/auth/login", { ...postReqInit, body: JSON.stringify({ username: email, password }) });
        const res = await raw.json();
        if (!res.success) {
            return { data: null, error: res.msg };
        }

        return { data: res.user, error: null };

    } catch (err) {
        return { data: null, error: err };
    }
}

async function getUser() {
    try {
        const raw = await fetch(serverUrl + "/auth/getUser", { ...getReqInit });
        const res = await raw.json();
        // console.log(res);

        if (!res.success) {
            return { data: null, error: res.msg };
        }

        
        return { data: res.user, error: null };
    } catch (err) {
        return { data: null, error: err };
    }
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
    getUser,
    checkEmailValidity,
    checkUserNameValidity
}