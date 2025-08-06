<template>
  <template v-if="!loading">
    <TitleAndButtons title="PO Dashboard">
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
          :items="poDetails"
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
          :title="poDashboard.poDetails[0].payable_total.toLocaleString() + ' ৳'"
          description="Total Amount"
        ></StatisticCard2>
      </div>

      <div class="col-xl-3">
        <StatisticCard2
          widget-classes="card-xl-stretch mb-xl-8"
          svg-icon="media/icons/duotune/general/gen032.svg"
          color="success"
          icon-color="white"
          :title="poDashboard.poDetails[0].total_paid_amount.toLocaleString() + ' ৳'"
          description="Total Paid Amount"
        ></StatisticCard2>
      </div>

      <div class="col-xl-3">
        <StatisticCard2
          class="shadow"
          widget-classes="card-xl-stretch mb-xl-8"
          svg-icon="media/icons/duotune/general/gen032.svg"
          color="danger"
          icon-color="white"
          :title="poDashboard.poDetails[0].total_order_quantity.toLocaleString()"
          description="Total Quantity"
        ></StatisticCard2>
      </div>

      <div class="col-xl-3">
        <StatisticCard2
          class="shadow"
          widget-classes="card-xl-stretch mb-xl-8"
          svg-icon="media/icons/duotune/general/gen032.svg"
          color="info"
          icon-color="white"
          :title="poDashboard.poDetails[0].total_receive_qty.toLocaleString()"
          description="Total Received QTY"
        ></StatisticCard2>
      </div>
    </div>

    <!--begin::Row-->
    <div class="row g-5 g-xl-8">
      <!--begin::Col-->
      <div class="col-md-12 col-lg-6">
        <SummaryCardPercentage
          :items="poAmount"
          :labels="['Paid Total', 'Due Total']"
          :chartData1="poDashboard.amountDetailsChartArray[0]"
          :chartData2="poDashboard.amountDetailsChartArray[1]"
          widget-classes="card-xl-stretch mb-xl-8"
          chart-color="primary"
          chart-height="80"
        >
          <template v-slot:title> Amount </template>
        </SummaryCardPercentage>
      </div>

      <div class="col-md-12 col-lg-6">
        <SummaryCardPercentage
          :items="poQuantity"
          :labels="['Received QTY', 'Remaining QTY']"
          :chartData1="poDashboard.quantityDetailsChartArray[0]"
          :chartData2="poDashboard.quantityDetailsChartArray[1]"
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
          :table="poReceive.data"
          :heading="poReceive.head"
          :keys="poReceive.key"
          widget-classes="card-xl-stretch mb-xl-8"
          widget-color="info"
        >
          <template v-slot:card-title>Purchase Receive List</template>
        </SummaryListCard>
      </div>
      <!--end::Col-->

      <!--begin::Col-->
      <div class="col-lg-6" v-if="false">
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
  name: "PODashboard",
  components: {
    SummaryCard,
    SummaryCardPercentage,
    StatisticCard2,
    TitleAndButtons,
    SummaryListCard,
  },
  setup() {
    onMounted(() => {
      setCurrentPageTitle("PO Dashboard");
      setCurrentPageBreadcrumbs("PO Dashboard", []);
      MenuComponent.reinitialization();
    });
    const route = useRoute();
    const loading = ref(false);
    const poDetails = ref([]);
    const poAmount = ref([]);
    const poQuantity = ref([]);
    const poReceive = ref([]);
    const soInvoice = ref([]);

    async function fetchAPI() {
      loading.value = true;
      await store.dispatch(
        ACTIONS.DASHBOARD.FETCH_PO_DASHBOARD,
        route.params.po_id
      );
      await setVal();
      loading.value = false;
    }

    fetchAPI();

    const poDashboard = computed(() => {
      return store.getters[GETTERS.DASHBOARD.poDashboard];
    });

    async function setVal() {
      poDetails.value = [
        {
          iconColor: "primary",
          value: poDashboard.value.poDetails[0].purchase_from,
          title: "Purchase Type",
        },
        {
          iconColor: "info",
          value: poDashboard.value.poDetails[0].po_number,
          title: "Purchase Order Number",
        },
        {
          iconColor: "success",
          value: poDashboard.value.poDetails[0].order_date,
          title: "Purchase Order Date",
        },
        {
          iconColor: "success",
          value: poDashboard.value.poDetails[0].supplier_name,
          title: "Supplier",
        },
      ];

      poAmount.value = [
        {
          title: "Total Amount",
          value: (await poDashboard.value.poDetails[0].payable_total) + " ৳",
        },
        {
          title: "Paid Amount",
          value:
            (await poDashboard.value.poDetails[0].total_paid_amount) + " ৳",
        },
        {
          title: "Outstanding Amount",
          value:
            (await poDashboard.value.poDetails[0].outstanding_amount) + " ৳",
        },
      ];

      poQuantity.value = [
        {
          title: "Total Quantity",
          value:
            (await poDashboard.value.poDetails[0].total_order_quantity) +
            " ৳",
        },
        {
          title: "Total Received",
          value:
            (await poDashboard.value.poDetails[0].total_receive_qty) + " ৳",
        },
        {
          title: "Receivable Qty",
          value:
            (await poDashboard.value.poDetails[0].receive_remain_qty) +
            " ৳",
        },
      ];

      poReceive.value = {
        head: [
          "Receipt Date",
          "Receipt Number",
          "Total Received QTY",
          "Total Amount",
          "Truck Vara Rate",
          "Total Truck Vara",
        ],
        key: [
          "receipt_date",
          "po_receipt_number",
          "total_receipt_quantity",
          "receipt_payable_total",
          "truck_vara_rate",
          "total_truck_vara_amount",
        ],
        data: poDashboard.value.purchaseReceiptList,
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
        data: poDashboard.value.salesInvoiceList,
      };
    }

    return {
      loading,
      poDashboard,

      poDetails,

      poReceive,
      soInvoice,

      poAmount,
      poQuantity,
    };
  },
});
</script>
