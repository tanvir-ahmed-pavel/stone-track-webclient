<template>
  <!--begin::Header-->
  <div id="kt_header" style="" class="header align-items-stretch">
    <!--begin::Container-->
    <div
      :class="{
        'container-fluid': headerWidthFluid,
        'container-xxl': !headerWidthFluid,
      }"
      class="d-flex align-items-stretch justify-content-between"
    >
      <!--begin::Aside mobile toggle-->
      <div
        class="d-flex align-items-center d-lg-none ms-n3 me-1"
        title="Show aside menu"
      >
        <div
          class="btn btn-icon btn-active-light-primary"
          id="kt_aside_mobile_toggle"
        >
          <span class="svg-icon svg-icon-2x mt-1">
            <inline-svg src="media/icons/duotune/abstract/abs015.svg" />
          </span>
        </div>
      </div>
      <!--end::Aside mobile toggle-->

      <!--begin::Mobile logo-->
      <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
        <a href="#" class="d-lg-none">
          <img alt="Logo" src="media/logos/logo-2.svg" class="h-30px" />
        </a>
      </div>
      <!--end::Mobile logo-->

      <!--begin::Wrapper-->
      <div
        class="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
      >
        <!--begin::Navbar-->
        <div class="d-flex align-items-stretch" id="kt_header_menu_nav">
          <!--            Breadcrumb goes here-->
          <div
            data-kt-swapper="true"
            data-kt-swapper-mode="prepend"
            data-kt-swapper-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}"
            class="page-title d-flex align-items-center flex-wrap me-3 mb-5 mb-lg-0"
          >
            <!--begin::Title-->
            <!--            <h1 class="d-flex align-items-center text-dark fw-bolder my-1 fs-3">-->
            <!--              {{ title }}-->
            <!--            </h1>-->
            <!--end::Title-->

            <span
              v-if="breadcrumbs"
              class="h-20px border-gray-200 border-start mx-4"
            ></span>

            <!--begin::Breadcrumb-->
            <ul
              v-if="breadcrumbs"
              class="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1"
            >
              <li class="breadcrumb-item pe-3">
                <router-link
                  to="/dashboard"
                  class="text-muted text-hover-primary"
                >
                  Home
                </router-link>
              </li>
              <li class="breadcrumb-item">
                <span class="bullet bg-gray-200 w-5px h-2px"></span>
              </li>
              <template v-for="(item, index) in breadcrumbs" :key="index">
                <li class="breadcrumb-item text-muted">
                  {{ item }}
                </li>
                <li class="breadcrumb-item">
                  <span class="bullet bg-gray-200 w-5px h-2px"></span>
                </li>
              </template>
              <li class="breadcrumb-item pe-3 text-dark">
                {{ title }}
              </li>
            </ul>
            <!--end::Breadcrumb-->
          </div>
        </div>
        <!--end::Navbar-->

        <!--begin::Topbar-->
        <div class="d-flex align-items-stretch flex-shrink-0">
          <KTTopbar></KTTopbar>
        </div>
        <!--end::Topbar-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::Container-->
  </div>
  <!--end::Header-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTTopbar from "@/layout/header/Topbar.vue";
import {
  asideDisplay,
  headerLeft,
  headerWidthFluid,
} from "@/core/helpers/config";
// import KTMenu from "@/layout/header/Menu.vue";

export default defineComponent({
  name: "KTHeader",
  props: {
    title: String,
    breadcrumbs: Array,
  },
  components: {
    KTTopbar,
    // KTMenu,
  },
  setup() {
    return {
      headerWidthFluid,
      headerLeft,
      asideDisplay,
    };
  },
});
</script>
