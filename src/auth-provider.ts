import { IUser } from "types/IUser";
const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_prodiver_token__";

export const getToken = () => {
  return window.localStorage.getItem(localStorageKey);
};

export const removeToken = () => {
  return window.localStorage.removeItem(localStorageKey);
};

export const handleUserResponse = ({ user }: { user: IUser }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = async (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(await res.json());
    }
  });
};
export const register = async (data: {
  username: string;
  password: string;
}) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    } else {
      return Promise.reject(await res.json());
    }
  });
};
export const logout = async () => removeToken();
