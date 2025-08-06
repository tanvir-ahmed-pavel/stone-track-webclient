<template>
  <template v-if="!loading">
    <TitleAndButtons title="Purchase Order List">
      <!--    Buttons-->
      <template v-slot:buttons>
        <!--begin::PO-->
        <router-link to="/purchase-order/create">
          <button type="button" class="btn btn-sm btn-flex btn-primary">
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr013.svg" />
            </span>
            New Purchase Order
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
        <el-table ref="multipleTable" :data="poList" style="width: 100%">
          <!--        Selection Column-->
          <el-table-column type="selection" width="55" />

          <el-table-column label="LC Number" property="lc_number" />

          <el-table-column label="PO Number" property="po_number" />

          <el-table-column label="Supplier" property="supplier.supplier_name" />

          <el-table-column label="PO Date" property="order_date" />

          <el-table-column label="Payable Total" property="payable_total" />

          <el-table-column label="PO Status" property="po_status" />

          <el-table-column
            label="Received in %"
            property="item_receipt_in_percent"
          />

          <!--        Edit & Delete-->
          <el-table-column label="Action">
            <template #default="scope">
              <el-col :span="8">
                <el-dropdown>
                  <el-button size="small" type="primary">
                    Action
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>
                        <a
                          class="btn btn-link"
                          @click.prevent="this.$router.push('/purchase-order-list/dashboard/' +scope.row.id)"
                        >
                          Dashboard
                        </a>
                      </el-dropdown-item>

                      <el-dropdown-item>
                        <router-link :to="'/po-details/' + scope.row.id">
                          View Details
                        </router-link>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <router-link :to="'/po-receive/' + scope.row.id">
                          PO Item Receive
                        </router-link>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <router-link :to="'/por-receive-list/' + scope.row.id">
                          Received Items List
                        </router-link>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <router-link
                          :to="`/purchase-order/${scope.row.id}/truck-loading`"
                        >
                          Truck Loading
                        </router-link>
                      </el-dropdown-item>

                      <el-dropdown-item>
                        <router-link
                          :to="`/purchase-order/${scope.row.id}/payments`"
                        >
                          Make Payments
                        </router-link>
                      </el-dropdown-item>

                      <el-dropdown-item v-if="!!scope.row.lc_id">
                        <router-link
                                :to="`/purchase-order-list/${scope.row.id}/tax-port`"
                        >
                          Tax/Port Fee
                        </router-link>
                      </el-dropdown-item>

                      <el-dropdown-item>
                        <button
                          class="btn btn-link text-danger"
                          @click.prevent="deleteItem(scope.row)"
                        >
                          Delete PO
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
              :total="poList.length"
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
      poList: GETTERS.PURCHASE.poList,
      poDeleted: GETTERS.PURCHASE.poDeleted,
    }),
    // Pagination
    paginatedData() {
      return this["poList"].slice(
        this["perPage"] * this["currentPage"] - this["perPage"],
        this["perPage"] * this["currentPage"]
      );
    },
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Purchase Order List", ["Buying"]);
    this.loading = true;
    await this.fetchPOList();
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchPOList: ACTIONS.PURCHASE.FETCH_PO_LIST,
      deletePOOrder: ACTIONS.PURCHASE.DELETE_PO_ORDER,
    }),

    async deleteItem(row) {
      Swal.fire({
        title: "Deleting Purchase Order: " + row.po_number,
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          const index = this.poList.findIndex(
            (element) => element.id === row.id
          );
          if (index > -1) {
            const data = { index: index, id: row.id };
            this.deletePOOrder(data)
              .then((response: any) => {
                if (response.data.message == "success") {
                  Swal.fire({
                    title: "Purchase Order Deleted Successfully!",
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

    showDeleteMsg(deleteMsg, icon) {
      Swal.fire({
        text: deleteMsg,
        icon: icon,
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
      return false;
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
