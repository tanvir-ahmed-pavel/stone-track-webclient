import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";

export default {
  state: {
    poTruckLoadingList: [],
    poTruckLoadingQuantity: "",
  },

  getters: {
    // Get PoTruckLoading List
    [GETTERS.PO_TRUCK_LOADING.poTruckLoadingList]: (state) => {
      return state.poTruckLoadingList;
    },

    // Get PoTruckLoading Quantity Details
    [GETTERS.PO_TRUCK_LOADING.poTruckLoadingQuantity]: (state) => {
      return state.poTruckLoadingQuantity;
    },
  },

  actions: {
    // Fetch PoTruckLoading List
    async [ACTIONS.PO_TRUCK_LOADING.FETCH_PO_TRUCK_LOADING_LIST](
      { commit },
      id
    ) {
      commit(MUTATIONS.PO_TRUCK_LOADING.SET_PO_TRUCK_LOADING_lIST, null);
      ApiService.setHeader();
      await ApiService.get("api/potruckdetails/" + id)
        .then((response) => {
          const poTruckLoadingLists = JSON.parse(
            JSON.stringify(response.data.data)
          );
          const poTruckLoadingQTY = JSON.parse(
            JSON.stringify(response.data.loading_qty_data)
          );
          commit(
            MUTATIONS.PO_TRUCK_LOADING.SET_PO_TRUCK_LOADING_lIST,
            poTruckLoadingLists
          );
          commit(
            MUTATIONS.PO_TRUCK_LOADING.SET_PO_TRUCK_LOADING_QTY,
            poTruckLoadingQTY
          );
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Create PoTruckLoading
    async [ACTIONS.PO_TRUCK_LOADING.CREATE_PO_TRUCK_LOADING](
      { commit },
      payload
    ) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.post("api/potruck", payload)
          .then((response) => {
            if (response.status === 200) {
              const newPoTruckLoading = JSON.parse(
                JSON.stringify(response.data)
              );
              newPoTruckLoading.data.forEach((elm) => {
                commit(MUTATIONS.PO_TRUCK_LOADING.SET_PO_TRUCK_LOADING, elm);
              });
              commit(
                MUTATIONS.PO_TRUCK_LOADING.SET_PO_TRUCK_LOADING_QTY,
                response.data.loading_qty_data
              );
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // Update PoTruckLoading

    async [ACTIONS.PO_TRUCK_LOADING.EDIT_PO_TRUCK_LOADING](
      { commit },
      payload
    ) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.put("api/potruck/" + payload.id, payload.data)
          .then((response) => {
            if (response.status === 200) {
              const updatePoTruckLoading = JSON.parse(
                JSON.stringify(response.data)
              );
              commit(
                MUTATIONS.PO_TRUCK_LOADING.UPDATE_PO_TRUCK_LOADING,
                updatePoTruckLoading.data[0]
              );
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // Delete PO_TRUCK_LOADING

    async [ACTIONS.PO_TRUCK_LOADING.DELETE_PO_TRUCK_LOADING]({ commit }, data) {
      ApiService.setHeader();
      return new Promise<void>((resolve, reject) => {
        ApiService.delete("api/potruck/" + data.id)
          .then(() => {
            // console.log(data);
            commit(MUTATIONS.PO_TRUCK_LOADING.DELETE_PO_TRUCK_LOADING, data);
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },

  mutations: {
    [MUTATIONS.PO_TRUCK_LOADING.SET_PO_TRUCK_LOADING_lIST]: (state, data) => {
      state.poTruckLoadingList = data ? data : null;
    },

    [MUTATIONS.PO_TRUCK_LOADING.SET_PO_TRUCK_LOADING_QTY]: (state, data) => {
      if (data != null) {
        state.poTruckLoadingQuantity = data;
      }
    },

    [MUTATIONS.PO_TRUCK_LOADING.SET_PO_TRUCK_LOADING]: (state, data) => {
      state.poTruckLoadingList.unshift(data);
    },

    [MUTATIONS.PO_TRUCK_LOADING.UPDATE_PO_TRUCK_LOADING]: (state, data) => {
      const index = state.poTruckLoadingList.findIndex(
        (poTruckLoadingList) => poTruckLoadingList.id === data.id
      );
      if (index > -1) {
        state.poTruckLoadingList[index] = data;
      }
    },

    [MUTATIONS.PO_TRUCK_LOADING.DELETE_PO_TRUCK_LOADING]: (state, data) => {
      state.poTruckLoadingList.splice(
        state.poTruckLoadingList.indexOf(data),
        1
      );
    },
  },
};
