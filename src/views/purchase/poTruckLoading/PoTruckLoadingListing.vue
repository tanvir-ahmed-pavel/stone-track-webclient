<template>
  <TitleAndButtons title="Truck Loading">
    <!--    Buttons-->
    <template v-slot:buttons>
      <!--          Go Back-->
      <button
        @click.prevent="this.$router.back()"
        type="button"
        class="btn btn-sm btn-flex btn-danger me-3"
      >
        <span class="svg-icon svg-icon-2">
          <inline-svg src="media/icons/duotune/arrows/arr054.svg" />
        </span>
        Go Back
      </button>
      <!--        ADD-->
      <button
        type="button"
        class="btn btn-sm btn-flex btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modal_add_po_truck_loading"
      >
        <span class="svg-icon svg-icon-2">
          <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
        </span>
        Add Truck Loading
      </button>
    </template>
  </TitleAndButtons>

  <!--  List And Card-->
  <el-card class="box-card">
    <template #header>
      <table class="table table-sm align-middle">
        <tbody>
          <tr>
            <!--      Total Quantity-->
            <td>
              <StatisticsCard
                widget-classes=""
                color="danger"
                progress="100%"
                :title="`${poTruckLoadingQuantity[0].total_order_quantity} MTon`"
                description="Total Quantity"
              />
            </td>

            <!--Total Loaded-->
            <td>
              <StatisticsCard
                widget-classes=""
                color="primary"
                :progress="`${(
                  (100 * poTruckLoadingQuantity[0].total_loading_qty) /
                  poTruckLoadingQuantity[0].total_order_quantity
                ).toFixed(2)}%`"
                :title="`${poTruckLoadingQuantity[0].total_loading_qty} MTon`"
                description="Total Loading"
              />
            </td>

            <!--Loading Remaining-->
            <td>
              <StatisticsCard
                widget-classes=""
                color="primary"
                :progress="`${(
                  (100 * poTruckLoadingQuantity[0].loading_remain_qty) /
                  poTruckLoadingQuantity[0].total_order_quantity
                ).toFixed(2)}%`"
                :title="`${poTruckLoadingQuantity[0].loading_remain_qty} MTon`"
                description="Loading Remaining"
              />
            </td>

            <!--Total Received-->
            <td>
              <StatisticsCard
                widget-classes=""
                color="success"
                :progress="`${(
                  (100 * poTruckLoadingQuantity[0].total_receive_qty) /
                  poTruckLoadingQuantity[0].total_order_quantity
                ).toFixed(2)}%`"
                :title="`${poTruckLoadingQuantity[0].total_receive_qty} MTon`"
                description="Total Received"
              />
            </td>

            <!--Total Remaining-->
            <td>
              <StatisticsCard
                widget-classes=""
                color="success"
                :progress="`${(
                  (100 * poTruckLoadingQuantity[0].receive_remain_qty) /
                  poTruckLoadingQuantity[0].total_order_quantity
                ).toFixed(2)}%`"
                :title="`${poTruckLoadingQuantity[0].receive_remain_qty} MTon`"
                description="Total Remaining"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <!--      Table Begin-->
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="poTruckLoadingList"
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
          {{ scope.row.receive_quantity ? scope.row.receive_quantity : "-" }}
        </template>
      </el-table-column>

      <!--        Edit & Delete-->
      <el-table-column label="Actions">
        <template #default="scope">
          <el-button
            size="mini"
            type="primary"
            data-bs-toggle="modal"
            data-bs-target="#modal_update_po_truck_loading"
            @click.prevent="editData = scope.row"
            >Receive Loading</el-button
          >

          <el-button
            size="mini"
            type="danger"
            @click.prevent="lcDelete(scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <AddPoTruckLoading></AddPoTruckLoading>
  <UpdatePoTruckLoading :data="editData"></UpdatePoTruckLoading>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddPoTruckLoading from "@/views/purchase/poTruckLoading/truckLoadingModal/AddPoTruckLoadingModal.vue";
import UpdatePoTruckLoading from "@/views/purchase/poTruckLoading/truckLoadingModal/UpdatePoTruckLoadingModal.vue";
import StatisticsCard from "@/views/reuseable/StatisticsCard.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";

export default defineComponent({
  name: "po-truck-loading-listing",
  components: {
    TitleAndButtons,
    AddPoTruckLoading,
    UpdatePoTruckLoading,
    StatisticsCard,
  },
  setup() {
    return {};
  },
  data() {
    return {
      editData: {},
      loading: false,
      transparent: true,
    };
  },

  computed: {
    ...mapGetters({
      poTruckLoadingList: GETTERS.PO_TRUCK_LOADING.poTruckLoadingList,
      poTruckLoadingQuantity: GETTERS.PO_TRUCK_LOADING.poTruckLoadingQuantity,
    }),
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Truck Loading List", ["Buying"]);

    this.loading = true;
    await this.fetchPoTruckLoadingList(this.$route.params.po_id).then(() => {
      this.loading = false;
    });
  },

  methods: {
    ...mapActions({
      fetchPoTruckLoadingList:
        ACTIONS.PO_TRUCK_LOADING.FETCH_PO_TRUCK_LOADING_LIST,
      deletePoTruckLoading: ACTIONS.PO_TRUCK_LOADING.DELETE_PO_TRUCK_LOADING,
    }),

    lcDelete(row) {
      Swal.fire({
        title: "Deleting PO Truck Loading",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          this.deletePoTruckLoading(row)
            .then(() => {
              Swal.fire({
                title: "PO Truck Loading Deleted Successfully!",
                type: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
              });
            })
            .catch(() => {
              Swal.fire({
                text: "Sorry, looks like there are some errors detected, please try again.",
                icon: "error",
                buttonsStyling: false,
                confirmButtonText: "Ok, got it!",
                customClass: {
                  confirmButton: "btn btn-primary",
                },
              });
            });
        }
      });
    },
  },
});
</script>
