<template>
  <template v-if="!loading">
    <!--  Title and Buttons-->

    <TitleAndButtons title="Opening Balance">
      <!--    Buttons-->
      <template v-slot:buttons>
        <router-link to="/getting-started/opening-balance/create">
          <button type="button" class="btn btn-sm btn-flex btn-primary">
            <span class="svg-icon svg-icon-2">
              <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
            </span>
            New Opening Balance
          </button>
        </router-link>
      </template>
    </TitleAndButtons>

    <div class="card">
      <div class="card-header border-0 pt-6">
        <!--begin::Card title-->
        <div class="card-title"></div>
        <!--begin::Card title-->
      </div>
      <div class="card-body pt-0">
        <!--      Table Begin-->
        <el-table ref="multipleTable" :data="paginatedData" style="width: 100%">
          <!--         Date-->
          <el-table-column
            property="posting_date"
            label="Posting Date"
            align="center"
          />

          <!--    Total Credit    -->
          <el-table-column label="Total Credit" align="center">
            <template #default="scope">
              {{
                scope.row.total_credit_amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </template>
          </el-table-column>

          <!--    Total Debit    -->
          <el-table-column label="Total Debit" align="center">
            <template #default="scope">
              {{
                scope.row.total_debit_amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </template>
          </el-table-column>

          <!--        Created At-->
          <el-table-column property="created_at" label="Created" />

          <!--        Edit & Delete-->
          <el-table-column label="Action">
            <template #default="scope">
              <el-button size="mini">
                <router-link
                  :to="'/getting-started/opening-balance/' + scope.row.id"
                >
                  View Details
                </router-link>
              </el-button>

              <el-button
                size="mini"
                type="danger"
                @click="deleteItem(scope.row, scope.$index)"
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
              :total="this.openingBalance.length"
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
  name: "OpeningBalanceList",
  components: {
    TitleAndButtons,
  },
  setup() {
    return {};
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      editData: {},
      loading: false,
    };
  },

  computed: {
    ...mapGetters({
      openingBalance: GETTERS.ACCOUNT.openingBalanceList,
    }),
    // Pagination
    paginatedData() {
      return this["openingBalance"].slice(
        this["perPage"] * this["currentPage"] - this["perPage"],
        this["perPage"] * this["currentPage"]
      );
    },
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Opening Balance", ["Getting Started"]);
    this.loading = true;
    await this.fetchOpeningBalanceList();
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchOpeningBalanceList: ACTIONS.ACCOUNT.FETCH_OPENING_BALANCE_LIST,
      deleteOpeningBalance: ACTIONS.ACCOUNT.DELETE_OPENING_BALANCE,
    }),

    async deleteItem(row, index) {
      Swal.fire({
        title: "Deleting Opening Balance",
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          if (index > -1) {
            const data = { index: index, id: row.id };
            await this.deleteOpeningBalance(data)
              .then(async (response) => {
                if (response.data.message == "success") {
                  console.log(response.data.message);

                  Swal.fire({
                    title: "Opening Balance Deleted Successfully!",
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

    view() {
      this.$router.push("/lc-dashboard");
    },
  },
});
</script>
