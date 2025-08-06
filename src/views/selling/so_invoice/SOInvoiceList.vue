<template>
  <template v-if="!loading">
    <TitleAndButtons :title="`SO Invoice List`">
      <!--    Buttons-->
      <template v-slot:buttons>
        <button
          type="button"
          class="btn btn-sm btn-flex btn-danger me-3"
          @click="this.$router.back()"
          :disabled="loading"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr054.svg" />
          </span>
          Go Back
        </button>
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
        <el-table ref="multipleTable" :data="soInvoiceList" style="width: 100%">
          <el-table-column type="index" label="SL." width="55" />

          <el-table-column
            label="SO Invoice Number"
            property="so_invoice_number"
          />

          <el-table-column label="SO Number" property="so_details.so_number" />

          <el-table-column label="Invoice Date" property="invoice_date" />

          <el-table-column label="Due Date" property="due_date" />

          <el-table-column
            label="Receivable Total"
            property="si_receivable_total"
          >
            <template #default="scope">
              {{ scope.row.si_receivable_total.toLocaleString(undefined) }}
            </template>
          </el-table-column>

          <el-table-column label="Outstanding" property="si_outstanding_amount">
            <template #default="scope">
              {{ scope.row.si_outstanding_amount.toLocaleString(undefined) }}
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
                          :to="`/sales-order/so-invoice/${scope.row.id}`"
                        >
                          View Details
                        </router-link>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <router-link
                          :to="`/receive-so-payments/${scope.row.id}`"
                        >
                          Receive Payments
                        </router-link>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <button
                          class="btn btn-link text-danger"
                          @click.prevent="deleteInvoice(scope.row)"
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
              :total="this.soInvoiceList.length"
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

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

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

  computed: {
    ...mapGetters({
      soInvoiceList: GETTERS.SO_INVOICE.soInvoiceList,
    }),
    // Pagination
    paginatedData() {
      return this["soInvoiceList"].slice(
        this["perPage"] * this["currentPage"] - this["perPage"],
        this["perPage"] * this["currentPage"]
      );
    },
  },

  async created() {
    this.loading = true;
    await this.fetchSoInvoiceList();
    this.loading = false;

    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("SO Invoice List", ["Selling", "Invoice"]);
  },

  methods: {
    ...mapActions({
      fetchSoInvoiceList: ACTIONS.SO_INVOICE.FETCH_SO_INVOICE_LIST,
      deleteSoInvoice: ACTIONS.SO_INVOICE.DELETE_SO_INVOICE,
    }),

    // Pagination
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.perPage = val;
    },
    // End Pagination

    // soDelivery() {
    // },

    // editSO(row) {
    //   this.loadCustomer(row);
    // },

    async deleteInvoice(row) {
      Swal.fire({
        title: "Deleting SO Invoice: " + row.so_invoice_number,
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          const index = this.soInvoiceList.findIndex(
            (so) => so.supp_primary_email === row.supp_primary_email
          );
          if (index > -1) {
            const data = { index: index, id: row.id };
            this.deleteSoInvoice(data)
              .then((response) => {
                if (response.data.message == "success") {
                  Swal.fire({
                    title: "SO Invoice Deleted Successfully!",
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
