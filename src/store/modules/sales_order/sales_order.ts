import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";
import {AxiosResponse} from "axios";

export default {
  state: {
    salesOrderList: [],
    salesReportBySearch: [],
    singleSalesOrder: {},
  },

  getters: {
    // Get SalesOrder List
    [GETTERS.SALES_ORDER.salesOrderList]: (state) => {
      return state.salesOrderList;
    },

    // Get SalesReport
    [GETTERS.SALES.salesReportBySearch]: (state) => {
      return state.salesReportBySearch;
    },

    // Get Single sales order
    [GETTERS.SALES_ORDER.singleSalesOrder]: (state) => {
      return state.singleSalesOrder;
    },
  },

  actions: {
    // Fetch SalesOrder List
    async [ACTIONS.SALES_ORDER.FETCH_SALES_ORDER_LIST]({ commit }) {
      ApiService.setHeader();
      await ApiService.get("api/so")
        .then((response) => {
          const salesOrderLists = JSON.parse(JSON.stringify(response.data));
          commit(
            MUTATIONS.SALES_ORDER.SET_SALES_ORDER_lIST,
            salesOrderLists.data
          );
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Fetch SingleSalesOrder view
    async [ACTIONS.SALES_ORDER.FETCH_SALES_ORDER_VIEW]({ commit }, id) {
      ApiService.setHeader();
      await ApiService.get("api/so/" + id)
        .then((response) => {
          const salesOrder = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.SALES_ORDER.SET_SINGLE_SALES_ORDER, salesOrder.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Fetch SingleSalesOrder For Item Delivery
    async [ACTIONS.SALES_ORDER.FETCH_SALES_ORDER]({ commit }, id) {
      ApiService.setHeader();
      await ApiService.get("api/salesOrderDetails/" + id)
        .then((response) => {
          const salesOrder = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.SALES_ORDER.SET_SINGLE_SALES_ORDER, salesOrder.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Create SalesOrder
    async [ACTIONS.SALES_ORDER.CREATE_SALES_ORDER]({ commit }, payload) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.post("api/so", payload)
          .then((response) => {
            if (response.status === 200) {
              const newSalesOrder = JSON.parse(JSON.stringify(response.data));
              // commit(
              //   MUTATIONS.SALES_ORDER.SET_SALES_ORDER,
              //   newSalesOrder.data[0]
              // );
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // Search SalesReport
    async [ACTIONS.SALES.FETCH_SALES_REPORT_BY_SEARCH]({ commit }, payload) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.post("api/report/sales", payload)
          .then((response) => {
            if (response.status === 200) {
              const salesReportBySearch = JSON.parse(
                JSON.stringify(response.data)
              );
              commit(
                MUTATIONS.SALES.SET_SEARCHED_SALES_REPORT,
                salesReportBySearch.data
              );
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // Update SalesOrder

    async [ACTIONS.SALES_ORDER.EDIT_SALES_ORDER]({ commit }, payload) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.put("api/so/" + payload.id, payload.data)
          .then((response) => {
            if (response.status === 200) {
              const updateSalesOrder = JSON.parse(
                JSON.stringify(response.data)
              );
              commit(
                MUTATIONS.SALES_ORDER.UPDATE_SALES_ORDER,
                updateSalesOrder.data[0]
              );
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // Delete SALES_ORDER

    async [ACTIONS.SALES_ORDER.DELETE_SALES_ORDER]({ commit }, data) {
      ApiService.setHeader();

      return new Promise<AxiosResponse>((resolve, reject) => {
        ApiService.delete("api/so/" + data.id)
            .then((response:AxiosResponse) => {
              if (response.status === 200) {
                commit(MUTATIONS.SALES_ORDER.DELETE_SALES_ORDER, data);
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
    [MUTATIONS.SALES_ORDER.SET_SALES_ORDER_lIST]: (state, data) => {
      state.salesOrderList = data;
    },

    [MUTATIONS.SALES.SET_SEARCHED_SALES_REPORT]: (state, data) => {
      state.salesReportBySearch = data;
    },

    [MUTATIONS.SALES_ORDER.SET_SINGLE_SALES_ORDER]: (state, data?) => {
      state.singleSalesOrder = data ? data[0] : {};
    },

    [MUTATIONS.SALES_ORDER.SET_SALES_ORDER]: (state, data) => {
      state.salesOrderList.unshift(data);
    },

    [MUTATIONS.SALES_ORDER.UPDATE_SALES_ORDER]: (state, data) => {
      const index = state.salesOrderList.findIndex(
        (salesOrderList) => salesOrderList.id === data.id
      );
      if (index > -1) {
        state.salesOrderList[index] = data;
      }
    },

    [MUTATIONS.SALES_ORDER.DELETE_SALES_ORDER]: (state, data) => {
      state.salesOrderList.splice(data.index, 1);
    },
  },
};
