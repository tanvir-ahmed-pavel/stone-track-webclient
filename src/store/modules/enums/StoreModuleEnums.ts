enum INIT {
  LOOKUP_DATA,
  CUSTOMER,
  SUPPLIER,
  ITEM,
  CRUSHING,
  VEHICLE,
  DRIVER,
  ACCOUNT,
  LC,
  PURCHASE,
  PURCHASE_ORDER,
  SALES,
  SALES_ORDER,
  PO_TRUCK_LOADING,
  SO_DELIVERY,
  SO_INVOICE,
  SO_PAYMENT,
  GENERATOR_LOG,
  OTHER_REPORTS,
  DASHBOARD,
}

// GETTERS

export class GETTERS {

  // Other Reports
  static readonly OTHER_REPORTS = {
    // Bank Statement
    bankStatementReport: INIT.OTHER_REPORTS + "bankStatementReport",

    // Cash Statement
    cashStatementReport: INIT.OTHER_REPORTS + "cashStatementReport",

    // Stock Report
    stockBalanceReport: INIT.OTHER_REPORTS + "stockBalanceReport",

    // Profit and Loss
    ProfitAndLossReport: INIT.OTHER_REPORTS + "ProfitAndLossReport",
  };


  static readonly DASHBOARD = {
    // Main
    mainDashboard: INIT.DASHBOARD + "mainDashboard",

    // LC
    lcDashboard: INIT.DASHBOARD + "lcDashboard",

    soDashboard: INIT.DASHBOARD + "soDashboard",

    poDashboard: INIT.DASHBOARD + "poDashboard",


  };


  static readonly LOOKUP_DATA = {
    lookupData: INIT.LOOKUP_DATA + "lookupData",
    chartOfAccountType: INIT.LOOKUP_DATA + "chartOfAccountType",
    allChartOfAccount: INIT.LOOKUP_DATA + "allChartOfAccount",
    country: INIT.LOOKUP_DATA + "country",
    customerGroup: INIT.LOOKUP_DATA + "customerGroup",
    status: INIT.LOOKUP_DATA + "status",
    itemGroup: INIT.LOOKUP_DATA + "itemGroup",
    supplierGroup: INIT.LOOKUP_DATA + "supplierGroup",
    warehouse: INIT.LOOKUP_DATA + "warehouse",
  };

  static readonly ITEM = {
    itemData: INIT.ITEM + "itemData",
    itemEditData: INIT.ITEM + "itemEditData",
    itemList: INIT.ITEM + "itemList",
    itemTypes: INIT.ITEM + "itemTypes",
  };

  static readonly CRUSHING = {
    crushingStoneCost: INIT.CRUSHING + "crushingStoneCost",
    itemListForCrushing: INIT.CRUSHING + "itemListForCrushing",
    crushingItemList: INIT.CRUSHING + "crushingItemList",
  };

  static readonly ACCOUNT = {
    accountData: INIT.ACCOUNT + "accountData",
    accountEditData: INIT.ACCOUNT + "accountEditData",
    accountList: INIT.ACCOUNT + "accountList",
    fixedAssetAccList: INIT.ACCOUNT + "fixedAssetAccList",
    incomeExpenseList: INIT.ACCOUNT + "incomeExpenseList",
    incomeExpenseDetails: INIT.ACCOUNT + "incomeExpenseDetails",
    account: INIT.ACCOUNT + "account",
    bankAccountList: INIT.ACCOUNT + "bankAccountList",
    balance: INIT.ACCOUNT + "balance",
    openingBalanceList: INIT.ACCOUNT + "openingBalanceList",
    openingBalanceById: INIT.ACCOUNT + "openingBalanceById",
    billTypes: INIT.ACCOUNT + "billTypes",

    // Reports
    accountsPayableDetailsReport: INIT.ACCOUNT + "accountsPayableDetailsReport",
    accountPayableSummaryReport: INIT.ACCOUNT + "accountPayableSummaryReport",

    accountsReceivableDetailsReport: INIT.ACCOUNT + "accountsReceivableDetailsReport",
    accountReceivableSummaryReport: INIT.ACCOUNT + "accountReceivableSummaryReport",
  };

  static readonly VEHICLE = {
    vehicleData: INIT.VEHICLE + "vehicleData",
    vehicleEditData: INIT.VEHICLE + "vehicleEditData",
    vehicleList: INIT.VEHICLE + "vehicleList",
    vehicleTypes: INIT.VEHICLE + "vehicleTypes",
  };

  static readonly DRIVER = {
    driverData: INIT.DRIVER + "driverData",
    driverEditData: INIT.DRIVER + "driverEditData",
    driverList: INIT.DRIVER + "driverList",
    driverTypes: INIT.DRIVER + "driverTypes",
  };

  //CUSTOMER
  static readonly CUSTOMER = {
    customerTypes: INIT.CUSTOMER + "customerTypes",
    customerData: INIT.CUSTOMER + "customerData",
    customerEditData: INIT.CUSTOMER + "customerEditData",
    customerList: INIT.CUSTOMER + "customerList",
    customer: INIT.CUSTOMER + "customer",

    // Dashboard
    customerDashboardData: INIT.CUSTOMER + "customerDashboardData",
  };

