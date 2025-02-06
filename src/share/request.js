import { message } from "antd";
import axios from "axios";
import UserServicere from "../UserService/UserService";
export function getLocalAccessToken() {
  const accessToken = localStorage.getItem("access_token");
  return accessToken;
}

export const config = {
  base_server: "https://192.168.0.112:8085/api/",
  //base_server: "https://localhost:8085/api/",
  image_path: "",
  version: 1,
};

export const request = async (url, method, param) => {
  var header = { "Content-Type": "application/json", accept: "*/*" };
  if (param instanceof FormData) {
    header = {
      "Content-Type": "multipart/form-data",
      accept: "application/json",
    };
  }

  return axios({
    url: config.base_server + url,
    method: method,
    data: param,
    headers: {
      ...header,
      Authorization: "Bearer " + getLocalAccessToken(),
    },
  })
    .then((res) => {
      if(res.data.code === 400 || res.data.code === 503){
        message.warning(res.data.message);
      }else{
        return res.data;
      }

    })
    .catch((err) => {
      var status = err.response?.status;
      if (status === 404) {
        message.error("Route Not Found!");
      } else if (status === 500) {
        message.error(err.message);
      } else if (status === 401) {
        message.warning("401 Unauthorized!");
        //UserServicere.doLogin()
      } else if (status === 403) {
        message.warning("You don't have permission to access this resource!");
      } else {
        // UserServicere.doLogin()
        message.error(err.message);
      }
      return false;
    })
    .finally(() => {
      console.log("Request completed");
    });
};

export const request2 = async (url, method, param) => {
  let headers = {
    accept: "application/json",
    Authorization: "Bearer " + getLocalAccessToken(),
  };

  // Remove Content-Type when using FormData
  if (!(param instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  return axios({
    url: config.base_server + url,
    method: method,
    data: param,
    headers: headers,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      var status = err.response?.status;
      if (status === 404) {
        message.error("Route Not Found!");
      } else if (status === 500) {
        message.error(err.message);
      } else if (status === 401) {
        message.warning("401 Unauthorized!");
        UserServicere.doLogin();
      } else if (status === 403) {
        message.warning("You don't have permission to access this resource!");
      } else {
        message.error(err.message);
      }
      return false;
    })
    .finally(() => {
      console.log("Request completed");
    });
};

export const requestForReport = async (url, method, param) => {
  return axios({
    url: config.base_server + url,
    method: method,
    data: param,
    responseType: "blob",
    headers: {
      Authorization: "Bearer " + getLocalAccessToken(),
      "Content-Type": "application/pdf",
      accept: "application/json",
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      var status = err.response?.status;
      if (status === 404) {
        message.error("Route Not Found!");
      } else if (status === 500) {
        message.error("Internal error server!");
      } else if (status === 401) {
        //UserServicere.doLogin()
      } else if (status === 403) {
        message.error(err.message);
      } else {
        message.error(err.message);
      }
      return false;
    })
    .finally(() => {
      console.log("Request completed");
    });
};
