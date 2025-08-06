import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";
import {AxiosResponse} from "axios";

export default {
  state: {
    piList: [],
    piDetailsById: [],
    paymentModes: [
      { id: 1, paymentMode: "Cash Payment" },
      { id: 2, paymentMode: "Bank/Mobile Payment" },
    ],
  },

  getters: {
    [GETTERS.PURCHASE.piList]: (state) => {
      return state.piList;
    },

    [GETTERS.PURCHASE.piDetailsById]: (state) => {
      return state.piDetailsById;
    },

    [GETTERS.PURCHASE.paymentModes]: (state) => {
      return state.paymentModes;
    },
  },

  actions: {
    async [ACTIONS.PURCHASE.FETCH_PI_LIST]({ commit, state }) {
      ApiService.setHeader();
      await ApiService.get("api/poinvoice")
        .then((response) => {
          const piList = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.PURCHASE.SET_PI_lIST, piList.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    async [ACTIONS.PURCHASE.FETCH_PI_DETAILS_BY_ID]({ commit, state }, id) {
      ApiService.setHeader();
      await ApiService.get("api/poinvoice/" + id)
        .then((response) => {
          const piDetails = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.PURCHASE.SET_PI_DETAILS, piDetails.data[0]);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    async [ACTIONS.PURCHASE.CREATE_PI_PAYMENT]({ commit, state }, data) {
      ApiService.setHeader();
      return await ApiService.post("api/popayment", data)
        .then((response) => {
          if (response.status === 200) {
            const newPIPayment = JSON.parse(JSON.stringify(response.data));
            return newPIPayment.data;
          }
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Delete PI

    async [ACTIONS.PURCHASE.DELETE_PI]({ commit }, data) {
      ApiService.setHeader();

      return new Promise<AxiosResponse>((resolve, reject) => {
        ApiService.delete("api/poinvoice/" + data.id)
            .then((response:AxiosResponse) => {
              if (response.status === 200) {
                commit(MUTATIONS.PURCHASE.DELETE_PI, data);
              }
              resolve(response);
            })
            .catch((err) => {
              reject(err);
            });
      });
    },

    // Delete PI Payment

    async [ACTIONS.PURCHASE.DELETE_PI_PAYMENT]({ commit }, data) {
      ApiService.setHeader();

      return new Promise<AxiosResponse>((resolve, reject) => {
        ApiService.delete("api/popayment/" + data.id)
            .then((response:AxiosResponse) => {
              if (response.status === 200) {
                commit(MUTATIONS.PURCHASE.DELETE_PI_PAYMENT, data);
              }
              resolve(response);
            })
            .catch((err) => {
              reject(err);
            });
      });
    },
  },

  mutations: {
    [MUTATIONS.PURCHASE.SET_PI_lIST]: (state, data) => {
      state.piList = data;
    },

    [MUTATIONS.PURCHASE.SET_PI_DETAILS]: (state, data) => {
      state.piDetailsById = data;
    },

    [MUTATIONS.PURCHASE.DELETE_PI]: (state, data) => {
      state.piList.splice(data.index, 1);
    },

    [MUTATIONS.PURCHASE.DELETE_PI_PAYMENT]: (state, data) => {
      state.piDetailsById.purchaseInvoicePaymentDetails.splice(data.index, 1);
    },
  },
};
