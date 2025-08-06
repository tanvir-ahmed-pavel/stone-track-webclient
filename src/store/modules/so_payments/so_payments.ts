import ApiService from "@/core/services/ApiService";
import {ACTIONS, GETTERS, MUTATIONS,} from "@/store/modules/enums/StoreModuleEnums";
import {AxiosResponse} from "axios";

export default {
  state: {
    soPaymentList: [],
    singleSoPayment: {},
  },

  getters: {
    // Get SoPayment List
    [GETTERS.SO_PAYMENT.soPaymentList]: (state) => {
      return state.soPaymentList;
    },

    // Get Single so payment
    [GETTERS.SO_PAYMENT.singleSoPayment]: (state) => {
      return state.singleSoPayment;
    },
  },

  actions: {
    // Fetch SoPayment List
    async [ACTIONS.SO_PAYMENT.FETCH_SO_PAYMENT_LIST]({commit}) {
      ApiService.setHeader();
      await ApiService.get("api/sopayment/")
          .then((response) => {
            const soPaymentLists = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.SO_PAYMENT.SET_SO_PAYMENT_lIST, soPaymentLists.data);
          })
          .catch(({response}) => {
            return response.data;
          });
    },

    // Fetch SingleSoPayment List
    async [ACTIONS.SO_PAYMENT.FETCH_SO_PAYMENT]({commit}, id) {
      ApiService.setHeader();
      await ApiService.get("api/sopayment/" + id)
          .then((response) => {
            const soPayment = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.SO_PAYMENT.SET_SINGLE_SO_PAYMENT, soPayment.data);
          })
          .catch(({response}) => {
            return response.data;
          });
    },

    // Create SoPayment
    async [ACTIONS.SO_PAYMENT.CREATE_SO_PAYMENT]({commit, state}, data) {
      ApiService.setHeader();
      return await ApiService.post("api/sopayment", data)
          .then((response) => {
            if (response.status === 200) {
              const newSoPayment = JSON.parse(JSON.stringify(response.data));
              return newSoPayment.data;
            }
          })
          .catch(({response}) => {
            return response.data;
          });
    },

    // Update SoPayment

    async [ACTIONS.SO_PAYMENT.EDIT_SO_PAYMENT]({commit}, payload) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.put("api/sopayment/" + payload.id, payload.data)
            .then((response) => {
              if (response.status === 200) {
                const updateSoPayment = JSON.parse(JSON.stringify(response.data));
                commit(
                    MUTATIONS.SO_PAYMENT.UPDATE_SO_PAYMENT,
                    updateSoPayment.data[0]
                );
              }
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
      });
    },

    // Delete SO_PAYMENT

    async [ACTIONS.SO_PAYMENT.DELETE_SO_PAYMENT]({commit}, data) {
      ApiService.setHeader();

      return new Promise<AxiosResponse>((resolve, reject) => {
        ApiService.delete("api/sopayment/" + data.id)
            .then((response: AxiosResponse) => {
              if (response.status === 200) {
                commit(MUTATIONS.SO_PAYMENT.DELETE_SO_PAYMENT, data);
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
    [MUTATIONS.SO_PAYMENT.SET_SO_PAYMENT_lIST]: (state, data) => {
      state.soPaymentList = data;
    },

    [MUTATIONS.SO_PAYMENT.SET_SINGLE_SO_PAYMENT]: (state, data) => {
      state.singleSoPayment = data[0];
    },

    [MUTATIONS.SO_PAYMENT.SET_SO_PAYMENT]: (state, data) => {
      state.soPaymentList.unshift(data);
    },

    [MUTATIONS.SO_PAYMENT.UPDATE_SO_PAYMENT]: (state, data) => {
      const index = state.soPaymentList.findIndex(
          (soPaymentList) => soPaymentList.id === data.id
      );
      if (index > -1) {
        state.soPaymentList[index] = data;
      }
    },

    [MUTATIONS.SO_PAYMENT.DELETE_SO_PAYMENT]: (state, data) => {
      state.soPaymentList.splice(data.index, 1);
    },
  },
};
