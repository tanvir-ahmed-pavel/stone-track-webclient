<template>
  <div class="card shadow-sm">
    <div class="card-header py-5 align-items-center justify-content-between">
      <!-- Filter -->
      <div
        class="col-12 notice bg-hover-light bg-lighten rounded border-gray-700 border border-dashed py-3 px-4"
      >
        <!--begin::Content-->
        <slot name="filters"></slot>
        <!--end::Content-->
      </div>
    </div>

    <div class="card-body">
      <table class="table table-striped">
        <thead class="text-center">
          <tr class="fw-bolder fs-3">
            <th v-for="(item, index) in tableHead" :key="index">{{ item }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="tableData">
            <tr
              v-for="(tableRow, rowIndex) in tableData"
              :key="rowIndex"
              class="border-bottom-2 border-gray-400 border-dashed"
            >
              <td
                v-for="(key, cellIndex) in tableDataKey"
                :key="cellIndex"
                class="py-5 fs-5 px-5"
              >
                <span>
                  {{ isArray(key) ? tableRow.key[0]+' '+ key[1] :tableRow.key }}
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
        <tfoot
          v-if="tableTotal"
          class=""
          style="position: sticky; inset-block-end: 0"
        >
          <tr class="fs-3 fw-bolder bg-light shadow-mod">
            <th v-for="(key, cellIndex) in tableTotalKey" :key="cellIndex" class="text-lg-end">
              {{ key ? isArray(key) ? tableTotal.key[0]+' '+ key[1] : tableTotal.key : ""}}
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ReportsComponent",
  components: {},
  props:{
    tableHead:{
      type:Array,
      required:true
    },
    tableDataKey:{
      type:Array,
      required:true
    },
    tableData:{
      type:Array,
      required:true
    },
    tableTotalKey:{
      type:Array,
      required:true
    },
    tableTotal:{
      type:Array,
      required:true
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
.shadow-mod {
  -webkit-box-shadow: 0px -3px 1px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px -3px 1px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 0px -3px 1px 0px rgba(0, 0, 0, 0.4);
}
</style>
