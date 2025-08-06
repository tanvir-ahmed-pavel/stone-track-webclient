<template>
  <router-view />
</template>

<style lang="scss">
@import "~bootstrap-icons/font/bootstrap-icons.css";
@import "~apexcharts/dist/apexcharts.css";
@import "~quill/dist/quill.snow.css";
@import "~animate.css";
@import "~sweetalert2/dist/sweetalert2.css";
@import "~nouislider/distribute/nouislider.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";
@import "~socicon/css/socicon.css";
@import "~line-awesome/dist/line-awesome/css/line-awesome.css";
@import "~@yaireo/tagify/src/tagify.scss";
@import "~dropzone/dist/dropzone.css";
@import "~@vueform/multiselect/themes/default.css";
@import "~prism-themes/themes/prism-shades-of-purple.css";
@import "~element-plus/lib/theme-chalk/index.css";

// Main demo style scss
@import "assets/sass/plugins";
@import "assets/sass/style";

// Dark mode demo style scss
//@import "assets/sass/plugins.dark";
//@import "assets/sass/style.dark";

//RTL version styles
//@import "assets/css/style.rtl.css";

.mod-disabled .el-input__inner {
  color: black !important;
}
.mod-align-right .el-input__inner {
  text-align: right !important;
}

.shadow-mod-total{
  box-shadow: 0px -2px 0px 0px rgba(0,0,0,1);
  -webkit-box-shadow: 0px -2px 0px 0px rgba(0,0,0,1);
  -moz-box-shadow: 0px -2px 0px 0px rgba(0,0,0,1);
}

.table-cus tr td,
.table-cus tr th {
  border-collapse: collapse;
  border: 1px solid #b4b4b4 !important;
}
.table-cus tr:last-child {
  border-bottom: 1px solid #b4b4b4 !important;
}
.table-cus tbody tr:last-child td {
  border-bottom: 1px solid #b4b4b4 !important;
}

.item-mod .el-form-item__content {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  line-height: 0px !important;
  position: relative;
  font-size: 1px !important;
}
</style>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { Mutations } from "@/store/modules/enums/StoreEnums";

export default defineComponent({
  name: "app",
  setup() {
    const store = useStore();

    onMounted(() => {
      /**
       * this is to override the layout config using saved data from localStorage
       * remove this to use config only from static config (@/core/config/DefaultLayoutConfig.ts)
       */
      store.commit(Mutations.OVERRIDE_LAYOUT_CONFIG);
    });
  },
});
</script>