  //SUPPLIER
  static readonly SUPPLIER = {
    supplierTypes: INIT.SUPPLIER + "supplierTypes",
    supplierData: INIT.SUPPLIER + "supplierData",
    supplierEditData: INIT.SUPPLIER + "supplierEditData",
    supplierList: INIT.SUPPLIER + "supplierList",
    supplier: INIT.SUPPLIER + "supplier",

    // Dashboard
    supplierDashboardData: INIT.SUPPLIER + "supplierDashboardData",
  };

  //PURCHASE
  static readonly PURCHASE = {
    quantityReceived: INIT.PURCHASE + "quantityReceived",
    poList: INIT.PURCHASE + "poList",
    taxAndPortFeeList: INIT.PURCHASE + "taxAndPortFeeList",
    purchaseReportBySearch: INIT.PURCHASE + "purchaseReportBySearch",
    poDeleted: INIT.PURCHASE + "poDeleted",

    porList: INIT.PURCHASE + "porList",
    poDetailsById: INIT.PURCHASE + "poDetailsById",
    porDetailsById: INIT.PURCHASE + "porDetailsById",

    purchaseFrom: INIT.PURCHASE + "purchaseFrom",

    piList: INIT.PURCHASE + "piList",
    piDetailsById: INIT.PURCHASE + "piDetailsById",

    paymentModes: INIT.PURCHASE + "paymentModes",
    poPaymentStatistics: INIT.PURCHASE + "poPaymentStatistics",
  };

  // LC
  static readonly LC = {
    lcList: INIT.LC + "lcList",
    lcListWithoutPo: INIT.LC + "lcListWithoutPo",
    crushingLcList: INIT.LC + "crushingLcList",
    lc: INIT.LC + "lc",
    itemCrushingCost: INIT.LC + "itemCrushingCost",
  };

  // Purchase Order
  static readonly PURCHASE_ORDER = {
    purchaseOrderList: INIT.PURCHASE_ORDER + "purchaseOrderList",
  };

  // PO Truck Loading
  static readonly PO_TRUCK_LOADING = {
    poTruckLoadingList: INIT.PO_TRUCK_LOADING + "poTruckLoadingList",
    poTruckLoadingQuantity: INIT.PO_TRUCK_LOADING + "poTruckLoadingQuantity",
  };

  //SALES
  static readonly SALES = {
    salesReportBySearch: INIT.SALES + "salesReportBySearch",
  };

  // Sales Order
  static readonly SALES_ORDER = {
    salesOrderList: INIT.SALES_ORDER + "salesOrderList",
    singleSalesOrder: INIT.SALES_ORDER + "singleSalesOrder",
  };

  // SO_DELIVERY
  static readonly SO_DELIVERY = {
    soDeliveryList: INIT.SO_DELIVERY + "soDeliveryList",
    singleSoDelivery: INIT.SO_DELIVERY + "singleSoDelivery",
  };

  // SO_INVOICE
  static readonly SO_INVOICE = {
    soInvoiceList: INIT.SO_INVOICE + "soInvoiceList",
    singleSoInvoice: INIT.SO_INVOICE + "singleSoInvoice",
  };

  // SO_PAYMENTS
  static readonly SO_PAYMENT = {
    soPaymentList: INIT.SO_PAYMENT + "soPaymentList",
    singleSoPayment: INIT.SO_PAYMENT + "singleSoPayment",
  };

  // Generator
  static readonly GENERATOR_LOG = {
    generatorLogList: INIT.GENERATOR_LOG + "generatorLogList",
    generatorReport: INIT.GENERATOR_LOG + "generatorReport",
    singleSoPayment: INIT.SO_PAYMENT + "singleSoPayment",
  };
}

// ACTIONS

export class ACTIONS {

  // Other Reports
  static readonly OTHER_REPORTS = {

    // Bank Statement
    FETCH_BANK_STATEMENT_REPORT:
        INIT.OTHER_REPORTS + "fetchBankStatementReport",

    // Cash Statement
    FETCH_CASH_STATEMENT_REPORT:
        INIT.OTHER_REPORTS + "fetchCashStatementReport",

    // Stock Balance
    FETCH_STOCK_BALANCE_REPORT:
        INIT.OTHER_REPORTS + "fetchStockBalanceReport",

    // Stock Balance
    FETCH_PROFIT_AND_LOSS_REPORT:
        INIT.OTHER_REPORTS + "fetchProfitAndLossReport",
  };

  static readonly LOOKUP_DATA = {
    FETCH_LOOKUP_DATA: INIT.LOOKUP_DATA + "fetchLookData",
  };

  static readonly DASHBOARD = {
    FETCH_MAIN_DASHBOARD: INIT.DASHBOARD + "fetchMainDashboard",

    FETCH_LC_DASHBOARD: INIT.DASHBOARD + "fetchLCDashboard",

    FETCH_SO_DASHBOARD: INIT.DASHBOARD + "fetchSODashboard",

    FETCH_PO_DASHBOARD: INIT.DASHBOARD + "fetchPODashboard",
  };

