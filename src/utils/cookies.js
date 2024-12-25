import Cookies from "js-cookie";

export const setSessionToken = (token) => {
    Cookies.set("token", token, { expires: 7, path: "/", secure: true, sameSite: "Strict" });
};

export const getSessionToken = () => {
    return Cookies.get("token"); 
};