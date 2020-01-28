import * as axios from "axios";

import { BASE_API_URI } from "./config";

const getUsers = async function() {
  try {
    const response = await axios.get(`${BASE_API_URI}/users`);

    return parseListResponse(response);
  } catch (error) {
    /* eslint-disable no-console */
    console.log(error);
    return [];
  }
};

const deleteUser = async function(userId) {
  await axios.delete(`${BASE_API_URI}/users/${userId}`);
};

const parseListResponse = response => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  return response.data;
};
export const usersData = {
  getUsers,
  deleteUser
};
