<template>
  <template v-if="!loading">
    <TitleAndButtons :title="`Supplier Details`">
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

    <!--  Supplier Details-->
    <div class="card mb-xl-8 shadow-mod">
      <!--begin::Card body-->
      <div class="card-body px-9 py-10">
        <!--begin::Row-->
        <div class="row">
          <div class="col-6">
            <!--          Name-->
            <div class="row mb-5">
              <!--begin::Label-->
              <label class="col-lg-4 fs-4 fw-bold text-muted">Name</label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <span
                  :class="`fs-4 ${
                    dashboardData.supplierDetails[0].supplier_name
                      ? 'text-dark'
                      : 'text-muted'
                  }`"
                  >{{
                    dashboardData.supplierDetails[0].supplier_name
                      ? dashboardData.supplierDetails[0].supplier_name
                      : "N/A"
                  }}</span
                >
              </div>
              <!--end::Col-->
            </div>

            <!--          Mobile-->
            <div class="row mb-5">
              <!--begin::Label-->
              <label class="col-lg-4 fs-4 fw-bold text-muted">Phone</label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <span
                  :class="`fs-4 ${
                    dashboardData.supplierDetails[0].supp_primary_mobile_no
                      ? 'text-dark'
                      : 'text-muted'
                  }`"
                  >{{
                    dashboardData.supplierDetails[0].supp_primary_mobile_no
                      ? dashboardData.supplierDetails[0].supp_primary_mobile_no
                      : "N/A"
                  }}</span
                >
              </div>
              <!--end::Col-->
            </div>

            <!--          Email-->
            <div class="row mb-5">
              <!--begin::Label-->
              <label class="col-lg-4 fs-4 fw-bold text-muted">Email</label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <span
                  :class="`fs-4 ${
                    dashboardData.supplierDetails[0].supp_primary_email
                      ? 'text-dark'
                      : 'text-muted'
                  }`"
                  >{{
                    dashboardData.supplierDetails[0].supp_primary_email
                      ? dashboardData.supplierDetails[0].supp_primary_email
                      : "N/A"
                  }}</span
                >
              </div>
              <!--end::Col-->
            </div>

            <!--          Type-->
            <div class="row mb-5">
              <!--begin::Label-->
              <label class="col-lg-4 fs-4 fw-bold text-muted"
                >Supplier Type</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <span
                  :class="`fs-4 ${
                    dashboardData.supplierDetails[0].supplier_type
                      ? 'text-dark'
                      : 'text-muted'
                  }`"
                  >{{
                    dashboardData.supplierDetails[0].supplier_type
                      ? dashboardData.supplierDetails[0].supplier_type
                      : "N/A"
                  }}</span
                >
              </div>
              <!--end::Col-->
            </div>

            <!--          Group-->
            <div class="row">
              <!--begin::Label-->
              <label class="col-lg-4 fs-4 fw-bold text-muted"
                >Supplier Group</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <span
                  :class="`fs-4 ${
                    dashboardData.supplierDetails[0].supplier_group
                      ? 'text-dark'
                      : 'text-muted'
                  }`"
                  >{{
                    dashboardData.supplierDetails[0].supplier_group
                      ? dashboardData.supplierDetails[0].supplier_group
                      : "N/A"
                  }}</span
                >
              </div>
              <!--end::Col-->
            </div>
          </div>

          <div class="col-6">
            <!--          Address-->
            <div class="row mb-5">
              <!--begin::Label-->
              <label class="col-lg-4 fs-4 fw-bold text-muted">Address</label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <span
                  :class="`fs-4 ${
                    dashboardData.supplierDetails[0].supp_primary_address
                      ? 'text-dark'
                      : 'text-muted'
                  }`"
                  >{{
                    dashboardData.supplierDetails[0].supp_primary_address
                      ? dashboardData.supplierDetails[0].supp_primary_address
                      : "N/A"
                  }}</span
                >
              </div>
              <!--end::Col-->
            </div>

            <!--          City-->
            <div class="row mb-5">
              <!--begin::Label-->
              <label class="col-lg-4 fs-4 fw-bold text-muted">City</label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <span
                  :class="`fs-4 ${
                    dashboardData.supplierDetails[0].supp_primary_city
                      ? 'text-dark'
                      : 'text-muted'
                  }`"
                  >{{
                    dashboardData.supplierDetails[0].supp_primary_city
                      ? dashboardData.supplierDetails[0].supp_primary_city
                      : "N/A"
                  }}</span
                >
              </div>
              <!--end::Col-->
            </div>

            <!--          State/Province -->
            <div class="row mb-5">
              <!--begin::Label-->
              <label class="col-lg-4 fs-4 fw-bold text-muted"
                >State/Province
              </label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <span
                  :class="`fs-4 ${
                    dashboardData.supplierDetails[0].supp_primary_state
                      ? 'text-dark'
                      : 'text-muted'
                  }`"
                  >{{
                    dashboardData.supplierDetails[0].supp_primary_state
                      ? dashboardData.supplierDetails[0].supp_primary_state
                      : "N/A"
                  }}</span
                >
              </div>
              <!--end::Col-->
            </div>

            <!--          Postal Code-->
            <div class="row mb-5">
              <!--begin::Label-->
              <label class="col-lg-4 fs-4 fw-bold text-muted"
                >Postal Code</label
              >
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <span
                  :class="`fs-4 ${
                    dashboardData.supplierDetails[0].supp_primary_zip_code
                      ? 'text-dark'
                      : 'text-muted'
                  }`"
                  >{{
                    dashboardData.supplierDetails[0].supp_primary_zip_code
                      ? dashboardData.supplierDetails[0].supp_primary_zip_code
                      : "N/A"
                  }}</span
                >
              </div>
              <!--end::Col-->
            </div>

            <!--          Country-->
            <div class="row">
              <!--begin::Label-->
              <label class="col-lg-4 fs-4 fw-bold text-muted">Country</label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <span
                  :class="`fs-4 ${
                    dashboardData.supplierDetails[0].supp_primary_country
                      ? 'text-dark'
                      : 'text-muted'
                  }`"
                  >{{
                    dashboardData.supplierDetails[0].supp_primary_country
                      ? dashboardData.supplierDetails[0].supp_primary_country
                      : "N/A"
                  }}</span
                >
              </div>
              <!--end::Col-->
            </div>
          </div>
        </div>

        <!--end::Row-->
      </div>
      <!--end::Card body-->
    </div>

    <!--begin::Row-->
    <div class="row g-5 g-xl-8">
      <!--    Balance-->
      <div class="col-xl">
        <StatisticCard2
          widget-classes="card-xl-stretch mb-xl-8"
          svg-icon="media/icons/duotune/general/gen032.svg"
          color="info"
          icon-color="white"
          :title="dashboardData.totalPo.toString()"
          description="Total LC/PO"
        ></StatisticCard2>
      </div>

      <div class="col-xl">
        <StatisticCard2
          widget-classes="card-xl-stretch mb-xl-8"
          svg-icon="media/icons/duotune/general/gen032.svg"
          color="white"
          icon-color="primary"
          :title="
            dashboardData.supplierDetails[0].supp_opening_balance.toString() +
            ' ৳'
          "
          description="Opening Balance"
        ></StatisticCard2>
      </div>

      <div class="col-xl">
        <StatisticCard2
          widget-classes="card-xl-stretch mb-xl-8"
          svg-icon="media/icons/duotune/general/gen032.svg"
          color="primary"
          icon-color="white"
          :title="
            dashboardData.supplierDetails[0].supp_current_balance.toString() +
            ' ৳'
          "
          description="Total Payable Amount"
        ></StatisticCard2>
      </div>

      <div class="col-xl">
        <StatisticCard2
          widget-classes="card-xl-stretch mb-xl-8"
          svg-icon="media/icons/duotune/general/gen032.svg"
          color="danger"
          icon-color="white"
          :title="dashboardData.totalRemainingReceiveQty.toString()"
          description="Total Receivable QTY."
        ></StatisticCard2>
      </div>
    </div>
    <!--end::Row-->

    <!--  cash in && out-->
    <!--begin::Row-->
    <div class="row g-5 g-xl-8">
      <!--    Cash In-->
      <div class="col-xl-12">
        <SummaryListCard
          :table="dashboardData.projectDetails"
          :heading="heading"
          route-prefix="/po-details/"
          widget-classes="card-xl-stretch mb-xl-8"
          widget-color="success"
        >
          <template v-slot:card-title>LC/PO List</template>
        </SummaryListCard>
      </div>
    </div>
    <!--end::Col-->
  </template>

  <template v-else>
    <cus-loading></cus-loading>
  </template>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import SummaryListCard from "@/views/reuseable/mainDashboard/SummaryListCard.vue";
import StatisticCard2 from "@/views/reuseable/StatisticCard2.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import { MenuComponent } from "@/assets/ts/components";

export default defineComponent({
  name: "supplier-dashboard",
  components: {
    SummaryListCard,
    StatisticCard2,
    TitleAndButtons,
  },
  setup() {
    onMounted(() => {
      MenuComponent.reinitialization();
      setCurrentPageBreadcrumbs("Supplier Details", [
        "Getting Started",
        "Supplier",
      ]);
    });

    const heading = [
      "LC No",
      "PO No",
      "Order Date",
      "Required Date",
      "Order Qty",
      "Due Qty",
      "Total Amount",
      "Due Amount",
      "Status",
      "Action",
    ];

    return {
      heading,
    };
  },
  data() {
    return {
      loading: false,
    };
  },
  async created() {
    this.loading = true;
    await this.fetchDashboardData(this.$route.params.supplier_id);
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchDashboardData: ACTIONS.SUPPLIER.FETCH_SUPPLIER_DASHBOARD_DATA,
    }),
  },

  computed: {
    ...mapGetters({
      dashboardData: GETTERS.SUPPLIER.supplierDashboardData,
    }),
  },
});
</script>
<style scoped>
.shadow-mod {
  box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25) !important;
  -webkit-box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25) !important;
  -moz-box-shadow: 1px 10px 7px -5px rgba(0, 0, 0, 0.25) !important;
}
</style>
