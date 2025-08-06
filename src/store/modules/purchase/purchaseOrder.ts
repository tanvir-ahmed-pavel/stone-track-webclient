import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";
import {AxiosResponse} from "axios";

export default {
  state: {
    poList: [],
    purchaseReportBySearch: [],
    porList: [],
    poDetailsById: [],
    porDetailsById: [],

    poPaymentStatistics: {},

    purchaseFrom: [
      { id: 1, purchaseFrom: "Local" },
      { id: 2, purchaseFrom: "Imported" },
    ],
    poDeleted: false,

    taxAndPortFeeList:[],
  },

  getters: {
    [GETTERS.PURCHASE.poList]: (state) => {
      return state.poList;
    },

    [GETTERS.PURCHASE.taxAndPortFeeList]: (state) => {
      return state.taxAndPortFeeList;
    },

    [GETTERS.PURCHASE.purchaseReportBySearch]: (state) => {
      return state.purchaseReportBySearch;
    },

    [GETTERS.PURCHASE.porList]: (state) => {
      return state.porList;
    },

    [GETTERS.PURCHASE.poDetailsById]: (state) => {
      return state.poDetailsById;
    },

    [GETTERS.PURCHASE.porDetailsById]: (state) => {
      return state.porDetailsById;
    },

    [GETTERS.PURCHASE.purchaseFrom]: (state) => {
      return state.purchaseFrom;
    },

    [GETTERS.PURCHASE.poDeleted]: (state) => {
      return state.poDeleted;
    },

      [GETTERS.PURCHASE.poPaymentStatistics]: (state) => {
          return state.poPaymentStatistics;
      },
  },

  actions: {


    // Tax and port
    async [ACTIONS.PURCHASE.FETCH_TAX_AND_PORT_LIST]({ commit }, id) {
      ApiService.setHeader();
      await ApiService.get("api/tax/port/fee/by/lc/"+id)
          .then((response) => {
            const data = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.PURCHASE.SET_TAX_AND_PORT_lIST, data);
          })
          .catch(({ response }) => {
            return response.data;
          });
    },

    // Tax and port Add
    async [ACTIONS.PURCHASE.ADD_TAX_AND_PORT]({ commit, state }, data) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.post("api/tax/port/fee", data)
            .then((response) => {
              if (response.status === 200) {
                console.log(response);
                const data = JSON.parse(JSON.stringify(response.data));
                commit(MUTATIONS.PURCHASE.PUSH_TAX_AND_PORT_RESPONSE, data.data);
              }
              resolve();
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
      });
    },

    // Delete tax and port
    async [ACTIONS.PURCHASE.DELETE_TAX_AND_PORT]({ commit, state }, data) {
      ApiService.setHeader();
      return new Promise<AxiosResponse>((resolve, reject) => {
        ApiService.delete("api/tax/port/fee/" + data.id)
            .then((response: AxiosResponse) => {
              if (response.status === 200) {
                commit(MUTATIONS.PURCHASE.TAX_AND_PORT_DELETE, data);
              }
              resolve(response);
            })
            .catch((err) => {
              reject(err);
            });
      });
    },

      // PO Payment Add

      async [ACTIONS.PURCHASE.ADD_PO_PAYMENT]({commit, state}, data) {
          ApiService.setHeader();
          return await ApiService.post("api/storePoPaymentDetails", data)
              .then((response) => {
                  if (response.status === 200) {
                      const data = JSON.parse(JSON.stringify(response.data));
                      return data.data;
                  }
              })
              .catch(({response}) => {
                  return response.data;
              });
      },


      async [ACTIONS.PURCHASE.FETCH_PO_PAYMENT_STATISTICS]({ commit, state }, id) {
          ApiService.setHeader();
          await ApiService.get("api/po/payment/receipt/statistics/"+id)
              .then((response) => {
                  const data = JSON.parse(JSON.stringify(response.data));
                  commit(MUTATIONS.PURCHASE.SET_PO_PAYMENT_STATISTICS, data.data);
              })
              .catch(({ response }) => {
                  return response.data;
              });
      },

      // Delete payments
      async [ACTIONS.PURCHASE.DELETE_PO_PAYMENT]({ commit, state }, data) {
          ApiService.setHeader();
          return new Promise<AxiosResponse>((resolve, reject) => {
              ApiService.delete("api/destroyPoPayment/" + data.id)
                  .then((response: AxiosResponse) => {
                      if (response.status === 200) {
                          commit(MUTATIONS.PURCHASE.DELTE_PO_PAYMENT, data);
                      }
                      resolve(response);
                  })
                  .catch((err) => {
                      reject(err);
                  });
          });
      },



    async [ACTIONS.PURCHASE.FETCH_PO_LIST]({ commit, state }) {
      ApiService.setHeader();
      await ApiService.get("api/po")
          .then((response) => {
            const poList = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.PURCHASE.SET_PO_lIST, poList.data);
          })
          .catch(({ response }) => {
            return response.data;
          });
    },

    async [ACTIONS.PURCHASE.FETCH_POR_LIST_BY_ID]({ commit, state }, id) {
      ApiService.setHeader();
      await ApiService.get("api/poReceiptListByPOID/" + id)
        .then((response) => {
          const porList = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.PURCHASE.SET_POR_lIST, porList.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    async [ACTIONS.PURCHASE.FETCH_PURCHASE_REPORT_BY_SEARCH](
      { commit, state },
      data
    ) {
      ApiService.setHeader();
      await ApiService.post("api/report/purchase", data)
        .then((response) => {
          const purchaseReportBySearch = JSON.parse(
            JSON.stringify(response.data)
          );
          commit(
            MUTATIONS.PURCHASE.SET_SEARCHED_PURCHASE_REPORT,
            purchaseReportBySearch.data
          );
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    async [ACTIONS.PURCHASE.FETCH_PO_DETAILS_BY_ID]({ commit, state }, id) {
      ApiService.setHeader();
      await ApiService.get("api/po/" + id)
        .then((response) => {
          const poDetails = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.PURCHASE.SET_PO_DETAILS, poDetails.data[0]);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    async [ACTIONS.PURCHASE.FETCH_POR_DETAILS_BY_ID]({ commit, state }, id) {
      ApiService.setHeader();
      await ApiService.get("api/poreceipt/" + id)
        .then((response) => {
          const porDetails = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.PURCHASE.SET_POR_DETAILS, porDetails.data[0]);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    async [ACTIONS.PURCHASE.ADD_PURCHASE_ORDER]({ commit, state }, data) {
      ApiService.setHeader();
      return await ApiService.post("api/po", data)
        .then((response) => {
          if (response.status === 200) {
            const newPO = JSON.parse(JSON.stringify(response.data));
            return newPO.message;
          }
        })
        .catch(({ response }) => {
          return response.data;
        });
    },


    async [ACTIONS.PURCHASE.CREATE_PO_RECEIVE]({ commit, state }, data) {
      ApiService.setHeader();
      return await ApiService.post("api/poreceipt", data)
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

    // Delete po
    async [ACTIONS.PURCHASE.DELETE_PO_ORDER]({ commit, state }, data) {
      ApiService.setHeader();

      return new Promise<AxiosResponse>((resolve, reject) => {
        ApiService.delete("api/po/" + data.id)
            .then((response:AxiosResponse) => {
              if (response.status === 200) {
                commit(MUTATIONS.PURCHASE.SET_PO_DELETE_RESULT, data);
              }
              resolve(response);
            })
            .catch((err) => {
              reject(err);
            });
      });
    },

    // Delete po receive
    async [ACTIONS.PURCHASE.DELETE_PO_RECEIVE]({ commit, state }, data) {
      ApiService.setHeader();

      return new Promise<AxiosResponse>((resolve, reject) => {
        ApiService.delete("api/poreceipt/" + data.id)
            .then((response: AxiosResponse) => {
              if (response.status === 200) {
                commit(MUTATIONS.PURCHASE.SET_PO_RECEIVE_DELETE, data);
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
    [MUTATIONS.PURCHASE.SET_PO_lIST]: (state, data) => {
      state.poList = data;
    },

    [MUTATIONS.PURCHASE.SET_TAX_AND_PORT_lIST]: (state, data) => {
      state.taxAndPortFeeList = data;
    },

    [MUTATIONS.PURCHASE.PUSH_TAX_AND_PORT_RESPONSE]: (state, data) => {
      state.taxAndPortFeeList.data.push(data[0]) ;
    },

    [MUTATIONS.PURCHASE.SET_SEARCHED_PURCHASE_REPORT]: (state, data) => {
      state.purchaseReportBySearch = data;
    },

    [MUTATIONS.PURCHASE.SET_POR_lIST]: (state, data) => {
      state.porList = data;
    },

    [MUTATIONS.PURCHASE.SET_PO_DETAILS]: (state, data) => {
      state.poDetailsById = data;
    },

    [MUTATIONS.PURCHASE.SET_POR_DETAILS]: (state, data) => {
      state.porDetailsById = data;
    },

    [MUTATIONS.PURCHASE.SET_PO_DELETE_RESULT]: (state, data) => {
      state.poList.splice(data.index, 1);
    },

    [MUTATIONS.PURCHASE.SET_PO_RECEIVE_DELETE]: (state, data) => {
      state.porList.splice(data.index, 1);
    },

    [MUTATIONS.PURCHASE.TAX_AND_PORT_DELETE]: (state, data) => {
      state.taxAndPortFeeList.data.splice(data.index, 1);
    },

      [MUTATIONS.PURCHASE.DELTE_PO_PAYMENT]: (state, data) => {
          state.poPaymentStatistics.purchaseOrderPaymentDetails.splice(data.index, 1);
      },

      [MUTATIONS.PURCHASE.SET_PO_PAYMENT_STATISTICS]: (state, data) => {
      state.poPaymentStatistics = data[0];
    },
  },
};
