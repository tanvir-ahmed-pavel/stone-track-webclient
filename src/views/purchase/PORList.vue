<template>
  <template v-if="!loading">
    <TitleAndButtons title="Purchase Items Receipt List">
      <!--    Buttons-->
      <template v-slot:buttons>
        <!--begin::PO-->
        <router-link to="/purchase-order-list">
          <button type="button" class="btn btn-sm btn-flex btn-primary">
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
            </span>
            Back Purchase Order List
          </button>
        </router-link>
      </template>
    </TitleAndButtons>

    <div class="card">
      <div class="card-header border-0 pt-6">
        <!--begin::Card toolbar-->
        <div class="card-toolbar"></div>
        <!--end::Card toolbar-->
      </div>
      <div class="card-body pt-0">
        <el-table ref="multipleTable" :data="porList" style="width: 100%">
          <!--        Selection Column-->
          <el-table-column type="selection" width="55" />

          <el-table-column label="LC Number" property="lc_number" />

          <el-table-column label="Supplier" property="supplier_name" />

          <el-table-column
            label="PO Number"
            property="po_details[0].po_number"
          />

          <el-table-column label="POR Number" property="po_receipt_number" />

          <el-table-column
            label="Order Qty"
            property="po_details[0].total_order_quantity"
            style="text-align: right"
          />

          <el-table-column
            label="Recv Qty"
            property="total_receipt_quantity"
            style="text-align: right"
          />

          <el-table-column label="POR Date" property="receipt_date" />

          <el-table-column
            label="Payable Total"
            property="receipt_payable_total"
            style="text-align: right"
          />

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
                          size="small"
                          type="primary"
                          :to="'/por-details/' + scope.row.id"
                        >
                          View Details
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
              :total="this.porList.length"
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
// import { ArrowDown, CircleCheck, Check, CirclePlus, CirclePlusFilled, Plus} from "element-plus/packages/icon";

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
      porList: GETTERS.PURCHASE.porList,
    }),
    // Pagination
    paginatedData() {
      return this["porList"].slice(
        this["perPage"] * this["currentPage"] - this["perPage"],
        this["perPage"] * this["currentPage"]
      );
    },
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Purchased Items Receipt List", [
      "Buying",
      "Purchase Order List",
    ]);
    this.loading = true;
    var por_id = await Number.parseInt(this.$route.params.id.toString());
    await this.fetchPORListById(por_id);
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchPORListById: ACTIONS.PURCHASE.FETCH_POR_LIST_BY_ID,
      deletePOR: ACTIONS.PURCHASE.DELETE_PO_RECEIVE,
    }),

    // Pagination
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.perPage = val;
    },
    // End Pagination

    async deleteItem(row) {
      Swal.fire({
        title: "Deleting Purchase Receive: " + row.po_receipt_number,
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          const index = this.porList.findIndex(
            (element) => element.id === row.id
          );
          if (index > -1) {
            const data = { index: index, id: row.id };
            this.deletePOR(data)
              .then((response: any) => {
                if (response.data.message == "success") {
                  Swal.fire({
                    title: "Purchase Receive Deleted Successfully!",
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
