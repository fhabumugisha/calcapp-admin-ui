import ApiService from "./api.service";

const getProjects = async function() {
  try {
    const response = await ApiService.get(`/projects`);
    return parseListResponse(response);
  } catch (error) {
    /* eslint-disable no-console */
    console.log(error);
    return [];
  }
};
const getProject = async function(id) {
  try {
    const response = await ApiService.get(`/projects/${id}`);

    let project = parseResponse(response);
    /*  if (project.createdAt) {
      project.createdAt = format(parseISO(project.createdAt), inputDateFormat);
    }
    if (project.updatedAt) {
      project.updatedAt = format(parseISO(project.updatedAt), inputDateFormat);
    } */

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
  return response.data;
};
const parseResponse = response => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return null;
  return response.data;
};
export const ProjectsService = {
  getProjects,
  getProject
};
