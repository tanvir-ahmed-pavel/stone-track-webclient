import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";

export default {
  state: {
    generatorLogEditData: {},
    generatorLogList: [],
    generatorReport: [],
  },

  getters: {
    [GETTERS.GENERATOR_LOG.generatorLogList]: (state) => {
      return state.generatorLogList;
    },

    [GETTERS.GENERATOR_LOG.generatorReport]: (state) => {
      return state.generatorReport;
    },
  },

  actions: {
    async [ACTIONS.GENERATOR_LOG.FETCH_GENERATOR_LOG_LIST]({ commit, state }) {
      ApiService.setHeader();
      await ApiService.get("api/generator/log")
        .then((response) => {
          const generatorLogs = JSON.parse(JSON.stringify(response.data));
          commit(
            MUTATIONS.GENERATOR_LOG.SET_GENERATOR_LOG_lIST,
            generatorLogs.data
          );
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Generator Reports By Month
    async [ACTIONS.GENERATOR_LOG.FETCH_GENERATOR_REPORT]({ commit }, slug) {
      ApiService.setHeader();
      await ApiService.get("api/generator/monthly-log/" + slug)
        .then((response) => {
          const generatorReports = JSON.parse(JSON.stringify(response.data));
          commit(
            MUTATIONS.GENERATOR_LOG.SET_GENERATOR_REPORT,
            generatorReports
          );
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    async [ACTIONS.GENERATOR_LOG.CREATE_GENERATOR_LOG]({ commit }, payload) {
      ApiService.setHeader();
      return await ApiService.post("api/generator/log", payload)
        .then((response) => {
          if (response.status === 200) {
            const newGeneratorEntry = JSON.parse(JSON.stringify(response.data));
            commit(
              MUTATIONS.GENERATOR_LOG.SET_GENERATOR_LOG,
              newGeneratorEntry.data[0]
            );
            return newGeneratorEntry.message;
          }
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            return response.data;
          }
        });
    },

    async [ACTIONS.GENERATOR_LOG.EDIT_GENERATOR_LOG](
      { commit, state },
      payload
    ) {
      ApiService.setHeader();
      return await ApiService.put("api/generator/log/" + payload.id, payload)
        .then((response) => {
          if (response.status === 200) {
            const updateGeneratorEntry = JSON.parse(
              JSON.stringify(response.data)
            );
            commit(
              MUTATIONS.GENERATOR_LOG.UPDATE_GENERATOR_LOG,
              updateGeneratorEntry.data[0]
            );
            return updateGeneratorEntry.message;
          }
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            return response.data;
          }
        });
    },

    async [ACTIONS.GENERATOR_LOG.DELETE_GENERATOR_LOG](
      { commit, state },
      data
    ) {
      ApiService.setHeader();
      return await ApiService.delete("api/generator/log/" + data.id)
        .then((response) => {
          if (response.status === 200) {
            const deleteGeneratorEntry = JSON.parse(
              JSON.stringify(response.data)
            );
            commit(MUTATIONS.GENERATOR_LOG.DELETE_GENERATOR_LOG, data.id);
            return deleteGeneratorEntry.message;
          }
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            return response.data;
          }
        });
    },
  },

  mutations: {
    [MUTATIONS.GENERATOR_LOG.SET_GENERATOR_LOG_lIST]: (state, data) => {
      state.generatorLogList = data;
    },

    [MUTATIONS.GENERATOR_LOG.SET_GENERATOR_REPORT]: (state, data) => {
      state.generatorReport = data;
    },

    [MUTATIONS.GENERATOR_LOG.SET_GENERATOR_LOG]: (state, data) => {
      state.generatorLogList.unshift(data);
    },

    [MUTATIONS.GENERATOR_LOG.UPDATE_GENERATOR_LOG]: (state, data) => {
      const index = state.generatorLogList.findIndex(
        (generatorLog) => generatorLog.id === data.id
      );
      if (index > -1) {
        state.generatorLogList[index] = data;
      }
    },

    [MUTATIONS.GENERATOR_LOG.DELETE_GENERATOR_LOG]: (state, id) => {
      const index = state.generatorLogList.findIndex(
        (generatorLog) => generatorLog.id === id
      );
      if (index > -1) {
        state.generatorLogList.splice(index);
      }
    },
  },
};
