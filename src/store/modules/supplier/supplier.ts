import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";

export default {
  state: {
    supplierData: {
      supplier_name: "",
      supplier_type: "",
      supplier_group_id: "",
      supp_primary_email: "",
      supp_primary_mobile_no: "",
      supp_primary_address: "",
      supp_primary_city: "",
      supp_primary_state: "",
      supp_primary_zip_code: "",
      supp_primary_country: "",
      supplier_status: "",
      supp_opening_balance: "",
    },

    supplierEditData: {},
    supplierList: [],
    supplier: {},
    supplierTypes: [
      { id: "Company", supplier_type: "Company" },
      { id: "Individual", supplier_type: "Individual" },
    ],

    // Dashboard
    supplierDashboardData: {},
  },

  getters: {
    [GETTERS.SUPPLIER.supplierData]: (state) => {
      return state.supplierData;
    },

    [GETTERS.SUPPLIER.supplierEditData]: (state) => {
      return state.supplierEditData;
    },

    [GETTERS.SUPPLIER.supplier]: (state) => {
      return state.supplier;
    },

    [GETTERS.SUPPLIER.supplierList]: (state) => {
      return state.supplierList;
    },

    [GETTERS.SUPPLIER.supplierTypes]: (state) => {
      return state.supplierTypes;
    },

    // Dashboard
    [GETTERS.SUPPLIER.supplierDashboardData]: (state) => {
      return state.supplierDashboardData;
    },
  },

  actions: {
    async [ACTIONS.SUPPLIER.FETCH_SUPPLIER_LIST]({ commit, state }) {
      ApiService.setHeader();
      await ApiService.get("api/supplier")
        .then((response) => {
          const suppliers = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.SUPPLIER.SET_SUPPLIER_lIST, suppliers.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    async [ACTIONS.SUPPLIER.FETCH_SUPPLIER]({ commit, state }, id) {
      ApiService.setHeader();
      await ApiService.get("api/supplier/" + id)
        .then((response) => {
          const supplier = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.SUPPLIER.SET_SINGLE_SUPPLIER, supplier.data[0]);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    async [ACTIONS.SUPPLIER.CREATE_SUPPLIER]({ commit, state }, data) {
      ApiService.setHeader();
      return await ApiService.post("api/supplier", data)
        .then((response) => {
          if (response.status === 200) {
            const newSupplier = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.SUPPLIER.SET_SUPPLIER, newSupplier.data[0]);
            return newSupplier.message;
          }
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            return response.data;
          }
        });
    },

    async [ACTIONS.SUPPLIER.LOAD_SUPPLIER]({ commit, state }, data) {
      commit(MUTATIONS.SUPPLIER.LOAD_SUPPLIER, data);
    },

    async [ACTIONS.SUPPLIER.EDIT_SUPPLIER]({ commit, state }) {
      ApiService.setHeader();
      return await ApiService.put(
        "api/supplier/" + state.supplierEditData.id,
        state.supplierEditData
      )
        .then((response) => {
          if (response.status === 200) {
            const updateSupplier = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.SUPPLIER.UPDATE_SUPPLIER, updateSupplier.data[0]);
            return updateSupplier.message;
          }
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            return response.data;
          }
        });
    },

    async [ACTIONS.SUPPLIER.DELETE_SUPPLIER]({ commit, state }, data) {
      ApiService.setHeader();
      return await ApiService.delete("api/supplier/" + data.id)
        .then((response) => {
          if (response.status === 200) {
            const deleteSupplier = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.SUPPLIER.DELETE_SUPPLIER, data.id);
            return deleteSupplier.message;
          }
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            return response.data;
          }
        });
    },

    // Supplier dashboard
    async [ACTIONS.SUPPLIER.FETCH_SUPPLIER_DASHBOARD_DATA]({ commit }, id) {
      ApiService.setHeader();
      await ApiService.get("api/dashboard/supplier/" + id)
        .then((response) => {
          const supplierDashboardData = JSON.parse(
            JSON.stringify(response.data)
          );
          commit(
            MUTATIONS.SUPPLIER.SET_SUPPLIER_DASHBOARD_DATA,
            supplierDashboardData
          );
        })
        .catch(({ response }) => {
          return response;
        });
    },
  },

  mutations: {
    [MUTATIONS.SUPPLIER.SET_SUPPLIER_lIST]: (state, data) => {
      state.supplierList = data;
    },

    [MUTATIONS.SUPPLIER.SET_SINGLE_SUPPLIER]: (state, data) => {
      state.supplier = data;
    },

    [MUTATIONS.SUPPLIER.SET_SUPPLIER]: (state, data) => {
      state.supplierList.unshift(data);
    },

    [MUTATIONS.SUPPLIER.LOAD_SUPPLIER]: (state, data) => {
      state.supplierEditData.id = data.id;
      state.supplierEditData.supplier_name = data.supplier_name;
      state.supplierEditData.supplier_type = data.supplier_type;
      state.supplierEditData.supplier_group_id = data.supplier_group_id;
      state.supplierEditData.supp_primary_email = data.supp_primary_email;
      state.supplierEditData.supp_primary_mobile_no =
        data.supp_primary_mobile_no;
      state.supplierEditData.supp_primary_address = data.supp_primary_address;
      state.supplierEditData.supp_primary_city = data.supp_primary_city;
      state.supplierEditData.supp_primary_state = data.supp_primary_state;
      state.supplierEditData.supp_primary_zip_code = data.supp_primary_zip_code;
      state.supplierEditData.supp_primary_country = data.supp_primary_country;
      state.supplierEditData.supplier_status = data.supplier_status;
      state.supplierEditData.supp_opening_balance = data.supp_opening_balance;
    },

    [MUTATIONS.SUPPLIER.UPDATE_SUPPLIER]: (state, data) => {
      const index = state.supplierList.findIndex(
        (supplier) => supplier.id === data.id
      );
      if (index > -1) {
        state.supplierList[index] = data;
      }
    },

    [MUTATIONS.SUPPLIER.DELETE_SUPPLIER]: (state, id) => {
      const index = state.supplierList.findIndex(
        (supplier) => supplier.id === id
      );
      if (index > -1) {
        state.supplierList.splice(index, 1);
      }
    },

    // Dashboard
    [MUTATIONS.SUPPLIER.SET_SUPPLIER_DASHBOARD_DATA]: (state, data) => {
      state.supplierDashboardData = data;
    },
  },
};
