import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";

export default {
  state: {
    driverData: {
      driver_name: "",
      driver_mobile_no: "",
      driver_email: "",
      driver_address: "",
      driver_status: 1,
      license_number: "",
      issuing_date: "",
      expiry_date: "",
      issued_location: "",
    },

    driverEditData: {},
    driverList: [],
    driverTypes: [
      { id: "Company", driver_type: "Company" },
      { id: "Individual", driver_type: "Individual" },
    ],
  },

  getters: {
    [GETTERS.DRIVER.driverData]: (state) => {
      return state.driverData;
    },

    [GETTERS.DRIVER.driverEditData]: (state) => {
      return state.driverEditData;
    },

    [GETTERS.DRIVER.driverList]: (state) => {
      return state.driverList;
    },

    [GETTERS.DRIVER.driverTypes]: (state) => {
      return state.driverTypes;
    },
  },

  actions: {
    async [ACTIONS.DRIVER.FETCH_DRIVER_LIST]({ commit, state }) {
      ApiService.setHeader();
      await ApiService.get("api/driver")
        .then((response) => {
          const drivers = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.DRIVER.SET_DRIVER_lIST, drivers.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    async [ACTIONS.DRIVER.CREATE_DRIVER]({ commit, state }, payload) {
      ApiService.setHeader();
      return await ApiService.post("api/driver", payload)
        .then((response) => {
          if (response.status === 200) {
            const newDriver = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.DRIVER.SET_DRIVER, newDriver.data[0]);
            return newDriver.message;
          }
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            return response.data;
          }
        });
    },

    async [ACTIONS.DRIVER.LOAD_DRIVER]({ commit, state }, data) {
      commit(MUTATIONS.DRIVER.LOAD_DRIVER, data);
    },

    async [ACTIONS.DRIVER.EDIT_DRIVER]({ commit, state }, payload) {
      ApiService.setHeader();
      return await ApiService.put("api/driver/" + payload.id, payload)
        .then((response) => {
          if (response.status === 200) {
            const updateDriver = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.DRIVER.UPDATE_DRIVER, updateDriver.data[0]);
            return updateDriver.message;
          }
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            return response.data;
          }
        });
    },

    async [ACTIONS.DRIVER.DELETE_DRIVER]({ commit, state }, data) {
      ApiService.setHeader();
      return await ApiService.delete("api/driver/" + data.id)
        .then((response) => {
          if (response.status === 200) {
            const deleteDriver = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.DRIVER.DELETE_DRIVER, data.id);
            return deleteDriver.message;
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
    [MUTATIONS.DRIVER.SET_DRIVER_lIST]: (state, data) => {
      state.driverList = data;
    },

    [MUTATIONS.DRIVER.SET_DRIVER]: (state, data) => {
      state.driverList.unshift(data);
    },

    [MUTATIONS.DRIVER.LOAD_DRIVER]: (state, data) => {
      state.driverEditData = data;
    },

    [MUTATIONS.DRIVER.UPDATE_DRIVER]: (state, data) => {
      const index = state.driverList.findIndex(
        (driver) => driver.id === data.id
      );
      if (index > -1) {
        state.driverList[index] = data;
      }
    },

    [MUTATIONS.DRIVER.DELETE_DRIVER]: (state, id) => {
      const index = state.driverList.findIndex((driver) => driver.id === id);
      if (index > -1) {
        state.driverList.splice(index, 1);
      }
    },
  },
};
