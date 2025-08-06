import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";

import { Mutations, Actions } from "@/store/modules/enums/StoreEnums";

function isSuperAdmin(to, from) {
  const user = store.getters.currentUser;

  if (user.id == 1) {
    return true;
  }
  return false;
}
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layout/Layout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboards/MainDashboard.vue"),
      },
      {
        path: "/old-dashboard",
        name: "old-dashboard",
        component: () => import("@/views/Dashboard.vue"),
      },

      // Opening Balance
      {
        path: "/getting-started/opening-balance",
        name: "opening-balance",
        component: () =>
            import("@/views/getting_started/opening_balance/OpeningBalanceList.vue"),
      },

      // Opening Balance Create
      {
        path: "/getting-started/opening-balance/create",
        name: "opening-balance-create",
        component: () =>
            import("@/views/getting_started/opening_balance/AddOpeningBalance.vue"),
      },

      // Opening Balance Details
      {
        path: "/getting-started/opening-balance/:id",
        name: "opening-balance-details",
        component: () =>
            import("@/views/getting_started/opening_balance/OpeningBalanceDetails.vue"),
      },

      // Items Route
      {
        path: "/getting-started/items",
        name: "items",
        component: () =>
          import("@/views/getting_started/items/ItemsListing.vue"),
      },

      // Customers Route
      {
        path: "/getting-started/customers",
        name: "customers",
        component: () =>
          import("@/views/getting_started/customers/CustomersListing.vue"),
      },

      // Customer View
      {
        path: "/getting-started/customers/:customer_id",
        name: "customer-dashboard",
        component: () => import("@/views/dashboards/CustomerDashboard.vue"),
      },

      // Suppliers Route
      {
        path: "/getting-started/suppliers",
        name: "suppliers",
        component: () =>
          import("@/views/getting_started/suppliers/SupplierListing.vue"),
      },
      {
        path: "/getting-started/suppliers/:supplier_id",
        name: "suppliers-dashboard",
        component: () => import("@/views/dashboards/SupplierDashboard.vue"),
      },

      // Chart of accounts Route
      {
        path: "/getting-started/accounts",
        name: "accounts",
        component: () =>
          import("@/views/getting_started/accounts/AccountsListing.vue"),
      },

      // Accounts Payable Details
      {
        path: "/reports/accounts-payable-details",
        name: "accounts-payable-details",
        component: () =>
          import(
            "@/views/getting_started/accounts/reports/AccountsPayableDetails.vue"
          ),
      },

      // Accounts Payable Summary
      {
        path: "/reports/accounts-payable-summary",
        name: "accounts-payable-summary",
        component: () =>
          import(
            "@/views/getting_started/accounts/reports/AccountsPayableSummary.vue"
          ),
      },

      // Accounts Receivable Details
      {
        path: "/reports/accounts-receivable-details",
        name: "accounts-receivable-details",
        component: () =>
            import(
                "@/views/getting_started/accounts/reports/AccountsReceivableDetails.vue"
                ),
      },

      // Accounts Receivable Summary
      {
        path: "/reports/accounts-receivable-summary",
        name: "accounts-receivable-summary",
        component: () =>
            import(
                "@/views/getting_started/accounts/reports/AccountsReceivableSummary.vue"
                ),
      },

      // Drivers Route
      {
        path: "/getting-started/drivers",
        name: "drivers",
        component: () =>
          import("@/views/getting_started/drivers/DriversListing.vue"),
      },

      // Vehicles Route
      {
        path: "/getting-started/vehicles",
        name: "vehicles",
        component: () =>
          import("@/views/getting_started/vehicles/VehicleListing.vue"),
      },

      // LC Route
      {
        path: "/lc",
        name: "LC",
        component: () => import("@/views/buying/lc/lcListing.vue"),
      },

      // LC View
      {
        path: "/lc/:lc_id",
        name: "lc-dashboard",
        component: () => import("@/views/dashboards/LCDashboard.vue"),
      },

      // Purchase Order List
      {
        path: "/purchase-order-list",
        name: "po-list",
        component: () => import("@/views/purchase/POList.vue"),
      },

      // SO Dashboard
      {
        path: "/purchase-order-list/dashboard/:po_id",
        name: "po-dashboard",
        component: () =>
            import("@/views/dashboards/PODashboard.vue"),
      },

      // Tax and Port
      {
        path: "/purchase-order-list/:po_id/tax-port",
        name: "tax-port",
        component: () => import("@/views/purchase/TaxAndPortFee.vue"),
      },

      // Purchase Order
      {
        path: "/purchase-order/create",
        name: "purchase",
        component: () => import("@/views/purchase/AddPurchaseOrder.vue"),
      },

      // Purchase Order Details
      {
        path: "/po-details/:id",
        name: "po-details",
        component: () => import("@/views/purchase/PODetails.vue"),
      },

      // PurchaseOrder Receive
      {
        path: "/po-receive/:id",
        name: "po-receive",
        component: () => import("@/views/purchase/PurchaseOrderReceive.vue"),
      },

      // PurchaseOrder Receive List
      {
        path: "/por-receive-list/:id",
        name: "por-receive-list",
        component: () => import("@/views/purchase/PORList.vue"),
      },

      // Purchase Order Receive Details
      {
        path: "/por-details/:id",
        name: "por-details",
        component: () => import("@/views/purchase/PORDetails.vue"),
      },

      // Purchase Invoice List
      {
        path: "/purchase-invoice-list",
        name: "pi-list",
        component: () => import("@/views/purchase/PIList.vue"),
      },


      // Purchase Invoice
      {
        path: "/purchase-invoice/:id",
        name: "purchase-invoice",
        component: () => import("@/views/purchase/PIDetails.vue"),
      },

      // Purchase Payment
      {
        path: "/purchase-order/:po_id/payments",
        name: "purchase-payment",
        component: () => import("@/views/purchase/PurchasePayment.vue"),
      },


      // Purchase Report
      {
        path: "/purchase-report",
        name: "purchase-report",
        component: () => import("@/views/purchase/PurchaseReport.vue"),
      },

      // Crushing Stone
      {
        path: "/crushing-stone",
        name: "crushing-stone",
        component: () => import("@/views/purchase/CrushingStone.vue"),
      },

      // Income or Expenses
      {
        path: "/payment-entry",
        name: "payment-entry",
        component: () => import("@/views/payments/PaymentEntry.vue"),
      },

      // Income or Expense List
      {
        path: "/payment-entry-list",
        name: "payment-entry-list",
        component: () =>
          import("@/views/payments/PaymentEntryList.vue"),
      },

      // Income or Expense Details
      {
        path: "/ie-details/:id",
        name: "ie-details",
        component: () => import("@/views/payments/PaymentEntryDetails.vue"),
      },

      // Purchase Order Truck Loading
      {
        path: "/purchase-order/:po_id/truck-loading",
        name: "po-truck-loading",
        component: () =>
          import("@/views/purchase/poTruckLoading/PoTruckLoadingListing.vue"),
      },

      // // Truck Loading
      // {
      //   path: "truck-loading",
      //   name: "truck-loading",
      //   component: () =>
      //     import("@/views/purchase/poTruckLoading/PoTruckLoadingListing.vue"),
      // },

      // Sales Order Route
      {
        path: "/sales-order/create",
        name: "sales",
        component: () =>
          import("@/views/selling/sales_order/AddSalesOrder.vue"),
      },

      // SO List
      {
        path: "/sales-order",
        name: "so-list",
        component: () => import("@/views/selling/sales_order/SOList.vue"),
      },

      // SO View
      {
        path: "/sales-order/:id",
        name: "so-view",
        component: () =>
          import("@/views/selling/sales_order/ViewSalesOrder.vue"),
      },

      // SO Dashboard
      {
        path: "/sales-order/dashboard/:so_id",
        name: "so-dashboard",
        component: () =>
            import("@/views/dashboards/SODashboard.vue"),
      },

      // SO Edit
      {
        path: "/sales-order/:id/edit",
        name: "so-edit",
        component: () =>
          import("@/views/selling/sales_order/EditSalesOrder.vue"),
      },

      // SO Delivery
      {
        path: "/sales-order/:id/so-delivery/create",
        name: "so-delivery",
        component: () =>
          import("@/views/selling/so_delivery/AddSODelivery.vue"),
      },

      // SO Delivery Item list
      {
        path: "sales-order/:so_id/so-delivery",
        name: "delivered-item",
        component: () =>
          import("@/views/selling/so_delivery/DeliveredItemList.vue"),
      },

      // SO Delivery Item Details
      {
        path: "sales-order/:so_id/so-delivery/:so_delivery_id",
        name: "show-delivered-item",
        component: () =>
          import("@/views/selling/so_delivery/ViewSODelivery.vue"),
      },

      // SO Invoice List
      {
        path: "/so-invoice",
        name: "so-invoice-list",
        component: () => import("@/views/selling/so_invoice/SOInvoiceList.vue"),
      },

      // SO Invoice Create
      {
        path: "sales-order/:so_id/so-invoice/create",
        name: "so-invoice",
        component: () => import("@/views/selling/so_invoice/AddSOInvoice.vue"),
      },

      // SO Invoice View
      {
        path: "sales-order/so-invoice/:invoice_id",
        name: "so-invoice-view",
        component: () => import("@/views/selling/so_invoice/ViewSOInvoice.vue"),
      },

      // Receive SO Payments
      {
        path: "receive-so-payments/:so_invoice_id",
        name: "receive-so-payments",
        component: () =>
          import("@/views/selling/so_payments/ReceiveSOPayments.vue"),
      },

      // Sales Report
      {
        path: "/sales-report",
        name: "sales-report",
        component: () => import("@/views/selling/sales_order/SalesReport.vue"),
      },

      // Generator
      {
        path: "/generator",
        name: "generator",
        component: () => import("@/views/generator/GeneratorLog.vue"),
      },


      // General Ledger
      {
        path: "/journal-entry/create",
        name: "journal-entry",
        component: () =>
            import("@/views/general_ledger/AddJournalEntry.vue"),
      },


      // Other Reports **********

      //   Bank Statement
      {
        path: "/reports/bank-statement",
        name: "bank-statement",
        component: () => import("@/views/other_reports/BankStatementReports.vue"),
      },

        // Cash Statement
      {
        path: "/reports/cash-statement",
        name: "cash-statement",
        component: () => import("@/views/other_reports/CashStatementReports.vue"),
      },

      // Cash Statement
      {
        path: "/reports/profit-and-loss",
        name: "profit-and-loss",
        component: () => import("@/views/other_reports/Profit&Loss.vue"),
      },

        // Generator Reports
      {
        path: "/reports/stock-balance-reports",
        name: "stock-balance-reports",
        component: () => import("@/views/other_reports/StockBalanceReports.vue"),
      },

      {
        path: "/generator/reports",
        name: "generator-reports",
        component: () => import("@/views/generator/GeneratorReports.vue"),
      },

      {
        path: "/builder",
        name: "builder",
        component: () => import("@/views/Builder.vue"),
      },
      {
        path: "/crafted/pages/profile",
        name: "profile",
        component: () => import("@/components/page-layouts/Profile.vue"),
        children: [
          {
            path: "overview",
            name: "profile-overview",
            component: () =>
              import("@/views/crafted/pages/profile/Overview.vue"),
          },
          {
            path: "projects",
            name: "profile-projects",
            component: () =>
              import("@/views/crafted/pages/profile/Projects.vue"),
          },
          {
            path: "campaigns",
            name: "profile-campaigns",
            component: () =>
              import("@/views/crafted/pages/profile/Campaigns.vue"),
          },
          {
            path: "documents",
            name: "profile-documents",
            component: () =>
              import("@/views/crafted/pages/profile/Documents.vue"),
          },
          {
            path: "connections",
            name: "profile-connections",
            component: () =>
              import("@/views/crafted/pages/profile/Connections.vue"),
          },
          {
            path: "activity",
            name: "profile-activity",
            component: () =>
              import("@/views/crafted/pages/profile/Activity.vue"),
          },
        ],
      },
      {
        path: "/crafted/pages/wizards/horizontal",
        name: "horizontal-wizard",
        component: () => import("@/views/crafted/pages/wizards/Horizontal.vue"),
      },
      {
        path: "/crafted/pages/wizards/vertical",
        name: "vertical-wizard",
        component: () => import("@/views/crafted/pages/wizards/Vertical.vue"),
      },
      {
        path: "/crafted/account",
        name: "account",
        component: () => import("@/views/crafted/account/Account.vue"),
        children: [
          {
            path: "overview",
            name: "account-overview",
            component: () => import("@/views/crafted/account/Overview.vue"),
          },
          {
            path: "settings",
            name: "account-settings",
            component: () => import("@/views/crafted/account/Settings.vue"),
          },
        ],
      },
      {
        path: "/apps/customers/getting-started",
        name: "apps-customers-getting-started",
        component: () => import("@/views/apps/customers/GettingStarted.vue"),
      },
      {
        path: "/apps/customers/customers-listing",
        name: "apps-customers-listing",
        component: () =>
          import("@/views/getting_started/customers/CustomersListing.vue"),
      },
      {
        path: "/apps/customers/customer-details",
        name: "apps-customers-details",
        component: () => import("@/views/apps/customers/CustomerDetails.vue"),
      },
      {
        path: "/subscriptions/getting-started",
        name: "subscriptions-getting-started",
        component: () =>
          import("@/views/apps/subscriptions/GettingStarted.vue"),
      },
      {
        path: "/subscriptions/subscription-list",
        name: "subscriptions-subscription-list",
        component: () =>
          import("@/views/apps/subscriptions/SubscriptionList.vue"),
      },
      {
        path: "/subscriptions/add-subscription",
        name: "subscriptions-add-subscription",
        component: () =>
          import("@/views/apps/subscriptions/AddSubscription.vue"),
      },
      {
        path: "/subscriptions/view-subscription",
        name: "subscriptions-view-subscription",
        component: () =>
          import("@/views/apps/subscriptions/ViewSubscription.vue"),
      },
      {
        path: "/apps/calendar",
        name: "apps-calendar",
        component: () => import("@/views/apps/Calendar.vue"),
      },
      {
        path: "/apps/chat/private-chat",
        name: "apps-private-chat",
        component: () => import("@/views/apps/chat/Chat.vue"),
      },
      {
        path: "/apps/chat/group-chat",
        name: "apps-group-chat",
        component: () => import("@/views/apps/chat/Chat.vue"),
      },
      {
        path: "/apps/chat/drawer-chat",
        name: "apps-drawer-chat",
        component: () => import("@/views/apps/chat/DrawerChat.vue"),
      },
      {
        path: "/crafted/modals/general/invite-friends",
        name: "modals-general-invite-friends",
        component: () =>
          import("@/views/crafted/modals/general/InviteFriends.vue"),
      },
      {
        path: "/crafted/modals/general/view-user",
        name: "modals-general-view-user",
        component: () => import("@/views/crafted/modals/general/ViewUsers.vue"),
      },
      {
        path: "/crafted/modals/general/upgrade-plan",
        name: "modals-general-upgrade-plan",
        component: () =>
          import("@/views/crafted/modals/general/UpgradePlan.vue"),
      },
      {
        path: "/crafted/modals/general/share-and-earn",
        name: "modals-general-share-and-earn",
        component: () =>
          import("@/views/crafted/modals/general/ShareAndEarn.vue"),
      },
      {
        path: "/crafted/modals/forms/new-target",
        name: "modals-forms-new-target",
        component: () => import("@/views/crafted/modals/forms/NewTarget.vue"),
      },
      {
        path: "/crafted/modals/forms/new-card",
        name: "modals-forms-new-card",
        component: () => import("@/views/crafted/modals/forms/NewCard.vue"),
      },
      {
        path: "/crafted/modals/forms/new-address",
        name: "modals-forms-new-address",
        component: () => import("@/views/crafted/modals/forms/NewAddress.vue"),
      },
      {
        path: "/crafted/modals/forms/create-api-key",
        name: "modals-forms-create-api-key",
        component: () =>
          import("@/views/crafted/modals/forms/CreateApiKey.vue"),
      },
      {
        path: "/crafted/modals/wizards/two-factor-auth",
        name: "modals-wizards-two-factor-auth",
        component: () =>
          import("@/views/crafted/modals/wizards/TwoFactorAuth.vue"),
      },
      {
        path: "/crafted/modals/wizards/create-app",
        name: "modals-wizards-create-app",
        component: () => import("@/views/crafted/modals/wizards/CreateApp.vue"),
      },
      {
        path: "/crafted/modals/wizards/create-account",
        name: "modals-wizards-create-account",
        component: () =>
          import("@/views/crafted/modals/wizards/CreateAccount.vue"),
      },
      {
        path: "/crafted/widgets/lists",
        name: "widgets-list",
        component: () => import("@/views/crafted/widgets/Lists.vue"),
      },
      {
        path: "/crafted/widgets/statistics",
        name: "widgets-statistics",
        component: () => import("@/views/crafted/widgets/Statistics.vue"),
      },
      {
        path: "/crafted/widgets/charts",
        name: "widgets-charts",
        component: () => import("@/views/crafted/widgets/Charts.vue"),
      },
      {
        path: "/crafted/widgets/mixed",
        name: "widgets-mixed",
        component: () => import("@/views/crafted/widgets/Mixed.vue"),
      },
      {
        path: "/crafted/widgets/tables",
        name: "widgets-tables",
        component: () => import("@/views/crafted/widgets/Tables.vue"),
      },
      {
        path: "/crafted/widgets/feeds",
        name: "widgets-feeds",
        component: () => import("@/views/crafted/widgets/Feeds.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/components/page-layouts/Auth.vue"),
    children: [
      {
        path: "/sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
      },
      {
        path: "/sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
      },
      {
        path: "/password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
      },
    ],
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/views/crafted/authentication/Error404.vue"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/crafted/authentication/Error500.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/crafted/authentication/Error404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(() => {
  // reset config to initial state
  store.commit(Mutations.RESET_LAYOUT_CONFIG);

  store.dispatch(Actions.VERIFY_AUTH);

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

export default router;
