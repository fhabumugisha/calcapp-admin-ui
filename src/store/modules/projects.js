import { ProjectsService } from "@/services";

import { GET_PROJECTS, GET_PROJECT } from "./mutation-types";

export default {
  strict: process.env.NODE_ENV !== "production",
  namespaced: true,
  state: {
    projects: [],
    totalElements: 0,
    project: {}
  },
  actions: {
    async getProjectsAction({ commit }) {
      try {
        const payload = await ProjectsService.getProjects();

        commit(GET_PROJECTS, payload);
        return payload;
      } catch (error) {
        return error;
      }
    },
    async getProjectAction({ commit }, id) {
      try {
        const payload = await ProjectsService.getProject(id);

        commit(GET_PROJECT, payload);
        return payload;
      } catch (error) {
        return error;
      }
    }
  },
  mutations: {
    [GET_PROJECTS](state, payload) {
      state.projects = payload.projects;
      state.totalElements = payload.totalItems;
    },
    [GET_PROJECT](state, payload) {
      state.project = payload.project;
    }
  },
  getters: {
    projects: state => {
      return state.projects;
    },
    totalElements: state => {
      return state.totalElements;
    },
    project: state => {
      return state.project;
    }
  }
};
