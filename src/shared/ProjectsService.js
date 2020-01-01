import * as axios from "axios";
import { format, parseISO } from "date-fns";
import { inputDateFormat } from "./constants";
import { BASE_API_URI } from "./config";

const getProjects = async function() {
  try {
    const response = await axios.get(`${BASE_API_URI}/projects`);

    let responseData = parseListResponse(response);
    let content = responseData.content;
    let transFormedContent = content.map(p => {
      p.createdAt = format(parseISO(p.createdAt), inputDateFormat);
      p.updatedAt = format(parseISO(p.updatedAt), inputDateFormat);
    });

    let transformedData = { ...responseData, transFormedContent };

    return transformedData;
  } catch (error) {
    /* eslint-disable no-console */
    console.log(error);
    return [];
  }
};
const getProject = async function(id) {
  try {
    const response = await axios.get(`${BASE_API_URI}/projects/${id}`);

    let project = parseResponse(response);
    if (project.createdAt) {
      project.createdAt = format(parseISO(project.createdAt), inputDateFormat);
    }
    if (project.updatedAt) {
      project.updatedAt = format(parseISO(project.updatedAt), inputDateFormat);
    }

    return project;
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
const parseResponse = response => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return null;
  let project = response.data;
  return project;
};
export const projectsData = {
  getProjects,
  getProject
};