  static readonly ITEM = {
    FETCH_ITEM_LIST: INIT.ITEM + "fetchItemList",
    CREATE_ITEM: INIT.ITEM + "createItem",
    EDIT_ITEM: INIT.ITEM + "editItem",
    DELETE_ITEM: INIT.ITEM + "deleteItem",
    LOAD_ITEM: INIT.ITEM + "loadItem",
  };

  static readonly CRUSHING = {
    FETCH_ITEMS_LIST_FOR_CRUSHING: INIT.CRUSHING + "fetchItemListForCrushing",
    FETCH_CRUSHING_STONE_COST: INIT.CRUSHING + "fetchCrushingStoneCost",
    FETCH_CRUSHING_ITEM_LIST: INIT.CRUSHING + "fetchCrushingItemList",
    SAVE_CRUSHING_DATA: INIT.CRUSHING + "saveCrushingData",
  };

  static readonly ACCOUNT = {
    FETCH_ACCOUNT_LIST: INIT.ACCOUNT + "fetchAccountList",
    FETCH_FIXED_ASSET_ACCOUNT_LIST: INIT.ACCOUNT + "fetchFixedAssetAccountList",
    EDIT_ACCOUNT: INIT.ACCOUNT + "editAccount",
    DELETE_ACCOUNT: INIT.ACCOUNT + "deleteAccount",
    LOAD_ACCOUNT: INIT.ACCOUNT + "loadAccount",
    FETCH_BALANCE: INIT.ACCOUNT + "fetchBalance",

    FETCH_INCOME_EXPENSES: INIT.ACCOUNT + "fetchIncomeExpenseList",
    FETCH_INCOME_EXPENSE_DETAILS: INIT.ACCOUNT + "fetchIncomeExpenseDetails",
    DELETE_INCOME_EXPENSE: INIT.ACCOUNT + "deleteIncomeExpenseDetails",
    CREATE_INCOME_EXPENSE: INIT.ACCOUNT + "createIncomeExpense",


    FETCH_OPENING_BALANCE_LIST: INIT.ACCOUNT + "fetchOpeningBalanceList",
    FETCH_OPENING_BALANCE_BY_ID: INIT.ACCOUNT + "fetchOpeningBalanceById",
    CREATE_OPENING_BALANCE: INIT.ACCOUNT + "createOpeningBalance",
    DELETE_OPENING_BALANCE: INIT.ACCOUNT + "deleteOpeningBalance",

    FETCH_ACCOUNT: INIT.ACCOUNT + "fetchAccount",
    CLEAR_ACCOUNT: INIT.ACCOUNT + "clearAccount",
    FETCH_BANK_ACCOUNT_LIST: INIT.ACCOUNT + "fetchBankAccountList",
    CREATE_ACCOUNT: INIT.ACCOUNT + "createAccount",

    // Reports
    FETCH_ACCOUNTS_PAYABLE_DETAILS_REPORT:
      INIT.ACCOUNT + "fetchAccountsPayableDetailsReport",
    FETCH_ACCOUNTS_PAYABLE_SUMMARY_REPORT:
      INIT.ACCOUNT + "fetchAccountsPayableSummaryReport",

    FETCH_ACCOUNTS_RECEIVABLE_DETAILS_REPORT:
        INIT.ACCOUNT + "fetchAccountsReceivableDetailsReport",
    FETCH_ACCOUNTS_RECEIVABLE_SUMMARY_REPORT:
        INIT.ACCOUNT + "fetchAccountsReceivableSummaryReport",
  };

  static readonly DRIVER = {
    FETCH_DRIVER_LIST: INIT.DRIVER + "fetchDriverList",
    CREATE_DRIVER: INIT.DRIVER + "createDriver",
    EDIT_DRIVER: INIT.DRIVER + "editDriver",
    DELETE_DRIVER: INIT.DRIVER + "deleteDriver",
    LOAD_DRIVER: INIT.DRIVER + "loadDriver",
  };

  static readonly VEHICLE = {
    FETCH_VEHICLE_LIST: INIT.VEHICLE + "fetchVehicleList",
    CREATE_VEHICLE: INIT.VEHICLE + "createVehicle",
    EDIT_VEHICLE: INIT.VEHICLE + "editVehicle",
    DELETE_VEHICLE: INIT.VEHICLE + "deleteVehicle",
    LOAD_VEHICLE: INIT.VEHICLE + "loadVehicle",
  };

  static readonly CUSTOMER = {
    FETCH_CUSTOMER_LIST: INIT.CUSTOMER + "fetchCustomerList",
    FETCH_CUSTOMER: INIT.CUSTOMER + "fetchCustomer",
    CREATE_CUSTOMER: INIT.CUSTOMER + "createCustomer",
    EDIT_CUSTOMER: INIT.CUSTOMER + "editCustomer",
    DELETE_CUSTOMER: INIT.CUSTOMER + "deleteCustomer",
    LOAD_CUSTOMER: INIT.CUSTOMER + "loadCustomer",

    // Dashboard
    FETCH_CUSTOMER_DASHBOARD_DATA: INIT.CUSTOMER + "fetchCustomerDashboardData",
  };

