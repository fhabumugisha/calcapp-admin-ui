import * as axios from "axios";
import { format, parseISO } from "date-fns";
import { inputDateFormat } from "./constants";
import { BASE_API_URI } from "./config";

const getUsers = async function() {
  try {
    const response = await axios.get(`${BASE_API_URI}/users`);

    let responseData = parseListResponse(response);

    let content = responseData.content;
    let transFormedContent = content.map(u => {
      if (u.createdAt) {
        u.createdAt = format(parseISO(u.createdAt), inputDateFormat);
      }
      if (u.updatedAt) {
        u.updatedAt = format(parseISO(u.updatedAt), inputDateFormat);
      }
    });

    let transformedData = { ...responseData, transFormedContent };

    return transformedData;
  } catch (error) {
    /* eslint-disable no-console */
    console.log(error);
    return [];
  }
};

const parseListResponse = response => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list !== "object") {
    list = [];
  }
  return list;
};
export const usersData = {
  getUsers
};
