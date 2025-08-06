<template>
  <template v-if="!loading">
    <!--begin::Row-->
    <div class="row g-5 g-xl-8">
      <!--    Balance-->
      <div class="col-xl">
        <StatisticCard2
          widget-classes="card-xl-stretch mb-xl-8"
          svg-icon="media/icons/duotune/general/gen032.svg"
          color="white"
          icon-color="primary"
          :title="
            mainDashboard.dashboard_summary.cash_receivable_payable[
              'Cash In Hand'
            ] + '৳'
          "
          description="Available Cash Balance"
        ></StatisticCard2>
      </div>

      <!--    Receivable-->
      <div class="col-xl">
        <StatisticCard2
          widget-classes="card-xl-stretch mb-xl-8"
          svg-icon="media/icons/duotune/general/gen032.svg"
          color="primary"
          icon-color="white"
          :title="
            mainDashboard.dashboard_summary.cash_receivable_payable[
              'Accounts Receivable'
            ] + '৳'
          "
          description="Total Receivable Amount"
        ></StatisticCard2>
      </div>

      <!--    Payable-->
      <div class="col-xl">
        <StatisticCard2
          widget-classes="card-xl-stretch mb-xl-8"
          svg-icon="media/icons/duotune/general/gen032.svg"
          color="danger"
          icon-color="white"
          :title="
            mainDashboard.dashboard_summary.cash_receivable_payable[
              'Accounts Payable'
            ] + '৳'
          "
          description="Total Payable Amount"
        ></StatisticCard2>
      </div>
    </div>
    <!--end::Row-->

    <!--  AT a Glance-->
    <div v-if="false" class="row g-5 g-xl-8">
      <!--begin::Col-->
      <div class="col-xl">
        <SummaryCardMain
          widget-classes="card-xl-stretch mb-xl-8"
          chart-color="primary"
        >
          <template v-slot:title> At a glance </template>
        </SummaryCardMain>
      </div>
      <!--end::Col-->
    </div>

    <!--  Last 7 day and quick reports-->
    <!--begin::Row-->
    <div v-if="false" class="row g-5 g-xl-8">
      <!--    Daily Sales-->
      <div class="col-xl-8">
        <BarCharts widget-classes="card-xl-stretch mb-xl-8"></BarCharts>
      </div>

      <!--    Charges-->
      <div class="col-xl-4">
        <ListWidget
          :charges="charges"
          widget-classes="card-xl-stretch mb-5 mb-xl-8"
        >
          <template v-slot:card-title>Quick Reports</template>
        </ListWidget>
      </div>
    </div>
    <!--end::Col-->

    <!--  cash in && out && Stock Balance-->
    <!--begin::Row-->
    <div class="row g-5 g-xl-8">
      <!--      Calender-->
      <div class="col-xl-8">
        <div class="card-xl-stretch mb-5 mb-xl-8 card ">
          <!--begin::Body-->
          <div class="card-body p-0">
            <!--begin::Header-->
            <div :class="`bg-white`" class="px-9 pt-7 card-rounded w-100">
            </div>

            <div
              class="shadow-mod bg-light card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 scroll-mod"
            >
              <div class="d-flex align-items-center">
                <el-calendar :value="new Date()" class="bg-light" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--    Stock Balance-->
      <div class="col-xl-4">
        <SummaryListCard
          :titles="stockTopPart"
          :table="stockData.data"
          :heading="stockData.head"
          widget-classes="card-xl-stretch mb-xl-8"
          widget-color="info"
        >
          <template v-slot:card-title>Stock Balance</template>
        </SummaryListCard>
      </div>

      <!--    Cash In-->
      <div class="col-xl-6">
        <SummaryListCard
          :titles="cashInTopPart"
          :table="cashInData.data"
          :heading="cashInData.head"
          widget-classes="card-xl-stretch mb-xl-8"
          widget-color="success"
        >
          <template v-slot:card-title>Today's All (C/I) Transaction</template>
        </SummaryListCard>
      </div>

      <!--    Cash Out-->
      <div class="col-xl-6">
        <SummaryListCard
          :titles="cashOutTopPart"
          :table="cashOutData.data"
          :heading="cashOutData.head"
          widget-classes="card-xl-stretch mb-xl-8"
          widget-color="danger"
        >
          <template v-slot:card-title>Today's All (C/O) Transaction</template>
        </SummaryListCard>
      </div>
    </div>

    <!--  Last 10 Sales and Purchase-->
    <!--begin::Row-->
    <div class="row g-5 g-xl-8">
      <!--    Sales-->
      <div class="col-xl-6">
        <SummaryListCard
          :table="LastTenSales.data"
          :heading="LastTenSales.head"
          widget-classes="card-xl-stretch mb-xl-8"
          widget-color="info"
        >
          <template v-slot:card-title>Last 10 Sales Order</template>
        </SummaryListCard>
      </div>

      <!--    Purchase-->
      <div class="col-xl-6">
        <SummaryListCard
          :table="LastTenPurchase.data"
          :heading="LastTenPurchase.head"
          widget-classes="card-xl-stretch mb-xl-8"
          widget-color="primary"
        >
          <template v-slot:card-title>Last 10 Purchase Order</template>
        </SummaryListCard>
      </div>
    </div>
  </template>

  <template v-else>
    <cus-loading></cus-loading>
  </template>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from "vue";
