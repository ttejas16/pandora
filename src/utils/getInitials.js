function getInitials(userName){
    if (!userName) {
        return "";
    }

    return userName.split(" ").filter(w => w).map(wr => wr[0]).join("").toUpperCase();
}

export {
    getInitials
}