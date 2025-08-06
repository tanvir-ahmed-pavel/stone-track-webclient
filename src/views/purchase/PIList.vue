<template>
  <template v-if="!loading">
    <TitleAndButtons title="Purchase Invoice List"> </TitleAndButtons>

    <div class="card">
      <div class="card-header border-0 pt-6">
        <!--begin::Card toolbar-->
        <div class="card-toolbar"></div>
        <!--end::Card toolbar-->
      </div>
      <div class="card-body pt-0">
        <el-table ref="multipleTable" :data="piList" style="width: 100%">
          <el-table-column label="LC Number" property="lc_details.lc_number" />

          <el-table-column label="PO Number" property="po_details.po_number" />

          <el-table-column label="PI Number" property="po_invoice_number" />

          <el-table-column label="Supplier" property="supplier.supplier_name" />

          <el-table-column label="PI Date" property="created_at" />

          <el-table-column label="Payable Total">
            <template #default="scope">
              <span>{{ scope.row.pi_payable_total.toLocaleString() }}</span>
            </template>
          </el-table-column>

          <el-table-column label="Due Total">
            <template #default="scope">
              <span>{{ scope.row.outstanding_amount.toLocaleString() }}</span>
            </template>
          </el-table-column>

          <el-table-column label="Payment Status" property="pi_status" />

          <el-table-column
            label="Delivery Note"
            property="po_receipt_details.receipt_note"
          />

          <!--        Action-->
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
                          class="btn btn-link"
                          :to="'/purchase-invoice/' + scope.row.id"
                        >
                          View Details
                        </router-link>
                      </el-dropdown-item>

<!--                      <el-dropdown-item>-->
<!--                        <router-link-->
<!--                          class="btn btn-link"-->
<!--                          :to="'/purchase-payment-invoice/' + scope.row.id"-->
<!--                        >-->
<!--                          Make Payment-->
<!--                        </router-link>-->
<!--                      </el-dropdown-item>-->

                      <el-dropdown-item>
                        <button
                          class="btn btn-link text-danger"
                          @click.prevent="deleteItem(scope.row)"
                        >
                          Delete Invoice
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
              :total="piList.length"
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
  name: "suppliers-listing",
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

  computed: {
    ...mapGetters({
      piList: GETTERS.PURCHASE.piList,
    }),
    // Pagination
    paginatedData() {
      return this["piList"].slice(
        this["perPage"] * this["currentPage"] - this["perPage"],
        this["perPage"] * this["currentPage"]
      );
    },
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Purchase Invoice List", ["Buying"]);
    this.loading = true;
    await this.fetchPIList();
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchPIList: ACTIONS.PURCHASE.FETCH_PI_LIST,
      deletePI: ACTIONS.PURCHASE.DELETE_PI,
    }),

    async deleteItem(row) {
      Swal.fire({
        title: "Deleting PO Invoice: " + row.po_invoice_number,
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          const index = this.piList.findIndex(
            (element) => element.id === row.id
          );
          if (index > -1) {
            const data = { index: index, id: row.id };
            this.deletePI(data)
              .then((response: any) => {
                if (response.data.message == "success") {
                  Swal.fire({
                    title: "PO Invoice Deleted Successfully!",
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