import SummaryListCard from "@/views/reuseable/mainDashboard/SummaryListCard.vue";
import StatisticCard2 from "@/views/reuseable/StatisticCard2.vue";
import SummaryCardMain from "@/views/reuseable/mainDashboard/SummaryCardMain.vue";
import ListWidget from "@/views/reuseable/ListWidget.vue";
import BarCharts from "@/views/reuseable/BarCharts.vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import store from "@/store";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";

export default defineComponent({
  name: "main-dashboard",
  components: {
    SummaryListCard,
    StatisticCard2,
    SummaryCardMain,
    ListWidget,
    BarCharts,
  },

  setup() {
    onMounted(() => {
      setCurrentPageTitle("Dashboard");
    });
    const loading = ref(false);

    const cashInData = ref([]);
    const cashInTopPart = ref([]);
    const cashOutData = ref([]);
    const cashOutTopPart = ref([]);
    const stockData = ref([]);
    const stockTopPart = ref([]);
    const LastTenSales = ref([]);
    const charges = ref([]);
    const saleTopPart = ref([]);
    const LastTenPurchase = ref([]);
    const salesData = ref([]);

    async function fetchAPI() {
      loading.value = true;
      await store.dispatch(ACTIONS.DASHBOARD.FETCH_MAIN_DASHBOARD);
      await setValue();
      loading.value = false;
    }

    fetchAPI();


    const mainDashboard = computed(() => {
      return store.getters[GETTERS.DASHBOARD.mainDashboard];
    });

    async function setValue() {
      cashInTopPart.value = [
        {
          name: "Cash In: Today's Total",
          value: mainDashboard.value.cash_in_details.total_cash_in_amount + " ৳",
        },
      ];

      cashInData.value = {
        head: ["Date", "C/I For", "C/I From", "PMT Type", "Amount"],
        data: mainDashboard.value.cash_in_details.cash_in_data,
      };

      cashOutData.value = {
        head: ["Date", "C/O For", "C/O From", "PMT Type", "Amount"],
        data: mainDashboard.value.cash_out_details.cash_out_data,
      };

      cashOutTopPart.value = [
        {
          name: "Cash Out: Today's Total",
          value:
                  mainDashboard.value.cash_out_details.total_cash_out_amount + " ৳",
        },
      ];

      stockData.value = {
        head: ["Item Name", "Available QTY."],
        data: mainDashboard.value.stockBalanceDetails.stock_balance_data,
      };

      stockTopPart.value = [
        {
          name: "In Stock: Total",
          value: mainDashboard.value.stockBalanceDetails.total_qty,
        },
      ];

      salesData.value = {
        head: ["Items", "Sale Amount"],
        data: [
          ["Item 1", "20,000 ৳"],
          ["Item 3", "11,000 ৳"],
          ["Item 66", "19,000 ৳"],
          ["Bhutan Boulder", "33,000 ৳"],
          ["Boulder 66mm", "55,000 ৳"],
        ],
      };

      saleTopPart.value = [
        {
          name: "Today's Sale: Total",
          value: "91,500 ৳",
        },
      ];

      charges.value = [
        {
          color: "warning",
          title: "Diesel For WL",
          number: "126 Litter",
        },
        {
          color: "success",
          title: "Diesel For Gen",
          number: "195 Litter",
        },
        {
          color: "danger",
          title: "Scale Charge",
          number: "27,500 ৳",
        },
        {
          color: "info",
          title: "Truck Level Charge",
          number: "33,300 ৳",
        },
        {
          color: "warning",
          title: "Diesel For WL",
          number: "126 Litter",
        },
        {
          color: "success",
          title: "Diesel For Gen",
          number: "195 Litter",
        },
        {
          color: "danger",
          title: "Scale Charge",
          number: "27,500 ৳",
        },
        {
          color: "info",
          title: "Truck Level Charge",
          number: "33,300 ৳",
        },
      ];

      LastTenSales.value = {
        head: [
          "Date",
          "Project Title",
          "SO Number",
          "Customer Name",
          "Total Qty",
          "Total Amount",
        ],
        data: mainDashboard.value.last_ten_sales_order,
      };

      LastTenPurchase.value = {
        head: [
          "Date",
          "LC NO",
          "PO Number",
          "Supplier Name",
          "Total Qty",
          "Total Amount",
        ],
        data: mainDashboard.value.last_ten_purchase_order,
      };
    }


    return {
      loading,
      mainDashboard,

      cashInData,
      cashInTopPart,

      cashOutData,
      cashOutTopPart,

      stockData,
      stockTopPart,

      charges,
      saleTopPart,
      salesData,

      LastTenSales,
      LastTenPurchase,
    };
  },
});
</script>
<style>
.shadow-mod {
  box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25);
  -moz-box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25);
}

.el-calendar-table .el-calendar-day {
  height: 63px !important;
}
.el-calendar-table td.is-selected{
  background-color: #7ae07a;
}

.el-calendar-table td.is-selected.is-today{
  color: #ffffff;
}


.el-calendar-table .el-calendar-day:hover {
  background-color: rgba(122, 224, 122, 0.40);
}

</style>
