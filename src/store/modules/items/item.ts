import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";

export default {
  state: {
    itemData: {
      item_name: "",
      item_group_id: "",
      uom_id: "",
      selling_price: "",
      is_fixed_asset: 0,
      opening_stock_qty: "",
      item_status: 1,
    },

    itemEditData: {},
    itemList: [],
    itemTypes: [
      { id: "Company", item_type: "Company" },
      { id: "Individual", item_type: "Individual" },
    ],
  },

  getters: {
    [GETTERS.ITEM.itemData]: (state) => {
      return state.itemData;
    },

    [GETTERS.ITEM.itemEditData]: (state) => {
      return state.itemEditData;
    },

    [GETTERS.ITEM.itemList]: (state) => {
      return state.itemList;
    },

    [GETTERS.ITEM.itemTypes]: (state) => {
      return state.itemTypes;
    },
  },

  actions: {
    async [ACTIONS.ITEM.FETCH_ITEM_LIST]({ commit, state }) {
      ApiService.setHeader();
      await ApiService.get("api/item")
        .then((response) => {
          const items = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.ITEM.SET_ITEM_lIST, items.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    async [ACTIONS.ITEM.CREATE_ITEM]({ commit }, payload) {
      ApiService.setHeader();
      return await ApiService.post("api/item", payload)
        .then((response) => {
          if (response.status === 200) {
            const newItem = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.ITEM.SET_ITEM, newItem.data[0]);
            return newItem.message;
          }
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            return response.data;
          }
        });
    },

    async [ACTIONS.ITEM.LOAD_ITEM]({ commit, state }, data) {
      commit(MUTATIONS.ITEM.LOAD_ITEM, data);
    },

    async [ACTIONS.ITEM.EDIT_ITEM]({ commit, state }, payload) {
      ApiService.setHeader();
      return await ApiService.put("api/item/" + payload.id, payload)
        .then((response) => {
          if (response.status === 200) {
            const updateItem = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.ITEM.UPDATE_ITEM, updateItem.data[0]);
            return updateItem.message;
          }
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            return response.data;
          }
        });
    },

    async [ACTIONS.ITEM.DELETE_ITEM]({ commit, state }, data) {
      ApiService.setHeader();
      return await ApiService.delete("api/item/" + data.id)
        .then((response) => {
          if (response.status === 200) {
            const deleteItem = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.ITEM.DELETE_ITEM, data.id);
            return deleteItem.message;
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
    [MUTATIONS.ITEM.SET_ITEM_lIST]: (state, data) => {
      state.itemList = data;
    },

    [MUTATIONS.ITEM.SET_ITEM]: (state, data) => {
      state.itemList.unshift(data);
    },

    [MUTATIONS.ITEM.LOAD_ITEM]: (state, data) => {
      state.itemEditData = data;
      state.itemEditData.item_group_id = data.group.id;
      state.itemEditData.uom_id = data.uom.id;
    },

    [MUTATIONS.ITEM.UPDATE_ITEM]: (state, data) => {
      const index = state.itemList.findIndex((item) => item.id === data.id);
      if (index > -1) {
        state.itemList[index] = data;
      }
    },

    [MUTATIONS.ITEM.DELETE_ITEM]: (state, id) => {
      const index = state.itemList.findIndex((item) => item.id === id);
      if (index > -1) {
        state.itemList.splice(index,1);
      }
    },
  },
};
