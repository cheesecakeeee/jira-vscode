import qs from "qs";
import * as auth from "auth-provider";

const apiUrl = process.env.REACT_APP_API_URL;

interface IRequestType extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  enterpoint: string,
  { data, headers, token, ...customConfig }: IRequestType,
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  //get请求的参数拼接在url中 ，否则在请求头的body中
  if (config.method.toUpperCase() === "GET") {
    enterpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/${enterpoint}`, config).then(async (res) => {
    //认证失效时status返回401，需要重新登录获取token
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      //fetch对于服务端的错误不会抛出异常需要手动抛出错误
      return Promise.reject({ message: "请重新登录" });
    }
    let data = await res.json();
    if (res.ok) {
      return data;
    } else {
      //fetch对于服务端的错误不会抛出异常需要手动抛出错误
      return Promise.reject(data);
    }
  });
};
