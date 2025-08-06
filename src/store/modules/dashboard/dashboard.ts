import ApiService from "@/core/services/ApiService";
import {ACTIONS, GETTERS, MUTATIONS,} from "@/store/modules/enums/StoreModuleEnums";
import {AxiosResponse} from "axios";

export default {
  state: {
    mainDashboard: [],
    lcDashboard: {},
    soDashboard: {},
    poDashboard: {},
  },

  getters: {
    // Main
    [GETTERS.DASHBOARD.mainDashboard]: (state) => {
      return state.mainDashboard;
    },

    // lc
    [GETTERS.DASHBOARD.lcDashboard]: (state) => {
      return state.lcDashboard;
    },

      // so
      [GETTERS.DASHBOARD.soDashboard]: (state) => {
          return state.soDashboard;
      },

      // po
      [GETTERS.DASHBOARD.poDashboard]: (state) => {
          return state.poDashboard;
      },
  },

  actions: {
    // Fetch Main Dashboard
    async [ACTIONS.DASHBOARD.FETCH_MAIN_DASHBOARD]({commit}) {
      ApiService.setHeader();
      return await new Promise<AxiosResponse>((resolve, reject) => {
        ApiService.get("api/dashboard/main")
            .then((response) => {
              const mainDashboard = JSON.parse(JSON.stringify(response.data));
              commit(MUTATIONS.DASHBOARD.SET_MAIN_DASHBOARD, mainDashboard);
              resolve(response);
            })
            .catch(({err}) => {
              reject(err);
            });
      })
    },

    // Fetch LC Dashboard
    async [ACTIONS.DASHBOARD.FETCH_LC_DASHBOARD]({commit}, id) {
      ApiService.setHeader();
      return await new Promise<AxiosResponse>((resolve, reject) => {
        ApiService.get("api/dashboard/lc/"+id)
            .then((response) => {
              const lcDashboard = JSON.parse(JSON.stringify(response.data));
              commit(MUTATIONS.DASHBOARD.SET_LC_DASHBOARD, lcDashboard);
              resolve(response);
            })
            .catch(({err}) => {
              reject(err);
            });
      })
    },

      // Fetch SO Dashboard
      async [ACTIONS.DASHBOARD.FETCH_SO_DASHBOARD]({commit}, id) {
          ApiService.setHeader();
          return await new Promise<AxiosResponse>((resolve, reject) => {
              ApiService.get("api/dashboard/so/"+id)
                  .then((response) => {
                      const data = JSON.parse(JSON.stringify(response.data));
                      commit(MUTATIONS.DASHBOARD.SET_SO_DASHBOARD, data);
                      resolve(response);
                  })
                  .catch(({err}) => {
                      reject(err);
                  });
          })
      },

      // Fetch LC Dashboard
      async [ACTIONS.DASHBOARD.FETCH_PO_DASHBOARD]({commit}, id) {
          ApiService.setHeader();
          return await new Promise<AxiosResponse>((resolve, reject) => {
              ApiService.get("api/dashboard/po/"+id)
                  .then((response) => {
                      const data = JSON.parse(JSON.stringify(response.data));
                      commit(MUTATIONS.DASHBOARD.SET_PO_DASHBOARD, data);
                      resolve(response);
                  })
                  .catch(({err}) => {
                      reject(err);
                  });
          })
      },
  },

  mutations: {
    [MUTATIONS.DASHBOARD.SET_MAIN_DASHBOARD]: (state, data) => {
      state.mainDashboard = data;
    },

    [MUTATIONS.DASHBOARD.SET_LC_DASHBOARD]: (state, data) => {
      state.lcDashboard = data;
    },
      [MUTATIONS.DASHBOARD.SET_SO_DASHBOARD]: (state, data) => {
          state.soDashboard = data;
      },

      [MUTATIONS.DASHBOARD.SET_PO_DASHBOARD]: (state, data) => {
          state.poDashboard = data;
      },

  },
};
