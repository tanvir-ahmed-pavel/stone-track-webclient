<template>
  <template v-if="!loading">
    <TitleAndButtons title="SO Dashboard">
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
    <div class="row g-5 g-xl-8 mb-7">
      <!--begin::Col-->
      <div class="col-xl">
        <SummaryCard
          :items="soDetails"
          widget-classes="card-xl-stretch mb-xl-8"
          chart-color="primary"
          chart-height="80"
        >
        </SummaryCard>
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
          :title="
            soDashboard.soDetails[0].receivable_total.toLocaleString() + ' ৳'
          "
          description="Total Amount"
        ></StatisticCard2>
      </div>

      <div class="col-xl-3">
        <StatisticCard2
          widget-classes="card-xl-stretch mb-xl-8"
          svg-icon="media/icons/duotune/general/gen032.svg"
          color="success"
          icon-color="white"
          :title="
            soDashboard.soDetails[0].total_received_amount.toLocaleString() +
            ' ৳'
          "
          description="Total Received Amount"
        ></StatisticCard2>
      </div>

      <div class="col-xl-3">
        <StatisticCard2
          class="shadow"
          widget-classes="card-xl-stretch mb-xl-8"
          svg-icon="media/icons/duotune/general/gen032.svg"
          color="danger"
          icon-color="white"
          :title="
            soDashboard.soDetails[0].so_total_order_quantity.toLocaleString()
          "
          description="Total Order Quantity"
        ></StatisticCard2>
      </div>

      <div class="col-xl-3">
        <StatisticCard2
          class="shadow"
          widget-classes="card-xl-stretch mb-xl-8"
          svg-icon="media/icons/duotune/general/gen032.svg"
          color="info"
          icon-color="white"
          :title="soDashboard.soDetails[0].total_delivered_qty.toLocaleString()"
          description="Total Delivered QTY"
        ></StatisticCard2>
      </div>
    </div>

    <!--begin::Row-->
    <div class="row g-5 g-xl-8">
      <!--begin::Col-->
      <div class="col-md-12 col-lg-6">
        <SummaryCardPercentage
          :items="soAmount"
          :labels="['Received Amount', 'Outstanding Amount']"
          :chartData1="soDashboard.amountDetailsChartArray[0]"
          :chartData2="soDashboard.amountDetailsChartArray[1]"
          widget-classes="card-xl-stretch mb-xl-8"
          chart-color="primary"
          chart-height="80"
        >
          <template v-slot:title> Amount </template>
        </SummaryCardPercentage>
      </div>

      <div class="col-md-12 col-lg-6">
        <SummaryCardPercentage
          :items="soQuantity"
          :labels="['Delivered Total', 'Remaining Delivery']"
          :chartData1="soDashboard.quantityDetailsChartArray[0]"
          :chartData2="soDashboard.quantityDetailsChartArray[1]"
          widget-classes="card-xl-stretch mb-xl-8"
          chart-color="primary"
          chart-height="80"
        >
          <template v-slot:title> Quantity </template>
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
          :table="soDelivery.data"
          :heading="soDelivery.head"
          :keys="soDelivery.key"
          widget-classes="card-xl-stretch mb-xl-8"
          widget-color="info"
        >
          <template v-slot:card-title>Sales Delivery List</template>
        </SummaryListCard>
      </div>
      <!--end::Col-->

      <!--begin::Col-->
      <div class="col-lg-6">
        <SummaryListCard
          :table="soInvoice.data"
          :heading="soInvoice.head"
          :keys="soInvoice.key"
          widget-classes="card-xl-stretch mb-xl-8"
          widget-color="primary"
        >
          <template v-slot:card-title>Sales Invoice List</template>
        </SummaryListCard>
      </div>
      <!--end::Col-->

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
import SummaryCard from "@/views/reuseable/SummaryCard.vue";
import StatisticCard2 from "@/views/reuseable/StatisticCard2.vue";
import SummaryCardPercentage from "@/views/reuseable/lcDashboard/SummaryCardPercentage.vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import { ACTIONS, GETTERS } from "../../store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "../../assets/ts/components";
import { setCurrentPageBreadcrumbs } from "../../core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import store from "../../store";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "SODashboard",
  components: {
    SummaryCard,
    SummaryCardPercentage,
    StatisticCard2,
    TitleAndButtons,
    SummaryListCard,
  },
  setup() {
    onMounted(() => {
      setCurrentPageTitle("SO Dashboard");
      setCurrentPageBreadcrumbs("SO Dashboard", []);
      MenuComponent.reinitialization();
    });
    const route = useRoute();
    const loading = ref(false);
    const soDetails = ref([]);
    const soAmount = ref([]);
    const soQuantity = ref([]);
    const soDelivery = ref([]);
    const soInvoice = ref([]);

    async function fetchAPI() {
      loading.value = true;
      await store.dispatch(
        ACTIONS.DASHBOARD.FETCH_SO_DASHBOARD,
        route.params.so_id
      );
      await setVal();
      loading.value = false;
    }

    fetchAPI();

    const soDashboard = computed(() => {
      return store.getters[GETTERS.DASHBOARD.soDashboard];
    });

    async function setVal() {
      soDetails.value = [
        {
          iconColor: "primary",
          value: soDashboard.value.soDetails[0].project_title,
          title: "Project Name",
        },
        {
          iconColor: "primary",
          value: soDashboard.value.soDetails[0].project_location,
          title: "Project Location",
        },
        {
          iconColor: "info",
          value: soDashboard.value.soDetails[0].so_number,
          title: "Sales Order Number",
        },
        {
          iconColor: "success",
          value: soDashboard.value.soDetails[0].so_order_date,
          title: "Sales Order Date",
        },
        {
          iconColor: "success",
          value: soDashboard.value.soDetails[0].customer_name,
          title: "Customer",
        },
      ];

      soAmount.value = [
        {
          title: "Total Amount",
          value: (await soDashboard.value.soDetails[0].receivable_total) + " ৳",
        },
        {
          title: "Received Amount",
          value:
            (await soDashboard.value.soDetails[0].total_received_amount) + " ৳",
        },
        {
          title: "Outstanding Amount",
          value:
            (await soDashboard.value.soDetails[0].outstanding_amount) + " ৳",
        },
      ];

      soQuantity.value = [
        {
          title: "Total Quantity",
          value:
            (await soDashboard.value.soDetails[0].so_total_order_quantity) +
            " ৳",
        },
        {
          title: "Total Delivered",
          value:
            (await soDashboard.value.soDetails[0].total_delivered_qty) + " ৳",
        },
        {
          title: "Remaining Delivery",
          value:
            (await soDashboard.value.soDetails[0].remaining_delivery_qty) +
            " ৳",
        },
      ];

      soDelivery.value = {
        head: [
          "Delivery Date",
          "Delivery Number",
          "Total Delivered",
          "Total Amount",
          "Truck Vara Rate",
          "Total Truck Vara",
        ],
        key: [
          "delivery_date",
          "so_delivery_number",
          "total_delivered_qty",
          "deliver_receivable_total",
          "truck_vara_rate",
          "total_truck_vara_amount",
        ],
        data: soDashboard.value.salesDeliveryList,
      };

      soInvoice.value = {
        head: [
          "Invoice Date",
          "Invoice Number",
          "Total QTY",
          "Total Amount",
          "Outstanding Amount",
          "Status",
        ],
        key: [
          "invoice_date",
          "so_invoice_number",
          "si_total_invoice_quantity",
          "si_receivable_total",
          "si_outstanding_amount",
          "si_invoice_status",
        ],
        data: soDashboard.value.salesInvoiceList,
      };
    }

    return {
      loading,
      soDashboard,

      soDetails,

      soDelivery,
      soInvoice,

      soAmount,
      soQuantity,
    };
  },
});
</script>