  static readonly SUPPLIER = {
    FETCH_SUPPLIER_LIST: INIT.SUPPLIER + "fetchSupplierList",
    FETCH_SUPPLIER: INIT.SUPPLIER + "fetchSupplier",
    CREATE_SUPPLIER: INIT.SUPPLIER + "createSupplier",
    EDIT_SUPPLIER: INIT.SUPPLIER + "editSupplier",
    DELETE_SUPPLIER: INIT.SUPPLIER + "deleteSupplier",
    LOAD_SUPPLIER: INIT.SUPPLIER + "loadSupplier",

    // Dashboard
    FETCH_SUPPLIER_DASHBOARD_DATA: INIT.SUPPLIER + "fetchSupplierDashboardData",
  };

  static readonly PURCHASE = {
    FETCH_PO_LIST: INIT.PURCHASE + "fetchPOList",
    FETCH_TAX_AND_PORT_LIST: INIT.PURCHASE + "fetchTaxAndPortList",

    ADD_PO_PAYMENT: INIT.PURCHASE + "addPoPayment",
    FETCH_PO_PAYMENT_STATISTICS: INIT.PURCHASE + "fetchPoPaymentStatistics",
    DELETE_PO_PAYMENT: INIT.PURCHASE + "DeletePoPayment",

    ADD_TAX_AND_PORT: INIT.PURCHASE + "addTaxAndPortList",
    FETCH_PURCHASE_REPORT_BY_SEARCH:
      INIT.PURCHASE + "fetchPurchaseReportBySearch",
    DELETE_PO_ORDER: INIT.PURCHASE + "deletePOOrder",
    DELETE_PO_RECEIVE: INIT.PURCHASE + "deletePOR",
    DELETE_TAX_AND_PORT: INIT.PURCHASE + "deleteTaxAndPort",

    FETCH_POR_LIST_BY_ID: INIT.PURCHASE + "fetchPORListById",
    FETCH_PO_DETAILS_BY_ID: INIT.PURCHASE + "fetchPODetailsById",
    FETCH_POR_DETAILS_BY_ID: INIT.PURCHASE + "fetchPORDetailsById",
    ADD_PURCHASE_ORDER: INIT.PURCHASE + "addPurchaseOrder",
    CREATE_PO_RECEIVE: INIT.PURCHASE + "createPOReceive",

    FETCH_PI_LIST: INIT.PURCHASE + "fetchPIList",
    FETCH_PI_DETAILS_BY_ID: INIT.PURCHASE + "fetchPIDetailsById",
    DELETE_PI: INIT.PURCHASE + "deletePI",


    CREATE_PI_PAYMENT: INIT.PURCHASE + "createPIPayment",
    DELETE_PI_PAYMENT: INIT.PURCHASE + "deletePIPayment",
  };

  // LC
  static readonly LC = {
    FETCH_LC_LIST: INIT.LC + "fetchLcList",
    FETCH_LC_LIST_WITHOUT_PO: INIT.LC + "fetchLcListWithoutPo",
    FETCH_ITEM_CRUSHING_COST: INIT.LC + "fetchItemCrushingCost",
    FETCH_CRUSHING_LC_LIST: INIT.LC + "fetchCrushingLcList",
    FETCH_LC: INIT.LC + "fetchLc",
    CREATE_LC: INIT.LC + "createLc",
    CREATE_ITEM_CRUSHING_COST: INIT.LC + "createItemCrushingCost",
    DELETE_ITEM_CRUSHING_COST: INIT.LC + "deleteItemCrushingCost",
    EDIT_ITEM_CRUSHING_COST: INIT.LC + "editItemCrushingCost",
    EDIT_LC: INIT.LC + "editLc",
    DELETE_LC: INIT.LC + "deleteLc",
  };

  //SALES
  static readonly SALES = {
    FETCH_SALES_REPORT_BY_SEARCH: INIT.SALES + "fetchSalesReportBySearch",
  };

  // SALES ORDER
  static readonly SALES_ORDER = {
    FETCH_SALES_ORDER_LIST: INIT.SALES_ORDER + "fetchSalesOrderList",
    FETCH_SALES_ORDER: INIT.SALES_ORDER + "fetchSalesOrder",
    FETCH_SALES_ORDER_VIEW: INIT.SALES_ORDER + "fetchSalesOrderView",
    CREATE_SALES_ORDER: INIT.SALES_ORDER + "createSalesOrder",
    EDIT_SALES_ORDER: INIT.SALES_ORDER + "editSalesOrder",
    DELETE_SALES_ORDER: INIT.SALES_ORDER + "deleteSalesOrder",
  };

