import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";

export default {
  state: {
    customerData: {
      customer_name: "",
      customer_type: "",
      customer_group_id: "",
      cus_primary_email: "",
      cus_primary_mobile_no: "",
      cus_primary_address: "",
      cus_primary_city: "",
      cus_primary_state: "",
      cus_primary_zip_code: "",
      cus_primary_country: "",
      customer_status: "",
    },

    customer: {},
    customerEditData: {},
    customerDashboardData: {},
    customerList: [],
    customerTypes: [
      { id: "Company", customer_type: "Company" },
      { id: "Individual", customer_type: "Individual" },
    ],
  },

  getters: {
    [GETTERS.CUSTOMER.customerData]: (state) => {
      return state.customerData;
    },

    [GETTERS.CUSTOMER.customer]: (state) => {
      return state.customer;
    },

    [GETTERS.CUSTOMER.customerEditData]: (state) => {
      return state.customerEditData;
    },

    [GETTERS.CUSTOMER.customerList]: (state) => {
      return state.customerList;
    },

    [GETTERS.CUSTOMER.customerTypes]: (state) => {
      return state.customerTypes;
    },

    // Dashboard
    [GETTERS.CUSTOMER.customerDashboardData]: (state) => {
      return state.customerDashboardData;
    },
  },

  actions: {
    async [ACTIONS.CUSTOMER.FETCH_CUSTOMER_LIST]({ commit, state }) {
      ApiService.setHeader();
      await ApiService.get("api/customer")
        .then((response) => {
          const customers = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.CUSTOMER.SET_CUSTOMER_lIST, customers.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Single Customer

    async [ACTIONS.CUSTOMER.FETCH_CUSTOMER]({ commit }, id) {
      ApiService.setHeader();
      await ApiService.get("api/customer/" + id)
        .then((response) => {
          const customers = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.CUSTOMER.SET_SINGLE_CUSTOMER, customers.data[0]);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    async [ACTIONS.CUSTOMER.CREATE_CUSTOMER]({ commit, state }, payload) {
      ApiService.setHeader();
      return await ApiService.post("api/customer", payload)
        .then((response) => {
          if (response.status === 200) {
            const newCustomer = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.CUSTOMER.SET_CUSTOMER, newCustomer.data[0]);
            return newCustomer.message;
          }
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            return response.data;
          }
        });
    },

    async [ACTIONS.CUSTOMER.LOAD_CUSTOMER]({ commit, state }, data) {
      commit(MUTATIONS.CUSTOMER.LOAD_CUSTOMER, data);
    },

    async [ACTIONS.CUSTOMER.EDIT_CUSTOMER]({ commit, state }, payload) {
      ApiService.setHeader();
      return await ApiService.put("api/customer/" + payload.id, payload)
        .then((response) => {
          if (response.status === 200) {
            const updateCustomer = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.CUSTOMER.UPDATE_CUSTOMER, updateCustomer.data[0]);
            return updateCustomer.message;
          }
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            return response.data;
          }
        });
    },

    async [ACTIONS.CUSTOMER.DELETE_CUSTOMER]({ commit, state }, data) {
      ApiService.setHeader();
      return await ApiService.delete("api/customer/" + data.id)
        .then((response) => {
          if (response.status === 200) {
            const deleteCustomer = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.CUSTOMER.DELETE_CUSTOMER, data.id);
            return deleteCustomer.message;
          }
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            return response.data;
          }
        });
    },

    // customer dashboard
    async [ACTIONS.CUSTOMER.FETCH_CUSTOMER_DASHBOARD_DATA]({ commit }, id) {
      ApiService.setHeader();
      await ApiService.get("api/dashboard/customer/" + id)
        .then((response) => {
          const customerDashboardData = JSON.parse(
            JSON.stringify(response.data)
          );
          commit(
            MUTATIONS.CUSTOMER.SET_CUSTOMER_DASHBOARD_DATA,
            customerDashboardData
          );
        })
        .catch(({ response }) => {
          return response;
        });
    },
  },

  mutations: {
    [MUTATIONS.CUSTOMER.SET_CUSTOMER_lIST]: (state, data) => {
      state.customerList = data;
    },

    [MUTATIONS.CUSTOMER.SET_SINGLE_CUSTOMER]: (state, data) => {
      state.customer = data;
    },

    [MUTATIONS.CUSTOMER.SET_CUSTOMER]: (state, data) => {
      state.customerList.unshift(data);
    },

    [MUTATIONS.CUSTOMER.LOAD_CUSTOMER]: (state, data) => {
      state.customerEditData = data;
    },

    [MUTATIONS.CUSTOMER.UPDATE_CUSTOMER]: (state, data) => {
      const index = state.customerList.findIndex(
        (customer) => customer.id === data.id
      );
      if (index > -1) {
        state.customerList[index] = data;
      }
    },

    [MUTATIONS.CUSTOMER.DELETE_CUSTOMER]: (state, id) => {
      const index = state.customerList.findIndex(
        (customer) => customer.id === id
      );
      if (index > -1) {
        state.customerList.splice(index, 1);
      }
    },

    // Dashboard
    [MUTATIONS.CUSTOMER.SET_CUSTOMER_DASHBOARD_DATA]: (state, data) => {
      state.customerDashboardData = data;
    },
  },
};
