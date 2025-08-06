<template>
  <template v-if="!loading">
    <TitleAndButtons
      :title="`Delivered Item List (${
        itemDeliveryList.length > 0
          ? itemDeliveryList[0].so_details.so_number
          : ''
      })`"
    >
      <!--    Buttons-->
      <template v-slot:buttons>
        <a
          @click.prevent="itemDelivery(this.$route.params.so_id)"
        >
          <button type="button" class="btn btn-sm btn-flex btn-primary">
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr013.svg" />
            </span>
            New Item Delivery
          </button>
        </a>
      </template>
    </TitleAndButtons>

    <div class="card">
      <div class="card-header border-0 pt-6">
        <!--begin::Card toolbar-->
        <div class="card-toolbar">
          <!--begin::Toolbar-->
          <div
            class="d-flex justify-content-end"
            data-kt-so-table-toolbar="base"
          ></div>
        </div>
        <!--end::Card toolbar-->
      </div>
      <div class="card-body pt-0">
        <el-table
          ref="multipleTable"
          :data="itemDeliveryList"
          style="width: 100%"
        >
          <el-table-column type="index" label="SL." width="55" />

          <el-table-column
            label="SO Delivery Number"
            property="so_delivery_number"
          />

          <el-table-column label="SO Number" property="so_details.so_number" />

          <el-table-column label="Delivery Date" property="delivery_date" />

          <el-table-column
            label="Total Delivery Quantity"
            property="total_delivered_qty"
          >
            <template #default="scope">
              {{ scope.row.total_delivered_qty.toLocaleString(undefined) }}
            </template>
          </el-table-column>

          <el-table-column
            label="Receivable Total"
            property="deliver_receivable_total"
          >
            <template #default="scope">
              {{ scope.row.deliver_receivable_total.toLocaleString(undefined) }}
            </template>
          </el-table-column>

          <!--        Edit & Delete-->
          <el-table-column label="Action">
            <template #default="scope">
              <el-col :span="8">
                <el-dropdown>
                  <el-button size="small" type="primary">
                    Action List
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>
                        <router-link
                          :to="`/sales-order/${this.$route.params.so_id}/so-delivery/${scope.row.id}`"
                        >
                          View Details
                        </router-link>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <button
                          class="btn btn-link text-danger"
                          @click.prevent="deleteRow(scope.row)"
                        >
                          Delete Delivery
                        </button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-col>
            </template>
          </el-table-column>
        </el-table>
        <!--      Pagination-->
        <div class="row">
          <div class="col-12 my-4 pt-3" style="text-align: right">
            <el-pagination
              background
              :page-sizes="[10, 20, 50, 100]"
              :page-size="perPage"
              layout="sizes, prev, pager, next"
              :total="this.itemDeliveryList.length"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <cus-loading></cus-loading>
  </template>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";

export default defineComponent({
  name: "DeliveredItemList",
  components: { TitleAndButtons },
  setup() {
    return {};
  },

  data() {
    return {
      perPage: 10,
      currentPage: 1,
      loading: false,
    };
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Delivered Item List", [
      "Selling",
      "Sales Order",
    ]);
    this.loading = true;
    await this.fetchSoDeliveryList(this.$route.params.so_id);
    this.loading = false;
  },

  computed: {
    ...mapGetters({
      itemDeliveryList: GETTERS.SO_DELIVERY.soDeliveryList,
    }),
    // Pagination
    paginatedData() {
      return this["itemDeliveryList"].slice(
        this["perPage"] * this["currentPage"] - this["perPage"],
        this["perPage"] * this["currentPage"]
      );
    },
  },

  methods: {
    ...mapActions({
      fetchSoDeliveryList: ACTIONS.SO_DELIVERY.FETCH_SO_DELIVERY_LIST,
      deleteSoDelivery: ACTIONS.SO_DELIVERY.DELETE_SO_DELIVERY,
      fetchSalesOrder: ACTIONS.SALES_ORDER.FETCH_SALES_ORDER,
    }),

    async itemDelivery(id) {
      await this.fetchSalesOrder(id);
      this.$router.push({ path: `/sales-order/${id}/so-delivery/create` });
    },

    // Pagination
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.perPage = val;
    },
    // End Pagination

    // editSO(row) {
    //   this.loadCustomer(row);
    // },

    async deleteRow(row) {
      Swal.fire({
        title: "Deleting SO Delivery: \n" + row.so_delivery_number,
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          const index = this.itemDeliveryList.findIndex(
            (el) => el.id === row.id
          );
          if (index > -1) {
            const data = { index: index, id: row.id };
            this.deleteSoDelivery(data)
              .then((response) => {
                if (response.data.message == "success") {
                  Swal.fire({
                    title: "SO Delivery Deleted Successfully!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                  });
                } else {
                  Swal.fire({
                    text: response.data.message_details
                      ? response.data.message_details
                      : "Error: Couldn't Delete",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                  });
                }
              })
              .catch((e) => {
                Swal.fire({
                  icon: "error",
                  title: "Error: Something went wrong",
                  type: "warning",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Ok",
                });
              });
          }
        }
      });
    },
  },
});
</script>