  // PURCHASE ORDER
  static readonly PURCHASE_ORDER = {
    FETCH_PURCHASE_ORDER_LIST: INIT.PURCHASE_ORDER + "fetchPurchaseOrderList",
    CREATE_PURCHASE_ORDER: INIT.PURCHASE_ORDER + "createPurchaseOrder",
    EDIT_PURCHASE_ORDER: INIT.PURCHASE_ORDER + "editPurchaseOrder",
    DELETE_PURCHASE_ORDER: INIT.PURCHASE_ORDER + "deletePurchaseOrder",
  };

  // PO TRUCK LOADING
  static readonly PO_TRUCK_LOADING = {
    FETCH_PO_TRUCK_LOADING_LIST:
      INIT.PO_TRUCK_LOADING + "fetchPoTruckLoadingList",
    CREATE_PO_TRUCK_LOADING: INIT.PO_TRUCK_LOADING + "createPoTruckLoading",
    EDIT_PO_TRUCK_LOADING: INIT.PO_TRUCK_LOADING + "editPoTruckLoading",
    DELETE_PO_TRUCK_LOADING: INIT.PO_TRUCK_LOADING + "deletePoTruckLoading",
  };

  // SO Deliver
  static readonly SO_DELIVERY = {
    FETCH_SO_DELIVERY_LIST: INIT.SO_DELIVERY + "fetchSoDeliveryList",
    FETCH_SO_DELIVERY_LIST_FOR_INVOICE:
      INIT.SO_DELIVERY + "fetchSoDeliveryListForInvoice",
    FETCH_SO_DELIVERY: INIT.SO_DELIVERY + "fetchSoDelivery",
    CREATE_SO_DELIVERY: INIT.SO_DELIVERY + "createSoDelivery",
    EDIT_SO_DELIVERY: INIT.SO_DELIVERY + "editSoDelivery",
    DELETE_SO_DELIVERY: INIT.SO_DELIVERY + "deleteSoDelivery",
  };

  // SO_INVOICE
  static readonly SO_INVOICE = {
    FETCH_SO_INVOICE_LIST: INIT.SO_INVOICE + "fetchSoInvoiceList",
    FETCH_SO_INVOICE: INIT.SO_INVOICE + "fetchSoInvoice",
    CREATE_SO_INVOICE: INIT.SO_INVOICE + "createSoInvoice",
    EDIT_SO_INVOICE: INIT.SO_INVOICE + "editSoInvoice",
    DELETE_SO_INVOICE: INIT.SO_INVOICE + "deleteSoInvoice",
  };

  // SO_PAYMENT
  static readonly SO_PAYMENT = {
    FETCH_SO_PAYMENT_LIST: INIT.SO_PAYMENT + "fetchSoPaymentList",
    FETCH_SO_PAYMENT: INIT.SO_PAYMENT + "fetchSoPayment",
    CREATE_SO_PAYMENT: INIT.SO_PAYMENT + "createSoPayment",
    EDIT_SO_PAYMENT: INIT.SO_PAYMENT + "editSoPayment",
    DELETE_SO_PAYMENT: INIT.SO_PAYMENT + "deleteSoPayment",
  };

  // GENERATOR_LOG
  static readonly GENERATOR_LOG = {
    FETCH_GENERATOR_LOG_LIST: INIT.GENERATOR_LOG + "fetchGeneratorLogList",
    FETCH_GENERATOR_REPORT: INIT.GENERATOR_LOG + "fetchGeneratorReport",
    FETCH_GENERATOR_LOG: INIT.GENERATOR_LOG + "fetchGeneratorLog",
    CREATE_GENERATOR_LOG: INIT.GENERATOR_LOG + "createGeneratorLog",
    EDIT_GENERATOR_LOG: INIT.GENERATOR_LOG + "editGeneratorLog",
    DELETE_GENERATOR_LOG: INIT.GENERATOR_LOG + "deleteGeneratorLog",
  };
}

// MUTATIONS

export class MUTATIONS {

  // Other Reports
  static readonly OTHER_REPORTS = {
    // Bank Statement
    SET_BANK_STATEMENT_REPORT:
        INIT.OTHER_REPORTS + "SET_BANK_STATEMENT_REPORT",

    // Cash Statement
    SET_CASH_STATEMENT_REPORT:
        INIT.OTHER_REPORTS + "SET_CASH_STATEMENT_REPORT",

    // Stock Balance
    SET_STOCK_BALANCE_REPORT:
        INIT.OTHER_REPORTS + "SET_STOCK_BALANCE_REPORT",

    // Stock Balance
    SET_PROFIT_AND_LOSS_REPORT:
        INIT.OTHER_REPORTS + "SET_PROFIT_AND_LOSS_REPORT",
  };

  static readonly DASHBOARD = {
    SET_MAIN_DASHBOARD: INIT.DASHBOARD + "SET_MAIN_DASHBOARD",

    SET_LC_DASHBOARD: INIT.DASHBOARD + "SET_LC_DASHBOARD",

    SET_SO_DASHBOARD: INIT.DASHBOARD + "SET_SO_DASHBOARD",

    SET_PO_DASHBOARD: INIT.DASHBOARD + "SET_PO_DASHBOARD",
  };

