<template>
  <!--  Title and Buttons-->
  <TitleAndButtons title="Generator Log (Deutz 560 KVA II 448 KW)">
    <!--    Buttons-->
    <template v-slot:buttons>
      <router-link to="/generator/reports">
        <button type="button" class="btn btn-sm btn-flex btn-success me-3">
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/general/gen021.svg" />
          </span>
          View Reports
        </button>
      </router-link>
      <button
        type="button"
        class="btn btn-sm btn-flex btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modal_add_generatorLog"
      >
        <span class="svg-icon svg-icon-2">
          <inline-svg src="media/icons/duotune/arrows/arr013.svg" />
        </span>
        New Log
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
        <!--Date-->
        <el-table-column property="run_date" label="Date" />

        <!--Meter-->
        <el-table-column property="meter" label="Meter" />

        <!--        Diesel-->
        <el-table-column
          property="diesel_litter"
          label="Diesel (L)"
          align="center"
        />

        <!--        Amount-->
        <el-table-column property="amount" label="Amount" />

        <!--        Working Hours-->
        <el-table-column property="working_hours" label="Working Hours" />

        <!--        Edit & Delete-->
        <el-table-column label="Actions">
          <template #default="scope">
            <el-button
              size="mini"
              type="danger"
              @click.prevent="itemDelete(scope.row)"
              >Delete</el-button
            >
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
            :total="this.generatorLogList.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>

  <AddGeneratorLog></AddGeneratorLog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddGeneratorLog from "@/views/generator/generatorsModal/AddGeneratorsLog.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";

export default defineComponent({
  name: "generator-log",
  components: {
    TitleAndButtons,
    AddGeneratorLog,
  },
  setup() {
    return {};
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      editData: {},
    };
  },

  computed: {
    ...mapGetters({
      generatorLogList: GETTERS.GENERATOR_LOG.generatorLogList,
    }),
    // Pagination
    paginatedData() {
      return this["generatorLogList"].slice(
        this["perPage"] * this["currentPage"] - this["perPage"],
        this["perPage"] * this["currentPage"]
      );
    },
  },

  created() {
    this.fetchGeneratorLogList();
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Generator Logs", ["Generator"]);
  },

  methods: {
    ...mapActions({
      fetchGeneratorLogList: ACTIONS.GENERATOR_LOG.FETCH_GENERATOR_LOG_LIST,
      deleteGeneratorLog: ACTIONS.GENERATOR_LOG.DELETE_GENERATOR_LOG,
    }),

    // Pagination
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSizeChange(val) {
      this.perPage = val;
    },
    // End Pagination

    itemDelete(row) {
      Swal.fire({
        title: "Deleting Generator Log",
        text: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.value) {
          const index = this.generatorLogList.findIndex(
            (item) => item.cus_primary_email === row.cus_primary_email
          );
          if (index > -1) {
            const data = { index: index, id: row.id };
            var msg = await this.deleteGeneratorLog(data);
            if (msg == "success") {
              Swal.fire({
                title: "Generator Log Deleted Successfully!",
                type: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
              });
            }
          }
        }
      });
    },
  },
});
</script>
