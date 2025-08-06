<template>
  <template v-if="!loading">
    <TitleAndButtons title="Stock Balance">
      <!--    Buttons-->
      <template v-slot:buttons> </template>
    </TitleAndButtons>
    <div class="card shadow-sm">
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr class="fw-bolder fs-3">
              <th>Item Name</th>
              <th>Item Group</th>
              <th>UMO</th>
              <th class="">Balance QTY</th>
              <th class="">Balance Value</th>
              <th class="">Unit Price</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="stockBalanceReport.data">
              <tr
                v-for="(tableRow, rowIndex) in stockBalanceReport.data"
                :key="rowIndex"
                class="border-bottom-2 border-gray-400 border-dashed"
              >
                <td class="py-5 fs-5">
                  <span>
                    {{ tableRow.item_name }}
                  </span>
                </td>

                <td class="py-5 fs-5">
                  <span>
                    {{ tableRow.item_group_name }}
                  </span>
                </td>

                <td class="py-5 fs-5">
                  <span>
                    {{ tableRow.uom_name }}
                  </span>
                </td>
                <td class="py-5 fs-5 w-auto">
                  <span class="text-right">
                    {{ tableRow.final_balance_qty.toLocaleString() }}
                  </span>
                </td>
                <td class="py-5 fs-5 w-auto">
                  <span class="text-right">
                    {{ tableRow.final_total_balance.toLocaleString() }} ৳
                  </span>
                </td>
                <td class="py-5 fs-5 p-3">
                  <span>
                    {{ tableRow.final_unit_price.toLocaleString() }} ৳
                  </span>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td :colspan="8" class="text-center">
                  <span class="fs-3 fa-w-3">No Records</span>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  <template v-else>
    <cus-loading></cus-loading>
  </template>
</template>

<script>
import { defineComponent, ref } from "vue";

import { mapActions, mapGetters } from "vuex";
import { ACTIONS, GETTERS } from "@/store/modules/enums/StoreModuleEnums";
import { MenuComponent } from "@/assets/ts/components";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import TitleAndButtons from "@/views/reuseable/TitleAndButtons.vue";

export default defineComponent({
  name: "accountsReceivableDetails",
  components: {
    TitleAndButtons,
  },

  setup() {
    const formRefACP = (ref < null) | (HTMLFormElement > null);

    const rules = ref({
      start_date: [
        {
          required: true,
          message: "Please select start date.",
          trigger: "change",
        },
      ],
      end_date: [
        {
          required: true,
          message: "Please select end date.",
          trigger: "change",
        },
      ],
    });

    return {
      rules,
      formRefACP,
    };
  },

  data() {
    return {
      loading: false,
      table: {
        head: [
          "Date",
          "Item Name",
          "Item Group",
          "UMO",
          "Balance QTY",
          "Balance Value",
        ],
      },
    };
  },

  computed: {
    ...mapGetters({
      stockBalanceReport: GETTERS.OTHER_REPORTS.stockBalanceReport,
    }),
  },

  async created() {
    MenuComponent.reinitialization();
    setCurrentPageBreadcrumbs("Stock Balance Reports", ["Reports"]);
    this.loading = true;
    await this.loadStockBalanceReportData();
    this.loading = false;
  },

  methods: {
    ...mapActions({
      fetchStockBalanceReport: ACTIONS.OTHER_REPORTS.FETCH_STOCK_BALANCE_REPORT,
    }),

    async loadStockBalanceReportData() {
      await this.fetchStockBalanceReport();
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