  static readonly LOOKUP_DATA = {
    SET_LOOKUP_DATA: INIT.LOOKUP_DATA + "SET_LOOKUP_DATA",
    SET_CHART_OF_ACCOUNT_TYPE: INIT.LOOKUP_DATA + "SET_CHART_OF_ACCOUNT_TYPE",
    SET_ALL_CHART_OF_ACCOUNT: INIT.LOOKUP_DATA + "SET_ALL_CHART_OF_ACCOUNT",
  };

  static readonly ITEM = {
    SET_ITEM_lIST: INIT.ITEM + "SET_ITEM_LIST",
    SET_ITEM: INIT.ITEM + "SET_ITEM",
    LOAD_ITEM: INIT.ITEM + "LOAD_ITEM",
    UPDATE_ITEM: INIT.ITEM + "UPDATE_ITEM",
    DELETE_ITEM: INIT.ITEM + "DELETE_ITEM",
  };

  static readonly CRUSHING = {
    SET_CRUSHING_STONE_COST: INIT.CRUSHING + "SET_CRUSHING_STONE_COST",
    SET_ITEM_lIST_FOR_CRUSHING: INIT.CRUSHING + "SET_ITEM_lIST_FOR_CRUSHING",
    SET_CRUSHING_ITEM_lIST: INIT.CRUSHING + "SET_CRUSHING_ITEM_lIST",
  };

  static readonly ACCOUNT = {
    SET_ACCOUNT_lIST: INIT.ACCOUNT + "SET_ACCOUNT_LIST",
    SET_BALANCE: INIT.ACCOUNT + "SET_BALANCE",
    SET_FIXED_ASSET_ACCOUNT_LIST: INIT.ACCOUNT + "SET_FIXED_ASSET_ACCOUNT_LIST",

    SET_OPENING_BALANCE_LIST: INIT.ACCOUNT + "SET_OPENING_BALANCE_LIST",
    SET_OPENING_BALANCE_BY_ID: INIT.ACCOUNT + "SET_OPENING_BALANCE_BY_ID",
    DELETE_OPENING_BALANCE: INIT.ACCOUNT + "DELETE_OPENING_BALANCE",

    SET_INCOME_EXPENSE_lIST: INIT.ACCOUNT + "SET_INCOME_EXPENSE_lIST",
    SET_INCOME_EXPENSE_DETAILS: INIT.ACCOUNT + "SET_INCOME_EXPENSE_DETAILS",
    DELETE_INCOME_EXPENSE: INIT.ACCOUNT + "DELETE_INCOME_EXPENSE",

    SET_ACCOUNT_EDIT: INIT.ACCOUNT + "SET_ACCOUNT_EDIT",
    CLEAR_ACCOUNT_EDIT: INIT.ACCOUNT + "CLEAR_ACCOUNT_EDIT",
    SET_BANK_ACCOUNT_lIST: INIT.ACCOUNT + "SET_BANK_ACCOUNT_lIST",
    SET_ACCOUNT: INIT.ACCOUNT + "SET_ACCOUNT",
    LOAD_ACCOUNT: INIT.ACCOUNT + "LOAD_ACCOUNT",
    UPDATE_ACCOUNT: INIT.ACCOUNT + "UPDATE_ACCOUNT",
    DELETE_ACCOUNT: INIT.ACCOUNT + "DELETE_ACCOUNT",

    // Reports
    SET_ACCOUNTS_PAYABLE_DETAILS_REPORT:
      INIT.ACCOUNT + "SET_ACCOUNTS_PAYABLE_DETAILS_REPORT",
    SET_ACCOUNTS_PAYABLE_SUMMARY_REPORT:
      INIT.ACCOUNT + "SET_ACCOUNTS_PAYABLE_SUMMARY_REPORT",

    SET_ACCOUNTS_RECEIVABLE_DETAILS_REPORT:
        INIT.ACCOUNT + "SET_ACCOUNTS_RECEIVABLE_DETAILS_REPORT",
    SET_ACCOUNTS_RECEIVABLE_SUMMARY_REPORT:
        INIT.ACCOUNT + "SET_ACCOUNTS_RECEIVABLE_SUMMARY_REPORT",
  };

  static readonly DRIVER = {
    SET_DRIVER_lIST: INIT.DRIVER + "SET_DRIVER_LIST",
    SET_DRIVER: INIT.DRIVER + "SET_DRIVER",
    LOAD_DRIVER: INIT.DRIVER + "LOAD_DRIVER",
    UPDATE_DRIVER: INIT.DRIVER + "UPDATE_DRIVER",
    DELETE_DRIVER: INIT.DRIVER + "DELETE_DRIVER",
  };

