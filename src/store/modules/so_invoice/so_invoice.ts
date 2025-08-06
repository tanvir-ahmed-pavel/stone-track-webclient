import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";
import {AxiosPromise, AxiosResponse} from "axios";

export default {
  state: {
    soInvoiceList: [],
    singleSoInvoice: {},
  },

  getters: {
    // Get SoInvoice List
    [GETTERS.SO_INVOICE.soInvoiceList]: (state) => {
      return state.soInvoiceList;
    },

    // Get Single so invoice
    [GETTERS.SO_INVOICE.singleSoInvoice]: (state) => {
      return state.singleSoInvoice;
    },
  },

  actions: {
    // Fetch SoInvoice List
    async [ACTIONS.SO_INVOICE.FETCH_SO_INVOICE_LIST]({ commit }) {
      ApiService.setHeader();
      await ApiService.get("api/soinvoice/")
        .then((response) => {
          const soInvoiceLists = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.SO_INVOICE.SET_SO_INVOICE_lIST, soInvoiceLists.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Fetch SingleSoInvoice List
    async [ACTIONS.SO_INVOICE.FETCH_SO_INVOICE]({ commit }, id) {
      ApiService.setHeader();
      await ApiService.get("api/soinvoice/" + id)
        .then((response) => {
          const soInvoice = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.SO_INVOICE.SET_SINGLE_SO_INVOICE, soInvoice.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Create SoInvoice
    async [ACTIONS.SO_INVOICE.CREATE_SO_INVOICE]({ commit }, payload) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.post("api/soinvoice", payload)
          .then((response) => {
            if (response.status === 200) {
              const newSoInvoice = JSON.parse(JSON.stringify(response.data));
              // commit(
              //   MUTATIONS.SO_INVOICE.SET_SO_INVOICE,
              //   newSoInvoice.data[0]
              // );
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // Update SoInvoice

    async [ACTIONS.SO_INVOICE.EDIT_SO_INVOICE]({ commit }, payload) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.put("api/soinvoice/" + payload.id, payload.data)
          .then((response) => {
            if (response.status === 200) {
              const updateSoInvoice = JSON.parse(JSON.stringify(response.data));
              commit(
                MUTATIONS.SO_INVOICE.UPDATE_SO_INVOICE,
                updateSoInvoice.data[0]
              );
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // Delete SO_INVOICE

    async [ACTIONS.SO_INVOICE.DELETE_SO_INVOICE]({ commit }, data) {
      ApiService.setHeader();
      return new Promise<AxiosResponse>((resolve, reject) => {
        ApiService.delete("api/soinvoice/" + data.id)
          .then((response:AxiosResponse) => {
            if (response.status === 200) {
              commit(MUTATIONS.SO_INVOICE.DELETE_SO_INVOICE, data);
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
    [MUTATIONS.SO_INVOICE.SET_SO_INVOICE_lIST]: (state, data) => {
      state.soInvoiceList = data;
    },

    [MUTATIONS.SO_INVOICE.SET_SINGLE_SO_INVOICE]: (state, data) => {
      state.singleSoInvoice = data[0];
    },

    [MUTATIONS.SO_INVOICE.SET_SO_INVOICE]: (state, data) => {
      state.soInvoiceList.unshift(data);
    },

    [MUTATIONS.SO_INVOICE.UPDATE_SO_INVOICE]: (state, data) => {
      const index = state.soInvoiceList.findIndex(
        (soInvoiceList) => soInvoiceList.id === data.id
      );
      if (index > -1) {
        state.soInvoiceList[index] = data;
      }
    },

    [MUTATIONS.SO_INVOICE.DELETE_SO_INVOICE]: (state, data) => {
      state.soInvoiceList.splice(data.index, 1);
    },
  },
};
