import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";
import {AxiosResponse} from "axios";

export default {
  state: {
    lcData: {
      lc_number: "",
      issuing_bank: "",
      issue_date: "",
      supplier_id: "",
      lc_rate_usd: "",
      lc_open_amount_usd: "",
      lc_under_amount_usd: "",
      bank_total_bdt: "",
      under_total_bdt: "",
      open_10_percent: "",
      noc_50_percent: "",
      total_amount_bdt: "",
      lc_conversion_rate: "",
    },
    lcList: [],
    lcListWithoutPo: [],
    crushingLcList: [],
    lc: {},
    itemCrushingCost: {},
  },

  getters: {
    // Get Lc List
    [GETTERS.LC.lcList]: (state) => {
      return state.lcList;
    },

    // Get Lc List without po
    [GETTERS.LC.lcListWithoutPo]: (state) => {
      return state.lcListWithoutPo;
    },

    // Get Crushing Lc List
    [GETTERS.LC.crushingLcList]: (state) => {
      return state.crushingLcList;
    },

    // Get Crushing cost
    [GETTERS.LC.itemCrushingCost]: (state) => {
      return state.itemCrushingCost;
    },

    // Get Single LC
    [GETTERS.LC.lc]: (state) => {
      return state.lcList;
    },
  },

  actions: {
    // Fetch Lc List
    async [ACTIONS.LC.FETCH_LC_LIST]({ commit }) {
      ApiService.setHeader();
      await ApiService.get("api/lc")
        .then((response) => {
          const lcs = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.LC.SET_LC_LIST, lcs.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Fetch Lc List without po
    async [ACTIONS.LC.FETCH_LC_LIST_WITHOUT_PO]({ commit }) {
      ApiService.setHeader();
      await ApiService.get("api/lc/without/po")
        .then((response) => {
          const lcs = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.LC.SET_LC_LIST_WITHOUT_PO, lcs.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Fetch Crushing Lc List
    async [ACTIONS.LC.FETCH_CRUSHING_LC_LIST]({ commit }) {
      ApiService.setHeader();
      await ApiService.get("api/crushingLcList")
        .then((response) => {
          const lcs = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.LC.SET_CRUSHING_LC_lIST, lcs.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Fetch Single Lc
    async [ACTIONS.LC.FETCH_LC]({ commit }, id) {
      ApiService.setHeader();
      await ApiService.get("api/lc/" + id)
        .then((response) => {
          const lc = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.LC.SET_SINGLE_LC, lc.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Fetch Item Crushing Cost
    async [ACTIONS.LC.FETCH_ITEM_CRUSHING_COST]({ commit }, id) {
      ApiService.setHeader();
      await ApiService.get("api/item/crushing/cost/" + id)
        .then((response) => {
          const itemCrushingCost = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.LC.SET_ITEM_CRUSHING_COST, itemCrushingCost);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Create Lc
    async [ACTIONS.LC.CREATE_LC]({ commit }, payload) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.post("api/lc", payload)
          .then((response) => {
            if (response.status === 200) {
              const newLc = JSON.parse(JSON.stringify(response.data));
              commit(MUTATIONS.LC.SET_LC, newLc.data[0]);
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // Create CREATE_ITEM_CRUSHING_COST
    async [ACTIONS.LC.CREATE_ITEM_CRUSHING_COST]({ commit }, payload) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.post("api/item/crushing/cost/", payload)
          .then((response) => {
            if (response.status === 200) {
              const newCrushingCost = JSON.parse(JSON.stringify(response.data));
              // commit(MUTATIONS.LC.SET_ITEM_CRUSHING_COST, newCrushingCost);
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // Update Lc

    async [ACTIONS.LC.EDIT_LC]({ commit }, payload) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.put("api/lc/" + payload.id, payload.data)
          .then((response) => {
            if (response.status === 200) {
              const updateLc = JSON.parse(JSON.stringify(response.data));
              commit(MUTATIONS.LC.UPDATE_LC, updateLc.data[0]);
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // Delete LC

    async [ACTIONS.LC.DELETE_LC]({ commit }, data) {
      ApiService.setHeader();
      return new Promise<AxiosResponse>((resolve, reject) => {
        ApiService.delete("api/lc/" + data.id)
            .then((response: AxiosResponse) => {
              if (response.status === 200) {
                commit(MUTATIONS.LC.DELETE_LC, data);
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
    [MUTATIONS.LC.SET_LC_LIST]: (state, data) => {
      state.lcList = data;
    },

    [MUTATIONS.LC.SET_LC_LIST_WITHOUT_PO]: (state, data) => {
      state.lcListWithoutPo = data;
    },

    [MUTATIONS.LC.SET_CRUSHING_LC_lIST]: (state, data) => {
      state.crushingLcList = data;
    },

    [MUTATIONS.LC.SET_ITEM_CRUSHING_COST]: (state, data) => {
      state.itemCrushingCost = data;
    },

    [MUTATIONS.LC.SET_SINGLE_LC]: (state, data) => {
      state.lc = data;
    },

    [MUTATIONS.LC.SET_LC]: (state, data) => {
      state.lcList.unshift(data);
    },

    [MUTATIONS.LC.UPDATE_LC]: (state, data) => {
      const index = state.lcList.findIndex((lc) => lc.id === data.id);
      if (index > -1) {
        state.lcList[index] = data;
      }
    },

    [MUTATIONS.LC.DELETE_LC]: (state, data) => {
      state.lcList.splice(data.index, 1);
    },
  },
};