  static readonly VEHICLE = {
    SET_VEHICLE_lIST: INIT.VEHICLE + "SET_VEHICLE_LIST",
    SET_VEHICLE: INIT.VEHICLE + "SET_VEHICLE",
    LOAD_VEHICLE: INIT.VEHICLE + "LOAD_VEHICLE",
    UPDATE_VEHICLE: INIT.VEHICLE + "UPDATE_VEHICLE",
    DELETE_VEHICLE: INIT.VEHICLE + "DELETE_VEHICLE",
  };

  static readonly CUSTOMER = {
    SET_CUSTOMER_lIST: INIT.CUSTOMER + "SET_CUSTOMER_LIST",
    SET_CUSTOMER: INIT.CUSTOMER + "SET_CUSTOMER",
    SET_SINGLE_CUSTOMER: INIT.CUSTOMER + "SET_SINGLE_CUSTOMER",
    LOAD_CUSTOMER: INIT.CUSTOMER + "LOAD_CUSTOMER",
    UPDATE_CUSTOMER: INIT.CUSTOMER + "UPDATE_CUSTOMER",
    DELETE_CUSTOMER: INIT.CUSTOMER + "DELETE_CUSTOMER",

    // Dashboard
    SET_CUSTOMER_DASHBOARD_DATA: INIT.CUSTOMER + "SET_CUSTOMER_DASHBOARD_DATA",
  };

  static readonly SUPPLIER = {
    SET_SUPPLIER_lIST: INIT.SUPPLIER + "SET_SUPPLIER_lIST",
    SET_SUPPLIER: INIT.SUPPLIER + "SET_SUPPLIER",
    SET_SINGLE_SUPPLIER: INIT.SUPPLIER + "SET_SINGLE_SUPPLIER",
    LOAD_SUPPLIER: INIT.SUPPLIER + "LOAD_SUPPLIER",
    UPDATE_SUPPLIER: INIT.SUPPLIER + "UPDATE_SUPPLIER",
    DELETE_SUPPLIER: INIT.SUPPLIER + "DELETE_SUPPLIER",

    // Dashboard
    SET_SUPPLIER_DASHBOARD_DATA: INIT.SUPPLIER + "SET_SUPPLIER_DASHBOARD_DATA",
  };

  static readonly PURCHASE = {
    SET_PO_lIST: INIT.PURCHASE + "SET_PO_lIST",
    SET_TAX_AND_PORT_lIST: INIT.PURCHASE + "SET_TAX_AND_PORT_lIST",
    PUSH_TAX_AND_PORT_RESPONSE: INIT.PURCHASE + "PUSH_TAX_AND_PORT_RESPONSE",
    SET_SEARCHED_PURCHASE_REPORT:
      INIT.PURCHASE + "SET_SEARCHED_PURCHASE_REPORT",
    SET_POR_lIST: INIT.PURCHASE + "SET_POR_lIST",
    SET_PO_DETAILS: INIT.PURCHASE + "SET_PO_DETAILS",

    SET_POR_DETAILS: INIT.PURCHASE + "SET_POR_DETAILS",
    SET_PO_DELETE_RESULT: INIT.PURCHASE + "SET_PO_DELETE_RESULT",
    SET_PO_RECEIVE_DELETE: INIT.PURCHASE + "SET_PO_RECEIVE_DELETE",
    TAX_AND_PORT_DELETE: INIT.PURCHASE + "TAX_AND_PORT_DELETE",

    SET_PI_lIST: INIT.PURCHASE + "SET_PI_lIST",
    SET_PI_DETAILS: INIT.PURCHASE + "SET_PI_DETAILS",
    DELETE_PI: INIT.PURCHASE + "DELETE_PI",

    DELETE_PI_PAYMENT: INIT.PURCHASE + "DELETE_PI_PAYMENT",
    SET_PO_PAYMENT_STATISTICS: INIT.PURCHASE + "SET_PO_PAYMENT_STATISTICS",
    DELTE_PO_PAYMENT: INIT.PURCHASE + "DELTE_PO_PAYMENT",
  };

  // LC
  static readonly LC = {
    SET_LC_LIST: INIT.LC + "SET_LC_lIST",
    SET_LC_LIST_WITHOUT_PO: INIT.LC + "SET_LC_lIST_WITHOUT_PO",
    SET_CRUSHING_LC_lIST: INIT.LC + "SET_CRUSHING_LC_lIST",
    SET_ITEM_CRUSHING_COST: INIT.LC + "SET_ITEM_CRUSHING_COST",
    SET_LC: INIT.LC + "SET_LC",
    SET_SINGLE_LC: INIT.LC + "SET_SINGLE_LC",
    UPDATE_LC: INIT.LC + "UPDATE_LC",
    DELETE_LC: INIT.LC + "DELETE_LC",
  };

  // PURCHASE ORDER
  static readonly PURCHASE_ORDER = {
    SET_PURCHASE_ORDER_lIST: INIT.PURCHASE_ORDER + "SET_PURCHASE_ORDER_lIST",
    SET_PURCHASE_ORDER: INIT.PURCHASE_ORDER + "SET_PURCHASE_ORDER",
    UPDATE_PURCHASE_ORDER: INIT.PURCHASE_ORDER + "UPDATE_PURCHASE_ORDER",
    DELETE_PURCHASE_ORDER: INIT.PURCHASE_ORDER + "DELETE_PURCHASE_ORDER",
  };

