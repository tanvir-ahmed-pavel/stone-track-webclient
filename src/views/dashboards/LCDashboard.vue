<template>
  <template v-if="!loading">
    <TitleAndButtons title="LC Details">
      <!--    Buttons-->
      <template v-slot:buttons>
        <!--          Go Back-->
        <button
          type="button"
          class="btn btn-sm btn-flex btn-danger me-3"
          @click.prevent="this.$router.back()"
          :disabled="loading"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr054.svg" />
          </span>
          Go Back
        </button>
      </template>
    </TitleAndButtons>

    <!--  LC Details-->

    <!--begin::Row-->
    <div class="row g-5 g-xl-8">
      <!--begin::Col-->
      <div class="col-xl">
        <SummaryCardLc
          :lc="lcDashboard.lcDetails[0]"
          widget-classes="card-xl-stretch mb-xl-8"
          chart-color="primary"
          chart-height="80"
        >
        </SummaryCardLc>
      </div>
      <!--end::Col-->
    </div>
    <!--end::Row-->

    <!--  Loading remaining, Delivery Remaining-->

    <div class="row g-5 g-xl-8">
      <div class="col-xl-3">
        <StatisticCard2
          widget-classes="card-xl-stretch mb-xl-8"
          svg-icon="media/icons/duotune/general/gen032.svg"
          color="white"
          icon-color="primary"
          :title="lcDashboard.lcDetails[0].total_amount_bdt + ' ৳'"
          description="Total Amount"
        ></StatisticCard2>
      </div>

      <div class="col-xl-3">
        <StatisticCard2
          class="shadow"
          widget-classes="card-xl-stretch mb-xl-8"
          svg-icon="media/icons/duotune/general/gen032.svg"
          color="primary"
          icon-color="white"
          :title="lcDashboard.lcDetails[0].total_tax_port_fee + ' ৳'"
          description="Total Tax + Total Port"
        ></StatisticCard2>
      </div>

      <div class="col-xl-3">
        <StatisticCard2
          class="shadow"
          widget-classes="card-xl-stretch mb-xl-8"
          svg-icon="media/icons/duotune/general/gen032.svg"
          color="info"
          icon-color="white"
          :title="lcDashboard.lcDetails[0].c_and_f_total_amount_bdt + ' ৳'"
          description="C & F"
        ></StatisticCard2>
      </div>

      <div class="col-xl-3">
        <StatisticCard2
          class="shadow"
          widget-classes="card-xl-stretch mb-xl-8"
          svg-icon="media/icons/duotune/general/gen032.svg"
          color="danger"
          icon-color="white"
          :title="lcDashboard.lcDetails[0].total_order_quantity"
          description="Total Quantity"
        ></StatisticCard2>
      </div>
    </div>

    <!--begin::Row-->
    <div class="row g-5 g-xl-8">
      <!--begin::Col-->
      <div class="col-md-12 col-lg-6">
        <SummaryCardPercentage
          :items="bankBalance"
          :chartData1="lcDashboard.bankBalanceChartArray[0]"
          :chartData2="lcDashboard.bankBalanceChartArray[1]"
          widget-classes="card-xl-stretch mb-xl-8"
          chart-color="primary"
          chart-height="80"
        >
          <template v-slot:title> Bank Balance </template>
        </SummaryCardPercentage>
      </div>

      <div class="col-md-12 col-lg-6">
        <SummaryCardPercentage
          :items="underBalance"
          :chartData1="lcDashboard.underBalanceChartArray[0]"
          :chartData2="lcDashboard.underBalanceChartArray[1]"
          widget-classes="card-xl-stretch mb-xl-8"
          chart-color="primary"
          chart-height="80"
        >
          <template v-slot:title> Under Balance </template>
        </SummaryCardPercentage>
      </div>
      <!--end::Col-->
    </div>
    <!--end::Row-->

    <!--  Tax and Port and Truck -->
    <!--begin::Row-->
    <div class="row g-5 g-xl-8">
      <!--begin::Col-->
      <div class="col-lg-6">
        <SummaryListCard
          :titles="taxTopPart"
          :table="taxData.data"
          :heading="taxData.head"
          widget-classes="card-xl-stretch mb-xl-8"
          widget-color="info"
        >
          <template v-slot:card-title>Tax Payment Details</template>
        </SummaryListCard>
      </div>
      <!--end::Col-->

      <!--begin::Col-->
      <div class="col-lg-6">
        <SummaryListCard
          :titles="portTopPart"
          :table="portData.data"
          :heading="portData.head"
          widget-classes="card-xl-stretch mb-xl-8"
          widget-color="primary"
        >
          <template v-slot:card-title>Port Payment Details</template>
        </SummaryListCard>
      </div>
      <!--end::Col-->

      <!--end::Col-->
    </div>

    <div
      v-if="lcDashboard.truckLoadingDetails.length>0 ||Object.keys(lcDashboard.truckLoadingDetails).length != 0"
      class="row g-5 g-xl-8"
    >
      <!--begin::Col-->
      <div class="col-lg-12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span class="card-label fw-bolder fs-1 mb-1"
                >Truck Loading Details</span
              >
            </div>
            <table class="table table-sm align-middle">
              <tbody>
                <tr>
                  <!--      Total Quantity-->
                  <td>
                    <StatisticsCard
                      widget-classes=""
                      color="danger"
                      :title="`${truckLoadingTopPart.total_order_quantity} MTon`"
                      description="Total Quantity"
                    />
                  </td>

                  <!--Total Loaded-->
                  <td>
                    <StatisticsCard
                      widget-classes=""
                      color="primary"
                      :progress="`${(
                        (100 * truckLoadingTopPart.total_loading_qty) /
                        truckLoadingTopPart.total_order_quantity
                      ).toFixed(2)}%`"
                      :title="`${truckLoadingTopPart.total_loading_qty} MTon`"
                      description="Total Loading"
                    />
                  </td>

                  <!--Loading Remaining-->
                  <td>
                    <StatisticsCard
                      widget-classes=""
                      color="primary"
                      :progress="`${(
                        (100 * truckLoadingTopPart.loading_remain_qty) /
                        truckLoadingTopPart.total_order_quantity
                      ).toFixed(2)}%`"
                      :title="`${truckLoadingTopPart.loading_remain_qty} MTon`"
                      description="Loading Remaining"
                    />
                  </td>

                  <!--Total Received-->
                  <td>
                    <StatisticsCard
                      widget-classes=""
                      color="success"
                      :progress="`${(
                        (100 * truckLoadingTopPart.total_receive_qty) /
                        truckLoadingTopPart.total_order_quantity
                      ).toFixed(2)}%`"
                      :title="`${truckLoadingTopPart.total_receive_qty} MTon`"
                      description="Total Received"
                    />
                  </td>

                  <!--Total Remaining-->
                  <td>
                    <StatisticsCard
                      widget-classes=""
                      color="success"
                      :progress="`${(
                        (100 * truckLoadingTopPart.receive_remain_qty) /
                        truckLoadingTopPart.total_order_quantity
                      ).toFixed(2)}%`"
                      :title="`${truckLoadingTopPart.receive_remain_qty} MTon`"
                      description="Total Remaining"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
          <!--                Table Begin-->
          <el-table
            v-loading="loading"
            ref="multipleTable"
            :data="truckLoadingData"
            style="width: 100%"
          >
            <!--Purchase Order-->
            <el-table-column property="po_id" label="PO ID" width="100" />

            <!--        Truck No.-->
            <el-table-column
              property="truck_no"
              label="Truck No."
              align="left"
              width="100"
            />

            <!--        Loading Date-->
            <el-table-column
              property="loading_date"
              label="Loading Date"
              align="center"
            />

            <!--        Loading Quantity-->
            <el-table-column
              property="loading_quantity"
              label="Loading Quantity"
              align="center"
            />

            <!--        Receive Date-->
            <el-table-column label="Receive Date" align="center">
              <template #default="scope">
                {{ scope.row.receive_date ? scope.row.receive_date : "-" }}
              </template>
            </el-table-column>

            <!--        Receive Quantity-->
            <el-table-column label="Receive Quantity" align="center">
              <template #default="scope">
                {{
                  scope.row.receive_quantity ? scope.row.receive_quantity : "-"
                }}
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <!--end::Col-->
    </div>
    <!--end::Row-->
  </template>
  <template v-else>
    <cus-loading></cus-loading>
  </template>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from "vue";
import SummaryListCard from "@/views/reuseable/mainDashboard/SummaryListCard.vue";
import SummaryCardLc from "@/views/reuseable/lcDashboard/SummaryCardLc.vue";
import StatisticCard2 from "@/views/reuseable/StatisticCard2.vue";
import StatisticsCard from "@/views/reuseable/StatisticsCard.vue";
import SummaryCardPercentage from "@/views/reuseable/lcDashboard/SummaryCardPercentage.vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import { ACTIONS, GETTERS } from "../../store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "../../assets/ts/components";
import { setCurrentPageBreadcrumbs } from "../../core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import store from "../../store";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "lc-dashboard",
  components: {
    SummaryCardLc,
    SummaryCardPercentage,
    StatisticCard2,
    StatisticsCard,
    TitleAndButtons,
    SummaryListCard,
  },
  setup() {
    onMounted(() => {
      setCurrentPageTitle("Lc Dashboard");
      setCurrentPageBreadcrumbs("LC Details", []);
      MenuComponent.reinitialization();
    });
    const route = useRoute();
    const loading = ref(false);
    const taxData = ref([]);
    const taxTopPart = ref([]);
    const portData = ref([]);
    const portTopPart = ref([]);
    const bankBalance = ref([]);
    const underBalance = ref([]);
    const truckLoadingTopPart = ref({});
    const truckLoadingData = ref([]);

    async function fetchAPI() {
      loading.value = true;
      await store.dispatch(
        ACTIONS.DASHBOARD.FETCH_LC_DASHBOARD,
        route.params.lc_id
      );
      await setVal();
      loading.value = false;
    }

    fetchAPI();

    const lcDashboard = computed(() => {
      return store.getters[GETTERS.DASHBOARD.lcDashboard];
    });

    async function setVal() {
      taxData.value = {
        head: ["Date", "Quantity", "Amount"],
        data: await lcDashboard.value.taxDetails.taxDetials,
      };

      taxTopPart.value = [
        {
          name: "Total Quantity",
          value: await lcDashboard.value.taxDetails.total_qty,
        },
        {
          name: "Total Paid",
          value: (await lcDashboard.value.taxDetails.total_paid_amount) + " ৳",
        },
      ];

      portData.value = {
        head: ["Date", "Quantity", "Amount"],
        data: await lcDashboard.value.portFeeDetails.taxDetials,
      };

      portTopPart.value = [
        {
          name: "Total Quantity",
          value: await lcDashboard.value.portFeeDetails.total_qty,
        },
        {
          name: "Total Paid",
          value:
            (await lcDashboard.value.portFeeDetails.total_paid_amount) + " ৳",
        },
      ];

      bankBalance.value = [
        {
          title: "LC Open Rate",
          value: "$ " + (await lcDashboard.value.lcDetails[0].lc_open_rate_usd),
        },
        {
          title: "Bank Total",
          value:
            (await lcDashboard.value.lcDetails[0].bank_total_amount_bdt) +
            " ৳",
        },
        {
          title: "Due Total",
          value:
            (await lcDashboard.value.lcDetails[0].bank_total_balance_amount_bdt) + " ৳",
        },
        {
          title: "Conversion Rate",
          value:
            (await lcDashboard.value.lcDetails[0].lc_conversion_rate_bank || "-") + " ৳",
        },
        {
          title: "Open 10%",
          value:
            (await lcDashboard.value.lcDetails[0].open_10_percent_amount_bdt) +
            " ৳",
        },
        {
          title: "NOC 50%",
          value:
            (await lcDashboard.value.lcDetails[0].noc_50_percent_amount_bdt) +
            " ৳",
        },
      ];

      underBalance.value = [
        {
          title: "Under Rate",
          value:
            "$ " + (await lcDashboard.value.lcDetails[0].lc_under_rate_usd),
        },
        {
          title: "Under Total",
          value:
            (await lcDashboard.value.lcDetails[0].under_total_amount_bdt) +
            " ৳",
        },
        {
          title: "Due Total",
          value:
            (await lcDashboard.value.lcDetails[0].under_total_balance_amount_bdt) +
            " ৳",
        },
        {
          title: "Conversion Rate",
          value:
                  (await lcDashboard.value.lcDetails[0].lc_conversion_rate) + " ৳",
        },
        {
          title: "1st Under",
          value:
            (await lcDashboard.value.lcDetails[0].first_under_amount) + " ৳",
        },
        {
          title: "2nd Under",
          value:
            (await lcDashboard.value.lcDetails[0].second_under_amount) + " ৳",
        },
      ];

      if (await lcDashboard.value.truckLoadingDetails.length>0 ||Object.keys(lcDashboard.value.truckLoadingDetails).length != 0) {
        truckLoadingTopPart.value = {
          loading_remain_qty: await lcDashboard.value.truckLoadingDetails
            .truck_loading_summary[0].loading_remain_qty,

          receive_remain_qty: await lcDashboard.value.truckLoadingDetails
            .truck_loading_summary[0].receive_remain_qty,

          total_loading_qty: await lcDashboard.value.truckLoadingDetails
            .truck_loading_summary[0].total_loading_qty,

          total_order_quantity: await lcDashboard.value.truckLoadingDetails
            .truck_loading_summary[0].total_order_quantity,

          total_receive_qty: await lcDashboard.value.truckLoadingDetails
            .truck_loading_summary[0].total_receive_qty,
        };

        truckLoadingData.value = await await lcDashboard.value
          .truckLoadingDetails.truck_loading_data;
      }
    }

    return {
      loading,
      lcDashboard,

      bankBalance,
      underBalance,

      taxTopPart,
      taxData,

      portTopPart,
      portData,

      truckLoadingTopPart,
      truckLoadingData,
    };
  },
});
</script>
