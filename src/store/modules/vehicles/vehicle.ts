import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";

export default {
  state: {
    vehicleData: {
      license_plate: "",
      mark: "",
      model: "",
      fuel_type: "Diesel",
      driver_id: "",
      vehicle_status: 1,
    },

    vehicleEditData: {},
    vehicleList: [],
    vehicleTypes: [
      { id: "Company", vehicle_type: "Company" },
      { id: "Individual", vehicle_type: "Individual" },
    ],
  },

  getters: {
    [GETTERS.VEHICLE.vehicleData]: (state) => {
      return state.vehicleData;
    },

    [GETTERS.VEHICLE.vehicleEditData]: (state) => {
      return state.vehicleEditData;
    },

    [GETTERS.VEHICLE.vehicleList]: (state) => {
      return state.vehicleList;
    },

    [GETTERS.VEHICLE.vehicleTypes]: (state) => {
      return state.vehicleTypes;
    },
  },

  actions: {
    async [ACTIONS.VEHICLE.FETCH_VEHICLE_LIST]({ commit, state }) {
      ApiService.setHeader();
      await ApiService.get("api/vehicle")
        .then((response) => {
          const vehicles = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.VEHICLE.SET_VEHICLE_lIST, vehicles.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    async [ACTIONS.VEHICLE.CREATE_VEHICLE]({ commit, state }, payload) {
      ApiService.setHeader();
      return await ApiService.post("api/vehicle", payload)
        .then((response) => {
          if (response.status === 200) {
            const newVehicle = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.VEHICLE.SET_VEHICLE, newVehicle.data[0]);
            return newVehicle.message;
          }
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            return response.data;
          }
        });
    },

    async [ACTIONS.VEHICLE.LOAD_VEHICLE]({ commit, state }, data) {
      commit(MUTATIONS.VEHICLE.LOAD_VEHICLE, data);
    },

    async [ACTIONS.VEHICLE.EDIT_VEHICLE]({ commit, state }, payload) {
      ApiService.setHeader();
      return await ApiService.put("api/vehicle/" + payload.id, payload)
        .then((response) => {
          if (response.status === 200) {
            const updateVehicle = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.VEHICLE.UPDATE_VEHICLE, updateVehicle.data[0]);
            return updateVehicle.message;
          }
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            return response.data;
          }
        });
    },

    async [ACTIONS.VEHICLE.DELETE_VEHICLE]({ commit, state }, data) {
      ApiService.setHeader();
      return await ApiService.delete("api/vehicle/" + data.id)
        .then((response) => {
          if (response.status === 200) {
            const deleteVehicle = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.VEHICLE.DELETE_VEHICLE, data.id);
            return deleteVehicle.message;
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
    [MUTATIONS.VEHICLE.SET_VEHICLE_lIST]: (state, data) => {
      state.vehicleList = data;
    },

    [MUTATIONS.VEHICLE.SET_VEHICLE]: (state, data) => {
      state.vehicleList.unshift(data);
    },

    [MUTATIONS.VEHICLE.LOAD_VEHICLE]: (state, data) => {
      state.vehicleEditData = data;
    },

    [MUTATIONS.VEHICLE.UPDATE_VEHICLE]: (state, data) => {
      const index = state.vehicleList.findIndex(
        (vehicle) => vehicle.id === data.id
      );
      if (index > -1) {
        state.vehicleList[index] = data;
      }
    },

    [MUTATIONS.VEHICLE.DELETE_VEHICLE]: (state, id) => {
      const index = state.vehicleList.findIndex((vehicle) => vehicle.id === id);
      if (index > -1) {
        state.vehicleList.splice(index, 1);
      }
    },
  },
};
