import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";

export default {
  state: {
    itemListForCrushing: [],
    crushingItemList: [],
    crushingStoneCost: [],
  },

  getters: {
    [GETTERS.CRUSHING.crushingItemList]: (state) => {
      return state.crushingItemList;
    },

    [GETTERS.CRUSHING.itemListForCrushing]: (state) => {
      return state.itemListForCrushing;
    },

    [GETTERS.CRUSHING.crushingStoneCost]: (state) => {
      return state.crushingStoneCost;
    },
  },

  actions: {
    async [ACTIONS.CRUSHING.FETCH_CRUSHING_ITEM_LIST]({ commit, state }) {
      const response = await ApiService.get("api/crushingTypeItems");

      if (response.data != null) {
        const crushingItemList = JSON.parse(
          JSON.stringify(response.data["crushingTypeItems"])
        );

        commit(MUTATIONS.CRUSHING.SET_CRUSHING_ITEM_lIST, crushingItemList);

        return "success";
      }

      return "error";

      // ApiService.setHeader();
      // await ApiService.get("api/itemsForCrushingByLcID/" + id)
      //   .then((response) => {
      //     const itemList = JSON.parse(JSON.stringify(response.data));
      //     commit(MUTATIONS.ITEM.SET_ITEM_lIST_FOR_CRUSHING, itemList.data);
      //   })
      //   .catch(({ response }) => {
      //     return response.data;
      //   });
    },

    async [ACTIONS.CRUSHING.FETCH_ITEMS_LIST_FOR_CRUSHING](
      { commit, state },
      id
    ) {
      ApiService.setHeader();
      await ApiService.get("api/itemsForCrushingByLcID/" + id)
        .then((response) => {
          const itemListForCrushing = JSON.parse(
            JSON.stringify(response.data["rawMaterialItemList"])
          );
          commit(
            MUTATIONS.CRUSHING.SET_ITEM_lIST_FOR_CRUSHING,
            itemListForCrushing
          );
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    async [ACTIONS.CRUSHING.FETCH_CRUSHING_STONE_COST]({ commit, state }, id) {
      ApiService.setHeader();
      await ApiService.get("api/itemWithAllDutyFee/" + id)
        .then((response) => {
          const crushingStoneCost = JSON.parse(
            JSON.stringify(response.data["data"][0])
          );
          commit(MUTATIONS.CRUSHING.SET_CRUSHING_STONE_COST, crushingStoneCost);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    async [ACTIONS.CRUSHING.SAVE_CRUSHING_DATA]({ commit, state }, data) {
      ApiService.setHeader();
      return await ApiService.post("api/item/crushing", data)
        .then((response) => {
          if (response.status === 200) {
            const crushingData = JSON.parse(JSON.stringify(response.data));
            return crushingData.message;
          }
        })
        .catch(({ response }) => {
          return response.data;
        });
    },
  },

  mutations: {
    [MUTATIONS.CRUSHING.SET_CRUSHING_ITEM_lIST]: (state, data) => {
      state.crushingItemList = data;
    },

    [MUTATIONS.CRUSHING.SET_ITEM_lIST_FOR_CRUSHING]: (state, data) => {
      state.itemListForCrushing = data;
    },

    [MUTATIONS.CRUSHING.SET_CRUSHING_STONE_COST]: (state, data) => {
      state.crushingStoneCost = data;
    },
  },
};
