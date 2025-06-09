import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";



export const RegisterAccount = async (form) => {
    const Url = "https://localhost:7099/api/Account/register";
    try {
        const response = await fetch(Url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (!response.ok) {
            throw new Error("Error while registering, Try Again!");
        } else {
            return true;
        }
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
};

export const LoginAccount = async (form) => {
    const LoginUrl = "https://localhost:7099/api/Account/login";

    try {
        const response = await fetch(LoginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });
        if (!response.ok) {
            throw new Error("Error while logging-in, Try Again!");
        } else {
            const data = await response.json();
            const localItem = JSON.stringify(data);
            localStorage.setItem("token", localItem);
            return true;
        }
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
};

export const SetToken = () => {
    return async (dispatch) => {
        let getToken = JSON.parse(localStorage.getItem("token"))
        const token = jwtDecode(getToken.token)
        dispatch({
            type: "SAVE_PROFILE",
            payload: {
                username: token.username,
                email: token.email,
                role: token.role,
                expire: token.exp,
                registeredAt : token.registeredAt,
                isGoogleAccount : token.isGoogleAccount
            },
        });
    }
}

export const Logout = () => {
    return async (dispatch) => {
        localStorage.removeItem("token")
        dispatch({
            type: "LOGOUT",
        });
    }
}

export const CheckToken = () => {
    return async (dispatch) => {
        dispatch({
            type: "CHECK_TOKEN",
        })
    }
}

export const AutoLogin = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const getToken = JSON.parse(token);
                const tokenJwt = jwtDecode(getToken.token);
                const currentTime = Math.floor(Date.now() / 1000);
                if (tokenJwt.exp > currentTime) {
                    // Il token è valido
                    dispatch({
                        type: "SAVE_PROFILE",
                        payload: {
                            username: tokenJwt.username,
                            email: tokenJwt.email,
                            role: tokenJwt.role,
                            expire: tokenJwt.exp,
                        },
                    });
                } else {
                    localStorage.removeItem("token");
                }
            } catch (error) {
                console.error("Errore nel decodificare il token", error);
                localStorage.removeItem("token");
            }
        }
    }
}

export const GetBearerToken = ()=>{
    const localtoken = JSON.parse(localStorage.getItem("token"))
    return localtoken.token
}

export const ChangePassword = async (form) => {
    console.log(form)
    const changePswUrl = "https://localhost:7099/api/Account/changePassword"
    try {
        const response = await fetch(changePswUrl, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + GetBearerToken(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });
        if (!response.ok) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.error("Error" , error)

    }
}