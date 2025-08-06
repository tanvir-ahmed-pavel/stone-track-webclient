import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";
import {AxiosResponse} from "axios";

export default {
  state: {
    soDeliveryList: [],
    singleSoDelivery: {},
  },

  getters: {
    // Get SoDelivery List
    [GETTERS.SO_DELIVERY.soDeliveryList]: (state) => {
      return state.soDeliveryList;
    },

    // Get Single so delivery
    [GETTERS.SO_DELIVERY.singleSoDelivery]: (state) => {
      return state.singleSoDelivery;
    },
  },

  actions: {
    // Fetch SoDelivery List
    async [ACTIONS.SO_DELIVERY.FETCH_SO_DELIVERY_LIST]({ commit }, id) {
      ApiService.setHeader();
      await ApiService.get("api/sodeliverylist/" + id)
        .then((response) => {
          const soDeliveryLists = JSON.parse(JSON.stringify(response.data));
          commit(
            MUTATIONS.SO_DELIVERY.SET_SO_DELIVERY_lIST,
            soDeliveryLists.data
          );
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Fetch sodeliverylistforinvoice List
    async [ACTIONS.SO_DELIVERY.FETCH_SO_DELIVERY_LIST_FOR_INVOICE](
      { commit },
      id
    ) {
      ApiService.setHeader();
      await ApiService.get("api/sodeliverylistforinvoice/" + id)
        .then((response) => {
          const soDeliveryLists = JSON.parse(JSON.stringify(response.data));
          commit(
            MUTATIONS.SO_DELIVERY.SET_SO_DELIVERY_lIST,
            soDeliveryLists.data
          );
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Fetch SingleSoDelivery List
    async [ACTIONS.SO_DELIVERY.FETCH_SO_DELIVERY]({ commit }, id) {
      ApiService.setHeader();
      await ApiService.get("api/sodelivery/" + id)
        .then((response) => {
          const soDelivery = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.SO_DELIVERY.SET_SINGLE_SO_DELIVERY, soDelivery.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Create SoDelivery
    async [ACTIONS.SO_DELIVERY.CREATE_SO_DELIVERY]({ commit }, payload) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.post("api/sodelivery", payload)
          .then((response) => {
            if (response.status === 200) {
              const newSoDelivery = JSON.parse(JSON.stringify(response.data));
              // commit(
              //   MUTATIONS.SO_DELIVERY.SET_SO_DELIVERY,
              //   newSoDelivery.data[0]
              // );
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // Update SoDelivery

    async [ACTIONS.SO_DELIVERY.EDIT_SO_DELIVERY]({ commit }, payload) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.put("api/sodelivery/" + payload.id, payload.data)
          .then((response) => {
            if (response.status === 200) {
              const updateSoDelivery = JSON.parse(
                JSON.stringify(response.data)
              );
              commit(
                MUTATIONS.SO_DELIVERY.UPDATE_SO_DELIVERY,
                updateSoDelivery.data[0]
              );
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // Delete SO_DELIVERY

    async [ACTIONS.SO_DELIVERY.DELETE_SO_DELIVERY]({ commit }, data) {
      ApiService.setHeader();
      return new Promise<AxiosResponse>((resolve, reject) => {
        ApiService.delete("api/sodelivery/" + data.id)
          .then((response) => {
            // console.log(data);
            if (response.data.message === "success") {
              commit(MUTATIONS.SO_DELIVERY.DELETE_SO_DELIVERY, data);
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
    [MUTATIONS.SO_DELIVERY.SET_SO_DELIVERY_lIST]: (state, data) => {
      state.soDeliveryList = data;
    },

    [MUTATIONS.SO_DELIVERY.SET_SINGLE_SO_DELIVERY]: (state, data) => {
      state.singleSoDelivery = data[0];
    },

    [MUTATIONS.SO_DELIVERY.SET_SO_DELIVERY]: (state, data) => {
      state.soDeliveryList.unshift(data);
    },

    [MUTATIONS.SO_DELIVERY.UPDATE_SO_DELIVERY]: (state, data) => {
      const index = state.soDeliveryList.findIndex(
        (soDeliveryList) => soDeliveryList.id === data.id
      );
      if (index > -1) {
        state.soDeliveryList[index] = data;
      }
    },

    [MUTATIONS.SO_DELIVERY.DELETE_SO_DELIVERY]: (state, data) => {
      state.soDeliveryList.splice(data.index, 1);
    },
  },
};
