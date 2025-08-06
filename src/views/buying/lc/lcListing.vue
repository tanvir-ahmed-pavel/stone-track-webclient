<template>
  <template v-if="!loading">
    <!--  Title and Buttons-->

    <TitleAndButtons title="LC Listing">
      <!--    Buttons-->
      <template v-slot:buttons>
        <button
          type="button"
          class="btn btn-sm btn-flex btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modal_add_lc"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr016.svg" />
          </span>
          Open New LC
        </button>
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
          <!--Lc Number-->
          <el-table-column property="lc_number" label="Lc Number" />

          <!--        Lc Issue Date-->
          <el-table-column
            property="issue_date"
            label="Issue Date"
            align="center"
          />

          <!--        Lc Supplier-->
          <el-table-column
            property="supplier.supplier_name"
            label="Lc Supplier"
            align="center"
          />

          <!--        Issue Bank-->
          <el-table-column
            label="Issuing Bank"
            align="center"
            prop="issuing_bank_name"
          />

          <!--        Created At-->
          <el-table-column property="created_at" label="Created" />

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
                        <button
                          class="btn btn-link"
                          @click="lcDashboard(scope.row.id)"
                        >
                          View Details
                        </button>
                      </el-dropdown-item>

                      <el-dropdown-item>
                        <a
                          class="btn btn-link"
                          data-bs-toggle="modal"
                          data-bs-target="#modal_update_lc"
                          @click.prevent="editData = scope.row"
                          >Edit</a
                        >
                      </el-dropdown-item>

                      <el-dropdown-item>
                        <a
                          class="btn btn-link"
                          @click.prevent="crushingCostModal(scope.row.id)"
                          >Crushing Cost</a
                        >
                      </el-dropdown-item>

                      <el-dropdown-item>
                        <a
                          class="btn btn-link text-danger"
                          @click.prevent="lcDelete(scope.row)"
                          >Delete</a
                        >
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
              :total="this.lcList.length"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            ></el-pagination>
          </div>
        </div>
      </div>
    </div>

    <AddLcModal></AddLcModal>
    <UpdateLcModal :data="editData"></UpdateLcModal>
    <AddCrushingCost></AddCrushingCost>
  </template>

  <template v-else>
    <cus-loading></cus-loading>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddLcModal from "@/views/buying/lc/lcModal/AddLcModal.vue";
import UpdateLcModal from "@/views/buying/lc/lcModal/UpdateLcModal.vue";
import AddCrushingCost from "@/views/buying/lc/lcModal/AddCrushingCost.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";
import { showModal } from "@/core/helpers/dom";

export default defineComponent({
  name: "lc-listing",
  components: {
    TitleAndButtons,
    AddLcModal,
    UpdateLcModal,
    AddCrushingCost,
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
      lcList: GETTERS.LC.lcList,
    }),
    // Pagination
    paginatedData() {
      return this["lcList"].slice(
        this["perPage"] * this["currentPage"] - this["perPage"],
        this["perPage"] * this["currentPage"]
      );
    },
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("LC Listing", []);
    this.loading = true;
    await this.fetchLcList();
    await this.fetchBankList();
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchItemCrushingCost: ACTIONS.LC.FETCH_ITEM_CRUSHING_COST,
      fetchLcDashboard: ACTIONS.DASHBOARD.FETCH_LC_DASHBOARD,
      fetchLcList: ACTIONS.LC.FETCH_LC_LIST,
      fetchBankList: ACTIONS.ACCOUNT.FETCH_BANK_ACCOUNT_LIST,
      deleteLc: ACTIONS.LC.DELETE_LC,
    }),

    async lcDashboard(id) {
      this.$router.push({ path: "/lc/" + id });
    },

    async crushingCostModal(lc_id) {
      await this.fetchItemCrushingCost(lc_id);
      showModal("modal_add_crashing_cost");
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

    async lcDelete(row) {
      Swal.fire({
        title: "Deleting Lc: " + row.lc_number,
        text: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          const index = this.lcList.findIndex((item) => item.id === row.id);
          if (index > -1) {
            const data = { index: index, id: row.id };
            this.deleteLc(data)
              .then((response) => {
                if (response.data.message == "success") {
                  Swal.fire({
                    title: "LC Deleted Successfully!",
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
