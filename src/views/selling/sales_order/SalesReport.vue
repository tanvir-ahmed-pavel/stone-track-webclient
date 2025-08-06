<template>
  <TitleAndButtons title="Sales Report"> </TitleAndButtons>

  <div class="card">
    <el-form class="text-center" ref="formRef" v-loading="loading">
      <div class="card">
        <el-card class="box-card mb-4">
          <table class="table">
            <tbody class="text-center">
              <tr>
                <td>
                  <label class="fs-6 fw-bold">Customer List</label>
                  <div>
                    <el-form-item>
                      <el-select
                        fit-input-width
                        v-model="customer_id"
                        filterable
                        placeholder="Select a Customer"
                        size="small"
                        clearable
                      >
                        <el-option
                          v-for="customer in customerList"
                          :key="customer.id"
                          :label="customer.customer_name"
                          :value="customer.id"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                </td>

                <td>
                  <label class="fs-6 fw-bold">Sales Item List</label>
                  <div>
                    <el-form-item>
                      <el-select
                        fit-input-width
                        v-model="item_id"
                        filterable
                        placeholder="Select an item"
                        size="small"
                        clearable
                      >
                        <el-option
                          v-for="item in itemList"
                          :key="item.id"
                          :label="item.item_name"
                          :value="item.id"
                        />
                      </el-select>
                    </el-form-item>
                  </div>
                </td>

                <td>
                  <label class="required fs-6 fw-bold">Date: Search From</label>
                  <div>
                    <el-form-item>
                      <el-date-picker
                        v-model="start_date"
                        type="date"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                        placeholder="Starting date"
                        size="small"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </td>

                <td>
                  <label class="required fs-6 fw-bold">Date: Search To</label>
                  <div>
                    <el-form-item>
                      <el-date-picker
                        v-model="end_date"
                        type="date"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                        placeholder="Ending date"
                        size="small"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </div>
                </td>

                <td>
                  <label class="fs-6 fw-bold" />
                  <div>
                    <el-form-item>
                      <button
                        type="button"
                        class="btn btn-sm btn-flex btn-warning me-3"
                        @click="searchingData"
                      >
                        <span class="svg-icon svg-icon-2">
                          <inline-svg
                            src="media/icons/duotune/coding/cod001.svg"
                          />
                        </span>
                        Search
                      </button>
                    </el-form-item>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </el-card>
        <hr />

        <div class="card-body pt-0">
          <el-table
            ref="multipleTable"
            :data="salesReportBySearch"
            style="width: 100%"
          >
            <el-table-column label="Sl">
              <template #default="scope"> {{ scope.$index + 1 }} </template>
            </el-table-column>

            <el-table-column label="Item Name" property="item_name" />

            <el-table-column label="Item Group" property="item_group_name" />

            <el-table-column label="Qty" property="order_quantity" />

            <el-table-column label="UOM" property="uom_name" />

            <el-table-column label="Rate" property="item_rate" />

            <el-table-column label="Amount" property="total_amount" />

            <el-table-column label="Sales order" property="so_number" />

            <el-table-column label="Order Date" property="so_order_date" />

            <el-table-column label="Customer" property="customer_name" />

            <el-table-column label="Project" property="project_title" />

            <el-table-column
              label="Delivered Qty"
              property="delivered_quantity"
            />
          </el-table>

          <!--      Pagination-->
          <div class="row">
            <div class="col-12 my-4 pt-3" style="text-align: right">
              <el-pagination
                background
                :page-sizes="[10, 20, 50, 100]"
                :page-size="perPage"
                layout="sizes, prev, pager, next"
                :total="salesReportBySearch.length"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
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
  name: "purchase-reports",
  components: { TitleAndButtons },
  setup() {
    const formRef = ref<null | HTMLFormElement>(null);
    const loading = ref<boolean>(false);

    return {
      formRef,
      loading,
    };
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      // loading: true,

      customer_id: "",
      item_id: "",
      start_date: new Date().toISOString().substr(0, 10),
      end_date: new Date().toISOString().substr(0, 10),
    };
  },

  computed: {
    ...mapGetters({
      salesReportBySearch: GETTERS.SALES.salesReportBySearch,
      customerList: GETTERS.CUSTOMER.customerList,
      itemList: GETTERS.ITEM.itemList,
    }),
    // Pagination
    paginatedData() {
      return this["salesReportBySearch"].slice(
        this["perPage"] * this["currentPage"] - this["perPage"],
        this["perPage"] * this["currentPage"]
      );
    },
  },

  created() {
    this.fetchCustomerList();
    this.fetchItemList();
    this.searchingData();

    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Sales Report", ["Reports"]);
  },

  methods: {
    ...mapActions({
      fetchCustomerList: ACTIONS.CUSTOMER.FETCH_CUSTOMER_LIST,
      fetchItemList: ACTIONS.ITEM.FETCH_ITEM_LIST,
      fetchSalesReportBySearch: ACTIONS.SALES.FETCH_SALES_REPORT_BY_SEARCH,
    }),

    searchingData() {
      if (this.start_date != null && this.end_date != null) {
        this.loading = true;

        var data = JSON.parse(
          JSON.stringify({
            customerID: this.customer_id,
            itemID: this.item_id,
            startDate: this.start_date,
            endDate: this.end_date,
          })
        );

        this.fetchSalesReportBySearch(data);

        this.loading = false;
      } else {
        Swal.fire({
          title: "Searching Sales Reports",
          text: "Date fields are must for searching..",
          type: "warning",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok, got it!",
        });
      }
    },

    // Pagination
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.perPage = val;
    },
    // End Pagination
  },
});
</script>

<style scoped>
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
