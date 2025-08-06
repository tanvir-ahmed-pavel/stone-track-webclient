import store from "@/store";
const user = store.getters.cucurrentUser;
const DocMenuConfig = [
  // Top Pages
  {
    pages: [
      {
        heading: "dashboard",
        route: "/dashboard",
        svgIcon: "media/icons/duotune/abstract/abs030.svg",
        fontIcon: "bi-app-indicator",
      },
      {
        sectionTitle: "gettingStarted",
        route: "/getting-started",
        svgIcon: "media/icons/duotune/coding/cod001.svg",
        // fontIcon: "bi-layers",
        sub: [
          {
            heading: "Opening Balance",
            route: "/getting-started/opening-balance",
          },
          {
            heading: "Items",
            route: "/getting-started/items",
          },
          {
            heading: "Customer",
            route: "/getting-started/customers",
          },
          {
            heading: "Supplier",
            route: "/getting-started/suppliers",
          },
          {
            heading: "Chart of Accounts",
            route: "/getting-started/accounts",
          },
          {
            heading: "Drivers",
            route: "/getting-started/drivers",
          },
          {
            heading: "Vehicles",
            route: "/getting-started/vehicles",
          },
        ],
      },
    ],
  },

  // ***Bottom Menus***

  // Buying

  {
    heading: "buying",
    route: "/buying",
    pages: [
      {
        heading: "LC",
        route: "/lc",
        svgIcon: "media/icons/duotune/ecommerce/ecm008.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "New Purchase Order",
        route: "/purchase-order/create",
        svgIcon: "media/icons/duotune/ecommerce/ecm003.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "Purchase Order List",
        route: "/purchase-order-list",
        svgIcon: "media/icons/duotune/ecommerce/ecm003.svg",
        fontIcon: "bi-printer",
      },
      // {
      //   heading: "Purchase Invoice List",
      //   route: "/purchase-invoice-list",
      //   svgIcon: "media/icons/duotune/finance/fin006.svg",
      //   fontIcon: "bi-printer",
      // },
      {
        heading: "Crushing Stone",
        route: "/crushing-stone",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      // {
      //   heading: "Truck Loading For Purchase",
      //   route: "/truck-loading",
      //   svgIcon: "media/icons/duotune/finance/fin006.svg",
      //   fontIcon: "bi-printer",
      // },
    ],
  },

  // Selling

  {
    heading: "selling",
    route: "/selling",
    pages: [
      {
        heading: "New Sales Order",
        route: "/sales-order/create",
        svgIcon: "media/icons/duotune/files/fil002.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "Sales Order List",
        route: "/sales-order",
        svgIcon: "media/icons/duotune/general/gen005.svg",
        fontIcon: "bi-printer",
      },
    ],
  },

  {
    heading: "General Ledger",
    route: "/general-ledger",
    pages: [
      {
        heading: "Journal Entry",
        route: "/journal-entry/create",
        svgIcon: "media/icons/duotune/general/gen005.svg",
        fontIcon: "bi-printer",
      },
    ],
  },

  // Accounting

  {
    guard: "Super Admin",
    heading: "accounting",
    route: "/accounting",
    pages: [
      // {
      //   heading: "Sales Invoice",
      //   route: "dummy-route",
      //   svgIcon: "media/icons/duotune/finance/fin006.svg",
      //   fontIcon: "bi-printer",
      // },
      {
        heading: "Payment Entry",
        route: "dummy-route",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
    ],
  },

  // Generator
  {
    heading: "GENERATOR",
    route: "",
    pages: [
      {
        heading: "Manage Generator",
        route: "/generator",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "Generator Reports",
        route: "/generator/reports",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
    ],
  },

  // Stock

  {
    guard: "Super Admin",
    heading: "stock",
    route: "/stock",
    pages: [
      {
        heading: "Stock Entry",
        route: "dummy-route",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "Item Delivery",
        route: "dummy-route",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "Purchase Receipt",
        route: "dummy-route",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "Stock Reconciliation",
        route: "dummy-route",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
    ],
  },

  // Income / Expenses
  {
    heading: "Payments",
    pages: [
      {
        heading: "Payment Entry",
        route: "/payment-entry",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "Payment Entry List",
        route: "/payment-entry-list",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
    ],
  },

  // Reports

  {
    heading: "reports",
    route: "/reports",
    pages: [
      {
        guard: "Super Admin",
        heading: "Stock Ledger",
        route: "dummy-route",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "Stock Balance",
        route: "/reports/stock-balance-reports",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "Sales Report",
        route: "/sales-report",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "Purchase Report",
        route: "/purchase-report",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "Bank Statement",
        route: "/reports/bank-statement",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "Cash Statement",
        route: "/reports/cash-statement",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "A/C Receivable Details",
        route: "/reports/accounts-receivable-details",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "A/C Receivable Summary",
        route: "/reports/accounts-receivable-summary",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "A/C Payable Details",
        route: "/reports/accounts-payable-details",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "A/C Payable Summary",
        route: "/reports/accounts-payable-summary",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "Profit & Loss",
        route: "/reports/profit-and-loss",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
    ],
  },

  // Settings

  {
    guard: "Super Admin",
    heading: "settings",
    route: "/settings",
    pages: [
      {
        heading: "Stock settings",
        route: "dummy-route",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
      {
        heading: "Warehouse",
        route: "dummy-route",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
      },
    ],
  },

  {
    guard: "Super Admin",
    heading: "craft",
    route: "/crafted",
    pages: [
      {
        sectionTitle: "pages",
        route: "/pages",
        svgIcon: "media/icons/duotune/general/gen022.svg",
        fontIcon: "bi-archive",
        sub: [
          {
            sectionTitle: "profile",
            route: "/profile",
            sub: [
              {
                heading: "profileOverview",
                route: "/crafted/pages/profile/overview",
              },
              {
                heading: "projects",
                route: "/crafted/pages/profile/projects",
              },
              {
                heading: "campaigns",
                route: "/crafted/pages/profile/campaigns",
              },
              {
                heading: "documents",
                route: "/crafted/pages/profile/documents",
              },
              {
                heading: "connections",
                route: "/crafted/pages/profile/connections",
              },
              {
                heading: "activity",
                route: "/crafted/pages/profile/activity",
              },
            ],
          },
          {
            sectionTitle: "wizards",
            route: "/wizard",
            sub: [
              {
                heading: "horizontal",
                route: "/crafted/pages/wizards/horizontal",
              },
              {
                heading: "vertical",
                route: "/crafted/pages/wizards/vertical",
              },
            ],
          },
        ],
      },
      {
        sectionTitle: "account",
        route: "/account",
        svgIcon: "media/icons/duotune/communication/com006.svg",
        fontIcon: "bi-person",
        sub: [
          {
            heading: "accountOverview",
            route: "/crafted/account/overview",
          },
          {
            heading: "settings",
            route: "/crafted/account/settings",
          },
        ],
      },
      {
        sectionTitle: "authentication",
        svgIcon: "media/icons/duotune/technology/teh004.svg",
        fontIcon: "bi-sticky",
        sub: [
          {
            sectionTitle: "basicFlow",
            sub: [
              {
                heading: "signIn",
                route: "/sign-in",
              },
              {
                heading: "signUp",
                route: "/sign-up",
              },
              {
                heading: "passwordReset",
                route: "/password-reset",
              },
            ],
          },
          {
            heading: "error404",
            route: "/404",
          },
          {
            heading: "error500",
            route: "/500",
          },
        ],
      },
      {
        sectionTitle: "modals",
        route: "/modals",
        svgIcon: "media/icons/duotune/art/art009.svg",
        fontIcon: "bi-shield-check",
        sub: [
          {
            sectionTitle: "general",
            route: "/general",
            sub: [
              {
                heading: "inviteFriends",
                route: "/crafted/modals/general/invite-friends",
              },
              {
                heading: "viewUsers",
                route: "/crafted/modals/general/view-user",
              },
              {
                heading: "upgradePlan",
                route: "/crafted/modals/general/upgrade-plan",
              },
              {
                heading: "shareAndEarn",
                route: "/crafted/modals/general/share-and-earn",
              },
            ],
          },
          {
            sectionTitle: "forms",
            route: "/forms",
            sub: [
              {
                heading: "newTarget",
                route: "/crafted/modals/forms/new-target",
              },
              {
                heading: "newCard",
                route: "/crafted/modals/forms/new-card",
              },
              {
                heading: "newAddress",
                route: "/crafted/modals/forms/new-address",
              },
              {
                heading: "createAPIKey",
                route: "/crafted/modals/forms/create-api-key",
              },
            ],
          },
          {
            sectionTitle: "wizards",
            route: "/wizards",
            sub: [
              {
                heading: "twoFactorAuth",
                route: "/crafted/modals/wizards/two-factor-auth",
              },
              {
                heading: "createApp",
                route: "/crafted/modals/wizards/create-app",
              },
              {
                heading: "createAccount",
                route: "/crafted/modals/wizards/create-account",
              },
            ],
          },
        ],
      },
      {
        sectionTitle: "widgets",
        route: "/widgets",
        svgIcon: "media/icons/duotune/general/gen025.svg",
        fontIcon: "bi-layers",
        sub: [
          {
            heading: "widgetsLists",
            route: "/crafted/widgets/lists",
          },
          {
            heading: "widgetsStatistics",
            route: "/crafted/widgets/statistics",
          },
          {
            heading: "widgetsCharts",
            route: "/crafted/widgets/charts",
          },
          {
            heading: "widgetsMixed",
            route: "/crafted/widgets/mixed",
          },
          {
            heading: "widgetsTables",
            route: "/crafted/widgets/tables",
          },
          {
            heading: "widgetsFeeds",
            route: "/crafted/widgets/feeds",
          },
        ],
      },
    ],
  },

  {
    guard: "Super Admin",
    heading: "apps",
    route: "/apps",
    pages: [
      {
        sectionTitle: "customers",
        route: "/customers",
        svgIcon: "media/icons/duotune/finance/fin006.svg",
        fontIcon: "bi-printer",
        sub: [
          {
            heading: "gettingStarted",
            route: "/apps/customers/getting-started",
          },
          {
            heading: "customersListing",
            route: "/apps/customers/customers-listing",
          },
          {
            heading: "customerDetails",
            route: "/apps/customers/customer-details",
          },
        ],
      },
      {
        sectionTitle: "subscriptions",
        route: "/subscriptions",
        svgIcon: "media/icons/duotune/ecommerce/ecm002.svg",
        fontIcon: "bi-cart",
        sub: [
          {
            heading: "getStarted",
            route: "/subscriptions/getting-started",
          },
          {
            heading: "subscriptionList",
            route: "/subscriptions/subscription-list",
          },
          {
            heading: "addSubscription",
            route: "/subscriptions/add-subscription",
          },
          {
            heading: "viewSubscription",
            route: "/subscriptions/view-subscription",
          },
        ],
      },
      {
        heading: "calendarApp",
        route: "/apps/calendar",
        svgIcon: "media/icons/duotune/general/gen014.svg",
        fontIcon: "bi-calendar3-event",
      },
      {
        sectionTitle: "chat",
        route: "/chat",
        svgIcon: "media/icons/duotune/communication/com012.svg",
        fontIcon: "bi-chat-left",
        sub: [
          {
            heading: "privateChat",
            route: "/apps/chat/private-chat",
          },
          {
            heading: "groupChat",
            route: "/apps/chat/group-chat",
          },
          {
            heading: "drawerChat",
            route: "/apps/chat/drawer-chat",
          },
        ],
      },
    ],
  },

  {
    guard: "Super Admin",
    heading: "-------",
    route: "/builder",
    pages: [
      {
        heading: "layoutBuilder",
        route: "/builder",
        svgIcon: "media/icons/duotune/general/gen019.svg",
        fontIcon: "bi-layers",
      },
    ],
  },
];

export default DocMenuConfig;
