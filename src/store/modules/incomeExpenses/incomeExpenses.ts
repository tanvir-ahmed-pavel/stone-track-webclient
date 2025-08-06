import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";

export default {
  state: {
    billTypes: [
      { id: 1, billType: "Income" },
      { id: 2, billType: "Expenses" },
      { id: 3, billType: "Bank/Cash Transfer" },
    ],
  },

  getters: {
    [GETTERS.ACCOUNT.billTypes]: (state) => {
      return state.billTypes;
    },
  },

  actions: {
    async [ACTIONS.ACCOUNT.CREATE_INCOME_EXPENSE]({ commit, state }, data) {
      ApiService.setHeader();
      return await ApiService.post("api/payment", data)
        .then((response) => {
          if (response.status === 200) {
            const newPOR = JSON.parse(JSON.stringify(response.data));
            return newPOR.message;
          }
        })
        .catch(({ response }) => {
          return response.data;
        });
    },
  },

  mutations: {},
};
