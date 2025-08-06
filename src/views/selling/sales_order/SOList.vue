<template>
  <template v-if="!loading">
    <TitleAndButtons title="Sales Order List">
      <!--    Buttons-->
      <template v-slot:buttons>
        <router-link to="/sales-order/create">
          <button type="button" class="btn btn-sm btn-flex btn-primary">
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr013.svg" />
            </span>
            New Sales Order
          </button>
        </router-link>
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
        <el-table ref="multipleTable" :data="soList" style="width: 100%">
          <el-table-column type="index" label="SL." width="55" />

          <el-table-column label="SO Number" property="so_number" />

          <el-table-column label="Order Date" property="so_order_date" />

          <el-table-column label="Project Title" property="project_title" />

          <el-table-column label="Receivable Total" property="receivable_total">
            <template #default="scope">
              {{ scope.row.receivable_total.toLocaleString(undefined) }}
            </template>
          </el-table-column>

          <el-table-column
            label="Outstanding Amount"
            property="outstanding_amount"
          >
            <template #default="scope">
              {{ scope.row.outstanding_amount.toLocaleString(undefined) }}
            </template>
          </el-table-column>

          <el-table-column label="Status" property="so_status" />

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
                        <a
                          class="btn btn-link"
                          @click.prevent="
                            this.$router.push(
                              '/sales-order/dashboard/' + scope.row.id
                            )
                          "
                        >
                          Dashboard
                        </a>
                      </el-dropdown-item>

                      <el-dropdown-item>
                        <a
                          class="btn btn-link"
                          @click.prevent="viewDetails(scope.row.id)"
                        >
                          View Details
                        </a>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <a
                          class="btn btn-link"
                          @click.prevent="itemDelivery(scope.row.id)"
                        >
                          Item Delivery
                        </a>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <router-link
                          :to="'/sales-order/' + scope.row.id + '/so-delivery'"
                        >
                          Delivered Item List
                        </router-link>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <router-link
                          :to="
                            '/sales-order/' +
                            scope.row.id +
                            '/so-invoice/create'
                          "
                        >
                          Create Invoice
                        </router-link>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <router-link :to="`/so-invoice`">
                          So Invoice List
                        </router-link>
                      </el-dropdown-item>

                      <el-dropdown-item>
                        <button
                          class="btn btn-link text-danger"
                          @click.prevent="deleteItem(scope.row)"
                        >
                          Delete SO
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
              :total="this.soList.length"
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
import { defineComponent } from "vue";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "so-list",
  components: { TitleAndButtons },

  data() {
    return {
      perPage: 10,
      currentPage: 1,
      loading: false,
    };
  },

  computed: {
    ...mapGetters({
      soList: GETTERS.SALES_ORDER.salesOrderList,
    }),
    // Pagination
    paginatedData() {
      return this["soList"].slice(
        this["perPage"] * this["currentPage"] - this["perPage"],
        this["perPage"] * this["currentPage"]
      );
    },
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Sales Order List", ["Selling"]);
    this.loading = true;
    await this.fetchSoList();
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchSoList: ACTIONS.SALES_ORDER.FETCH_SALES_ORDER_LIST,
      fetchSalesOrderView: ACTIONS.SALES_ORDER.FETCH_SALES_ORDER_VIEW,
      fetchSalesOrder: ACTIONS.SALES_ORDER.FETCH_SALES_ORDER,
      deleteSalesOrder: ACTIONS.SALES_ORDER.DELETE_SALES_ORDER,
    }),

    async deleteItem(row) {
      Swal.fire({
        title: "Deleting Sales Order: " + row.so_number,
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          const index = this.soList.findIndex(
            (element) => element.id === row.id
          );
          if (index > -1) {
            const data = { index: index, id: row.id };
            this.deleteSalesOrder(data)
              .then((response: any) => {
                if (response.data.message == "success") {
                  Swal.fire({
                    title: "Sales Order Deleted Successfully!",
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

    async viewDetails(id) {
      await this.fetchSalesOrderView(id);
      this.$router.push({ path: `/sales-order/${id}` });
    },

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

    soDelivery() {
      return;
    },
  },
});
</script>
