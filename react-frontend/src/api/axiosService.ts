import axios from "axios";
import { inRange } from "lodash";
import { BasicObject } from "@app/common/types";

const axiosClient = axios.create();

axiosClient.defaults.headers.common = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
axiosClient.defaults.timeout = 2000;
axiosClient.interceptors.response.use(
  function (response) {
    if (response.data) {
      if (inRange(response.status, 200, 299)) {
        return response;
      }

      return response;
    }
    return Promise.resolve(response);
  },
  function (error) {
    if (error.response.data) {
      return Promise.resolve(error.response);
    }

    return Promise.resolve({ error: "Something went wrong." });
  }
);

export async function getRequest(URL: string, kwargs = {}) {
  const response = await axiosClient.get(`${URL}`, kwargs);
  return response;
}

export async function postRequest(
  URL: string,
  payload: BasicObject,
  kwargs = {}
) {
  const response = await axiosClient.post(`${URL}`, payload, kwargs);
  return response;
}

export async function patchRequest(
  URL: string,
  payload: BasicObject,
  kwargs = {}
) {
  const response = await axiosClient.patch(`${URL}`, payload, kwargs);
  return response;
}

export async function deleteRequest(URL: string, kwargs = {}) {
  const response = await axiosClient.delete(`${URL}`, kwargs);
  return response;
}
