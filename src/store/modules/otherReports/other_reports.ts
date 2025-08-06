import ApiService from "@/core/services/ApiService";
import {
  ACTIONS,
  MUTATIONS,
  GETTERS,
} from "@/store/modules/enums/StoreModuleEnums";

export default {
  state: {
    // Bank Statement
    bankStatementReport: [],

    // Cash Statement
    cashStatementReport: [],

    // Stock Balance
    StockBalanceReport: [],

      // Profit and loss
      ProfitAndLoss: [],
  },

  getters: {

    // Bank Statement
    [GETTERS.OTHER_REPORTS.bankStatementReport]: (state) => {
      return state.bankStatementReport;
    },

    // Cash Statement
    [GETTERS.OTHER_REPORTS.cashStatementReport]: (state) => {
      return state.cashStatementReport;
    },

    // Stock Balance
    [GETTERS.OTHER_REPORTS.stockBalanceReport]: (state) => {
      return state.StockBalanceReport;
    },

      // Profit and loss
      [GETTERS.OTHER_REPORTS.ProfitAndLossReport]: (state) => {
          return state.ProfitAndLoss;
      },

  },

  actions: {

    // Bank Statement
    async [ACTIONS.OTHER_REPORTS.FETCH_BANK_STATEMENT_REPORT](
      { commit, state },
      payload
    ) {
      ApiService.setHeader();
      await ApiService.post("api/report/bank-transactions", payload)
        .then((response) => {
          const bankStatement = JSON.parse(
            JSON.stringify(response.data)
          );
          commit(
            MUTATIONS.OTHER_REPORTS.SET_BANK_STATEMENT_REPORT,
            bankStatement
          );
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Cash Statement
    async [ACTIONS.OTHER_REPORTS.FETCH_CASH_STATEMENT_REPORT](
      { commit, state },
      payload
    ) {
      ApiService.setHeader();
      await ApiService.post("api/report/cash-transactions", payload)
        .then((response) => {
          const cashStatementRepots = JSON.parse(
            JSON.stringify(response.data)
          );
          commit(
            MUTATIONS.OTHER_REPORTS.SET_CASH_STATEMENT_REPORT,
            cashStatementRepots
          );
        })
        .catch(({ response }) => {
          return response.data;
        });
    },

    // Stock Balance
    async [ACTIONS.OTHER_REPORTS.FETCH_STOCK_BALANCE_REPORT](
        { commit, state },
        payload
    ) {
      ApiService.setHeader();
      await ApiService.post("api/report/stock-balance", payload)
          .then((response) => {
            const stockBalanceReports = JSON.parse(
                JSON.stringify(response.data)
            );
            commit(
                MUTATIONS.OTHER_REPORTS.SET_STOCK_BALANCE_REPORT,
                stockBalanceReports
            );
          })
          .catch(({ response }) => {
            return response.data;
          });
    },

      // Profit and Loss
      async [ACTIONS.OTHER_REPORTS.FETCH_PROFIT_AND_LOSS_REPORT](
          { commit, state },
          payload
      ) {
          ApiService.setHeader();
          await ApiService.post("api/", payload)
              .then((response) => {
                  const stockBalanceReports = JSON.parse(
                      JSON.stringify(response.data)
                  );
                  commit(
                      MUTATIONS.OTHER_REPORTS.SET_PROFIT_AND_LOSS_REPORT,
                      stockBalanceReports
                  );
              })
              .catch(({ response }) => {
                  return response.data;
              });
      },

  },

  mutations: {

    // Bank Statement

    [MUTATIONS.OTHER_REPORTS.SET_BANK_STATEMENT_REPORT]: (state, data) => {
      state.bankStatementReport = data;
    },

    // Cash Statement
    [MUTATIONS.OTHER_REPORTS.SET_CASH_STATEMENT_REPORT]: (state, data) => {
      state.cashStatementReport = data;
    },

    // Stock Balance
    [MUTATIONS.OTHER_REPORTS.SET_STOCK_BALANCE_REPORT]: (state, data) => {
      state.StockBalanceReport = data;
    },

      // Stock Balance
    [MUTATIONS.OTHER_REPORTS.SET_PROFIT_AND_LOSS_REPORT]: (state, data) => {
      state.ProfitAndLoss = data;
    },

  },
};
