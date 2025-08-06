import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";
import {AxiosResponse} from "axios";

export default {
  state: {
    account: {
      account_head_name: "",
      account_number: "",
      account_status: "",
      account_type_id: "",
      bank_account_head_name: "",
      branch: "",
      id: "",
      is_default: "",
      parent_id: "",
      routing_number: "",
      swift_code: "",
    },

    fixedAssetAccList:{},

    accountList: [],
    openingBalanceList: [],
    openingBalanceById: [],
    incomeExpenseList: [],
    incomeExpenseDetails: [],
    bankAccountList: [],
    balance: [],

    // Reports
    accountsPayableDetailsReport: [],
    accountPayableSummaryReport: [],

    accountsReceivableDetailsReport: [],
    accountReceivableSummaryReport: [],
  },

  getters: {
    [GETTERS.ACCOUNT.balance]: (state) => {
      return state.balance;
    },

    [GETTERS.ACCOUNT.account]: (state) => {
      return state.account;
    },

    [GETTERS.ACCOUNT.fixedAssetAccList]: (state) => {
      return state.fixedAssetAccList;
    },

    [GETTERS.ACCOUNT.bankAccountList]: (state) => {
      return state.bankAccountList;
    },

    [GETTERS.ACCOUNT.openingBalanceList]: (state) => {
      return state.openingBalanceList;
    },

    [GETTERS.ACCOUNT.openingBalanceById]: (state) => {
      return state.openingBalanceById;
    },

    [GETTERS.ACCOUNT.accountList]: (state) => {
      return state.accountList;
    },

    [GETTERS.ACCOUNT.incomeExpenseList]: (state) => {
      return state.incomeExpenseList;
    },

    [GETTERS.ACCOUNT.incomeExpenseDetails]: (state) => {
      return state.incomeExpenseDetails;
    },

    // Reports
    [GETTERS.ACCOUNT.accountsPayableDetailsReport]: (state) => {
      return state.accountsPayableDetailsReport;
    },

    [GETTERS.ACCOUNT.accountPayableSummaryReport]: (state) => {
      return state.accountPayableSummaryReport;
    },

    [GETTERS.ACCOUNT.accountsReceivableDetailsReport]: (state) => {
      return state.accountsReceivableDetailsReport;
    },

    [GETTERS.ACCOUNT.accountReceivableSummaryReport]: (state) => {
      return state.accountReceivableSummaryReport;
    },
  },

  actions: {

    // Fetch balance
    async [ACTIONS.ACCOUNT.FETCH_BALANCE]({ commit, state }) {
      ApiService.setHeader();
      await ApiService.get("api/cashAndBankBalance")
        .then((response) => {
          const accounts = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.ACCOUNT.SET_BALANCE, accounts.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Fetch Account List
    async [ACTIONS.ACCOUNT.FETCH_ACCOUNT_LIST]({ commit, state }) {
      ApiService.setHeader();
      await ApiService.get("api/chartOfAccount")
          .then((response) => {
            const accounts = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.ACCOUNT.SET_ACCOUNT_lIST, accounts.data);
          })
          .catch(({ response }) => {
            return response.data;
          });
    },

    // Fetch Fixed Asset Account List
    async [ACTIONS.ACCOUNT.FETCH_FIXED_ASSET_ACCOUNT_LIST]({ commit, state }) {
      ApiService.setHeader();
      await ApiService.get("api/allFixedAccountsList")
          .then((response) => {
            const fixedAcc = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.ACCOUNT.SET_FIXED_ASSET_ACCOUNT_LIST, fixedAcc);
          })
          .catch(({ response }) => {
            return response.data;
          });
    },

    // Fetch Account
    async [ACTIONS.ACCOUNT.FETCH_ACCOUNT]({ commit, state }, payload) {
      ApiService.setHeader();
      if (payload) {
        await ApiService.get("api/chartOfAccount/" + payload)
          .then((response) => {
            const account = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.ACCOUNT.SET_ACCOUNT_EDIT, account.data);
          })
          .catch(({ response }) => {
            return response.data;
          });
      } else {
        commit(MUTATIONS.ACCOUNT.SET_ACCOUNT_EDIT, null);
      }
    },

    // Fetch Income/Expense List
    async [ACTIONS.ACCOUNT.FETCH_INCOME_EXPENSES]({ commit, state }) {
      ApiService.setHeader();
      await ApiService.get("api/payment")
        .then((response) => {
          const paymentList = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.ACCOUNT.SET_INCOME_EXPENSE_lIST, paymentList.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Fetch Income/Expense Details
    async [ACTIONS.ACCOUNT.FETCH_INCOME_EXPENSE_DETAILS](
      { commit, state },
      payload
    ) {
      ApiService.setHeader();
      if (payload) {
        await ApiService.get("api/payment/" + payload)
          .then((response) => {
            const ieDetails = JSON.parse(JSON.stringify(response.data));
            commit(
              MUTATIONS.ACCOUNT.SET_INCOME_EXPENSE_DETAILS,
              ieDetails.data[0]
            );
          })
          .catch(({ response }) => {
            return response.data;
          });
      }
    },

    // Delete Income Expense

    async [ACTIONS.ACCOUNT.DELETE_INCOME_EXPENSE]({ commit }, data) {
      ApiService.setHeader();

      return new Promise<AxiosResponse>((resolve, reject) => {
        ApiService.delete("api/payment/" + data.id)
            .then((response:AxiosResponse) => {
              if (response.status === 200) {
                commit(MUTATIONS.ACCOUNT.DELETE_INCOME_EXPENSE, data);
              }
              resolve(response);
            })
            .catch((err) => {
              reject(err);
            });
      });
    },

    // Fetch Opening Balance List
    async [ACTIONS.ACCOUNT.FETCH_OPENING_BALANCE_LIST]({ commit, state }) {
      ApiService.setHeader();
      await ApiService.get("api/opening/entry")
          .then((response) => {
            const openingBalanceList = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.ACCOUNT.SET_OPENING_BALANCE_LIST, openingBalanceList.data);
          })
          .catch(({ response }) => {
            return response.data;
          });
    },

    /// Fetch Opening Balance By Id
      async [ACTIONS.ACCOUNT.FETCH_OPENING_BALANCE_BY_ID]({ commit, state }, id) {
          ApiService.setHeader();
          await ApiService.get("api/opening/entry/"+id)
              .then((response) => {
                  const openingBalanceById = JSON.parse(JSON.stringify(response.data));
                  commit(MUTATIONS.ACCOUNT.SET_OPENING_BALANCE_BY_ID, openingBalanceById.data[0]);
              })
              .catch(({ response }) => {
                  return response.data;
              });
      },

    // Create Opening Balance
    async [ACTIONS.ACCOUNT.CREATE_OPENING_BALANCE]({ commit }, payload) {
      ApiService.setHeader();
      return await new Promise<AxiosResponse>((resolve, reject) => {
        ApiService.post("api/opening/entry", payload)
            .then((response) => {
              resolve(response);
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
      });
    },

    // Delete Opening Balance

    async [ACTIONS.ACCOUNT.DELETE_OPENING_BALANCE]({ commit }, data) {
      ApiService.setHeader();

      return new Promise<AxiosResponse>((resolve, reject) => {
        ApiService.delete("api/opening/entry/" + data.id)
            .then((response) => {
              if (response.status === 200) {
                commit(MUTATIONS.ACCOUNT.DELETE_OPENING_BALANCE, data);
              }
              resolve(response);
            })
            .catch((err) => {
              reject(err);
            });
      });
    },

    // Clear Account
    async [ACTIONS.ACCOUNT.CLEAR_ACCOUNT]({ commit }) {
      commit(MUTATIONS.ACCOUNT.CLEAR_ACCOUNT_EDIT);
    },

    // Fetch Bank List
    async [ACTIONS.ACCOUNT.FETCH_BANK_ACCOUNT_LIST]({ commit, state }) {
      ApiService.setHeader();
      await ApiService.get("api/lcBankAccount")
        .then((response) => {
          const bankAccounts = JSON.parse(JSON.stringify(response.data));
          commit(MUTATIONS.ACCOUNT.SET_BANK_ACCOUNT_lIST, bankAccounts.data);
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Create Account
    async [ACTIONS.ACCOUNT.CREATE_ACCOUNT]({ commit }, payload) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.post("api/chartOfAccount", payload)
            .then((response) => {
              if (response.status === 200) {
                console.log(response);
                const newAccount = JSON.parse(JSON.stringify(response.data));
                commit(MUTATIONS.ACCOUNT.SET_ACCOUNT, newAccount.data[0]);
              }
              resolve();
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
      });
    },

    // Update Account

    async [ACTIONS.ACCOUNT.EDIT_ACCOUNT]({ commit }, payload) {
      ApiService.setHeader();
      return await new Promise<void>((resolve, reject) => {
        ApiService.put("api/chartOfAccount/" + payload.id, payload.data)
          .then((response) => {
            if (response.status === 200) {
              const updateAccount = JSON.parse(JSON.stringify(response.data));
              commit(MUTATIONS.ACCOUNT.UPDATE_ACCOUNT, updateAccount.data[0]);
            }
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    async [ACTIONS.ACCOUNT.DELETE_ACCOUNT]({ commit, state }, data) {
      ApiService.setHeader();
      return await ApiService.delete("api/chartOfAccount/" + data.id)
        .then((response) => {
          if (response.status === 200) {
            const deleteAccount = JSON.parse(JSON.stringify(response.data));
            commit(MUTATIONS.ACCOUNT.DELETE_ACCOUNT, data.id);
            return deleteAccount.message;
          }
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            return response.data;
          }
        });
    },

    // Reports
    async [ACTIONS.ACCOUNT.FETCH_ACCOUNTS_PAYABLE_DETAILS_REPORT](
      { commit, state },
      payload
    ) {
      ApiService.setHeader();
      await ApiService.post("api/report/account-payable-details", payload)
        .then((response) => {
          const accountsPayableDetails = JSON.parse(
            JSON.stringify(response.data)
          );
          commit(
            MUTATIONS.ACCOUNT.SET_ACCOUNTS_PAYABLE_DETAILS_REPORT,
            accountsPayableDetails
          );
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    async [ACTIONS.ACCOUNT.FETCH_ACCOUNTS_PAYABLE_SUMMARY_REPORT](
      { commit, state },
      payload
    ) {
      ApiService.setHeader();
      await ApiService.post("api/report/account-payable-summary", payload)
        .then((response) => {
          const accountsPayableSummary = JSON.parse(
            JSON.stringify(response.data)
          );
          commit(
            MUTATIONS.ACCOUNT.SET_ACCOUNTS_PAYABLE_SUMMARY_REPORT,
            accountsPayableSummary
          );
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // A/C Receivable

    async [ACTIONS.ACCOUNT.FETCH_ACCOUNTS_RECEIVABLE_DETAILS_REPORT](
        { commit, state },
        payload
    ) {
      ApiService.setHeader();
      await ApiService.post("api/report/account-receivable-details", payload)
          .then((response) => {
            const accountsReceivableDetails = JSON.parse(
                JSON.stringify(response.data)
            );
            commit(
                MUTATIONS.ACCOUNT.SET_ACCOUNTS_RECEIVABLE_DETAILS_REPORT,
                accountsReceivableDetails
            );
          })
          .catch(({ response }) => {
            return response.data;
          });
    },

    async [ACTIONS.ACCOUNT.FETCH_ACCOUNTS_RECEIVABLE_SUMMARY_REPORT](
        { commit, state },
        payload
    ) {
      ApiService.setHeader();
      await ApiService.post("api/report/account-receivable-summary", payload)
          .then((response) => {
            const accountsReceivableSummary = JSON.parse(
                JSON.stringify(response.data)
            );
            commit(
                MUTATIONS.ACCOUNT.SET_ACCOUNTS_RECEIVABLE_SUMMARY_REPORT,
                accountsReceivableSummary
            );
          })
          .catch(({ response }) => {
            return response.data;
          });
    },

  },

  mutations: {
    [MUTATIONS.ACCOUNT.SET_ACCOUNT_lIST]: (state, data) => {
      state.accountList = data;
    },

    [MUTATIONS.ACCOUNT.SET_FIXED_ASSET_ACCOUNT_LIST]: (state, data) => {
      state.fixedAssetAccList = data;
    },

    [MUTATIONS.ACCOUNT.SET_OPENING_BALANCE_LIST]: (state, data) => {
      state.openingBalanceList = data;
    },

    [MUTATIONS.ACCOUNT.SET_OPENING_BALANCE_BY_ID]: (state, data) => {
      state.openingBalanceById = data;
    },

    [MUTATIONS.ACCOUNT.DELETE_OPENING_BALANCE]: (state, data) => {
      state.openingBalanceList.splice(data.index, 1);
    },


    [MUTATIONS.ACCOUNT.SET_INCOME_EXPENSE_lIST]: (state, data) => {
      state.incomeExpenseList = data;
    },

    [MUTATIONS.ACCOUNT.SET_INCOME_EXPENSE_DETAILS]: (state, data) => {
      state.incomeExpenseDetails = data;
    },

    [MUTATIONS.ACCOUNT.DELETE_INCOME_EXPENSE]: (state, data) => {
      state.incomeExpenseList.splice(data.index, 1);
    },

    [MUTATIONS.ACCOUNT.SET_BANK_ACCOUNT_lIST]: (state, data) => {
      state.bankAccountList = data;
    },

    [MUTATIONS.ACCOUNT.SET_BALANCE]: (state, data) => {
      state.balance = data;
    },

    [MUTATIONS.ACCOUNT.SET_ACCOUNT_EDIT]: (state, data) => {
      if (data) {
        state.account = data[0];
      }
    },

    [MUTATIONS.ACCOUNT.CLEAR_ACCOUNT_EDIT]: (state) => {
      state.account = {
        account_head_name: "",
        account_number: "",
        account_status: "",
        account_type_id: "",
        bank_account_head_name: "",
        branch: "",
        id: "",
        is_default: "",
        parent_id: "",
        routing_number: "",
        swift_code: "",
      };
    },

    [MUTATIONS.ACCOUNT.SET_ACCOUNT]: (state, data) => {
      state.accountList.unshift(data);
    },

    [MUTATIONS.ACCOUNT.UPDATE_ACCOUNT]: (state, data) => {
      const index = state.accountList.findIndex(
        (account) => account.id === data.id
      );
      if (index > -1) {
        state.accountList[index] = data;
      }
    },

    [MUTATIONS.ACCOUNT.DELETE_ACCOUNT]: (state, id) => {
      const index = state.accountList.findIndex((account) => account.id === id);
      if (index > -1) {
        state.accountList.splice(index);
      }
    },

    // Reports

    [MUTATIONS.ACCOUNT.SET_ACCOUNTS_PAYABLE_DETAILS_REPORT]: (state, data) => {
      state.accountsPayableDetailsReport = data;
    },

    [MUTATIONS.ACCOUNT.SET_ACCOUNTS_PAYABLE_SUMMARY_REPORT]: (state, data) => {
      state.accountPayableSummaryReport = data;
    },

    [MUTATIONS.ACCOUNT.SET_ACCOUNTS_RECEIVABLE_DETAILS_REPORT]: (state, data) => {
      state.accountsReceivableDetailsReport = data;
    },

    [MUTATIONS.ACCOUNT.SET_ACCOUNTS_RECEIVABLE_SUMMARY_REPORT]: (state, data) => {
      state.accountReceivableSummaryReport = data;
    },
  },
};
