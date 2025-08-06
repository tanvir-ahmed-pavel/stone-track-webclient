import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";

export default {
  state: {
    lookupData: [],
    allChartOfAccount: [],
    chartOfAccountType: [],
    country: [],
    customerGroup: [],
    status: [],
    itemGroup: [],
    supplierGroup: [],
    warehouse: [],
  },

  getters: {
    [GETTERS.LOOKUP_DATA.lookupData]: (state) => {
      return state.lookupData;
    },

    [GETTERS.LOOKUP_DATA.allChartOfAccount]: (state) => {
      return state.allChartOfAccount;
    },

    [GETTERS.LOOKUP_DATA.chartOfAccountType]: (state) => {
      return state.chartOfAccountType;
    },

    [GETTERS.LOOKUP_DATA.country]: (state) => {
      return state.country;
    },

    [GETTERS.LOOKUP_DATA.customerGroup]: (state) => {
      return state.customerGroup;
    },

    [GETTERS.LOOKUP_DATA.status]: (state) => {
      return state.status;
    },

    [GETTERS.LOOKUP_DATA.itemGroup]: (state) => {
      return state.itemGroup;
    },

    [GETTERS.LOOKUP_DATA.supplierGroup]: (state) => {
      return state.supplierGroup;
    },

    [GETTERS.LOOKUP_DATA.warehouse]: (state) => {
      return state.warehouse;
    },
  },

  actions: {
    async [ACTIONS.LOOKUP_DATA.FETCH_LOOKUP_DATA]({ commit }, state) {
      ApiService.setHeader();
      await ApiService.get("api/lookupDate")
        .then((response) => {
          const data = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.LOOKUP_DATA.SET_LOOKUP_DATA, data);
        })
        .catch(({ response }) => {
          return response.data;
        });
      await ApiService.get("api/allChartOfAcList")
        .then((response) => {
          const data = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.LOOKUP_DATA.SET_ALL_CHART_OF_ACCOUNT, data);
        })
        .catch(({ response }) => {
          return response.data;
        });
      await ApiService.get("api/chartOfAccountType")
          .then((response) => {
            const data = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.LOOKUP_DATA.SET_CHART_OF_ACCOUNT_TYPE, data.data);
          })
          .catch(({ response }) => {
            return response.data;
          });
    },
  },

  mutations: {
    [MUTATIONS.LOOKUP_DATA.SET_LOOKUP_DATA]: (state, data) => {
      state.lookupData = data;

      state.country = data.country;
      state.customerGroup = data.customerGroup;
      state.status = [
        { id: 1, status: "Enabled" },
        { id: 0, status: "Disabled" },
      ];
      state.itemGroup = data.itemGroup;
      state.supplierGroup = data.supplierGroup;
      state.warehouse = data.warehouse;
    },
    [MUTATIONS.LOOKUP_DATA.SET_ALL_CHART_OF_ACCOUNT]: (state, data) => {
      state.allChartOfAccount = data;
    },

    [MUTATIONS.LOOKUP_DATA.SET_CHART_OF_ACCOUNT_TYPE]: (state, data) => {
      state.chartOfAccountType = data;
    },
  },
};