  // PO TRUCK
  static readonly PO_TRUCK_LOADING = {
    SET_PO_TRUCK_LOADING_lIST:
      INIT.PO_TRUCK_LOADING + "SET_PO_TRUCK_LOADING_lIST",
    SET_PO_TRUCK_LOADING_QTY:
      INIT.PO_TRUCK_LOADING + "SET_PO_TRUCK_LOADING_QTY",
    SET_PO_TRUCK_LOADING: INIT.PO_TRUCK_LOADING + "SET_PO_TRUCK_LOADING",
    UPDATE_PO_TRUCK_LOADING: INIT.PO_TRUCK_LOADING + "UPDATE_PO_TRUCK_LOADING",
    DELETE_PO_TRUCK_LOADING: INIT.PO_TRUCK_LOADING + "DELETE_PO_TRUCK_LOADING",
  };

  //SALES
  static readonly SALES = {
    SET_SEARCHED_SALES_REPORT: INIT.SALES + "SET_SEARCHED_SALES_REPORT",
  };

  // SALES ORDER
  static readonly SALES_ORDER = {
    SET_SALES_ORDER_lIST: INIT.SALES_ORDER + "SET_SALES_ORDER_lIST",
    SET_SINGLE_SALES_ORDER: INIT.SALES_ORDER + "SET_SINGLE_SALES_ORDER",
    SET_SALES_ORDER: INIT.SALES_ORDER + "SET_SALES_ORDER",
    UPDATE_SALES_ORDER: INIT.SALES_ORDER + "UPDATE_SALES_ORDER",
    DELETE_SALES_ORDER: INIT.SALES_ORDER + "DELETE_SALES_ORDER",
    SET_SALES_ORDER_QTY: INIT.SALES_ORDER + "SET_SALES_ORDER_QTY",
  };

  // SO_DELIVERY
  static readonly SO_DELIVERY = {
    SET_SO_DELIVERY_lIST: INIT.SO_DELIVERY + "SET_SO_DELIVERY_lIST",
    SET_SINGLE_SO_DELIVERY: INIT.SO_DELIVERY + "SET_SINGLE_SO_DELIVERY",
    SET_SO_DELIVERY: INIT.SO_DELIVERY + "SET_SO_DELIVERY",
    UPDATE_SO_DELIVERY: INIT.SO_DELIVERY + "UPDATE_SO_DELIVERY",
    DELETE_SO_DELIVERY: INIT.SO_DELIVERY + "DELETE_SO_DELIVERY",
    SET_SO_DELIVERY_QTY: INIT.SO_DELIVERY + "SET_SO_DELIVERY_QTY",
  };

  // SO_INVOICE
  static readonly SO_INVOICE = {
    SET_SO_INVOICE_lIST: INIT.SO_INVOICE + "SET_SO_INVOICE_lIST",
    SET_SINGLE_SO_INVOICE: INIT.SO_INVOICE + "SET_SINGLE_SO_INVOICE",
    SET_SO_INVOICE: INIT.SO_INVOICE + "SET_SO_INVOICE",
    UPDATE_SO_INVOICE: INIT.SO_INVOICE + "UPDATE_SO_INVOICE",
    DELETE_SO_INVOICE: INIT.SO_INVOICE + "DELETE_SO_INVOICE",
  };

  // SO_PAYMENT
  static readonly SO_PAYMENT = {
    SET_SO_PAYMENT_lIST: INIT.SO_PAYMENT + "SET_SO_PAYMENT_lIST",
    SET_SINGLE_SO_PAYMENT: INIT.SO_PAYMENT + "SET_SINGLE_SO_PAYMENT",
    SET_SO_PAYMENT: INIT.SO_PAYMENT + "SET_SO_PAYMENT",
    UPDATE_SO_PAYMENT: INIT.SO_PAYMENT + "UPDATE_SO_PAYMENT",
    DELETE_SO_PAYMENT: INIT.SO_PAYMENT + "DELETE_SO_PAYMENT",
  };

  // GENERATOR_LOG
  static readonly GENERATOR_LOG = {
    SET_GENERATOR_LOG_lIST: INIT.GENERATOR_LOG + "SET_GENERATOR_LOG_lIST",
    SET_GENERATOR_REPORT: INIT.GENERATOR_LOG + "SET_GENERATOR_REPORT",
    SET_SINGLE_GENERATOR_LOG: INIT.GENERATOR_LOG + "SET_SINGLE_GENERATOR_LOG",
    SET_GENERATOR_LOG: INIT.GENERATOR_LOG + "SET_GENERATOR_LOG",
    UPDATE_GENERATOR_LOG: INIT.GENERATOR_LOG + "UPDATE_GENERATOR_LOG",
    DELETE_GENERATOR_LOG: INIT.GENERATOR_LOG + "DELETE_GENERATOR_LOG",
  };
}
