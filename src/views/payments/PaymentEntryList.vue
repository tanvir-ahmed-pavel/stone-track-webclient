<template>
  <template v-if="!loading">
    <TitleAndButtons title="Payment Entry List">
      <!--    Buttons-->
      <template v-slot:buttons>
        <!--begin::PO-->
        <router-link to="/payment-entry">
          <button type="button" class="btn btn-sm btn-flex btn-primary">
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr013.svg" />
            </span>
            New Payment Entry
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
        <el-table ref="multipleTable" :data="paginatedData" style="width: 100%">
          <!--        Selection Column-->
          <el-table-column label="Transaction Date" property="created_at" />

          <el-table-column label="Bill No" property="payment_number" />

          <el-table-column label="A/C Head" property="chart_of_account_head" />

          <el-table-column label="Income (BDT)" property="amount_income" />

          <el-table-column label="Expenses (BDT)" property="amount_expenses" />

          <!--        Edit & Delete-->
          <el-table-column label="Action">
            <template #default="scope">
              <el-button size="mini">
                <router-link :to="'/ie-details/' + scope.row.id">
                  View Details
                </router-link>
              </el-button>

              <el-button
                @click.prevent="deleteItem(scope.row, scope.$index)"
                size="mini"
                type="danger"
              >

                Delete
              </el-button>
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
              :total="this.incomeExpenseList.length"
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
  name: "PaymentEntryList",
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
      incomeExpenseList: GETTERS.ACCOUNT.incomeExpenseList,
    }),
    // Pagination
    paginatedData() {
      return this["incomeExpenseList"].slice(
        this["perPage"] * this["currentPage"] - this["perPage"],
        this["perPage"] * this["currentPage"]
      );
    },
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Payment Entry List", ["Payment"]);
    this.loading = true;
    await this.fetchIncomeExpenseList();
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchIncomeExpenseList: ACTIONS.ACCOUNT.FETCH_INCOME_EXPENSES,
      deleteIncomeExpense: ACTIONS.ACCOUNT.DELETE_INCOME_EXPENSE,
    }),

    async deleteItem(row, index) {
      Swal.fire({
        title: "Deleting Payment Entry: " + row.payment_number,
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          if (index > -1) {
            const data = { index: index, id: row.id };
            this.deleteIncomeExpense(data)
              .then((response: any) => {
                if (response.data.message == "success") {
                  this.incomeExpenseList.splice(index, 1);
                  Swal.fire({
                    title: "Payment Entry Deleted Successfully!",
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
