import Vue from 'vue';
import Vuex from 'vuex';
import projectsModule from './modules/projects';
import usersModule from './modules/users';

export * from './modules/mutation-types';
Vue.use(Vuex);

export default new Vuex.Store({
    stric : process.env.NODE_ENV !== 'production',
    state: { },
    modules: {
        projects: projectsModule,
        users: usersModule,
    }
});