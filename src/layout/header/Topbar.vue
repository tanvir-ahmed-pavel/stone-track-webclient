<template>
  <!--begin::Toolbar wrapper-->
  <div class="d-flex align-items-stretch flex-shrink-0">
    <!--begin::User-->
    <div
      class="d-flex align-items-center ms-1 ms-lg-3"
      id="kt_header_user_menu_toggle"
    >
      <!--begin::Menu-->
      <div
        class="cursor-pointer symbol symbol-30px symbol-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
        data-kt-menu-flip="bottom"
      >
        <div class="menu-item px-3 rounded">
          <div class="menu-content d-flex align-items-center px-3">
            <div class="symbol symbol-50px me-2">
              <span class="svg-icon svg-icon-4x svg-icon-gray-800">
                <inline-svg
                  src="media/icons/duotune/communication/com006.svg"
                />
              </span>
            </div>
            <!--begin::Username-->
            <div class="d-flex flex-column">
              <div class="fw-bolder d-flex align-items-center fs-5">
                {{ user.name }}
              </div>
              <a href="#" class="fw-bold text-muted fs-7">{{ user.email }}</a>
            </div>
            <!--end::Username-->
          </div>
        </div>
      </div>
      <KTUserMenu></KTUserMenu>
      <!--end::Menu-->
    </div>
    <!--end::User -->

    <!--begin::Heaeder menu toggle-->
    <div
      class="d-flex align-items-center d-lg-none ms-2 me-n3"
      title="Show header menu"
    >
      <div
        class="btn btn-icon btn-active-light-primary"
        id="kt_header_menu_mobile_toggle"
      >
        <span class="svg-icon svg-icon-1">
          <inline-svg src="media/icons/duotune/text/txt001.svg" />
        </span>
      </div>
    </div>
    <!--end::Heaeder menu toggle-->
  </div>
  <!--end::Toolbar wrapper-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTUserMenu from "@/layout/header/partials/UserMenu.vue";
import store from "@/store";

export default defineComponent({
  name: "topbar",
  components: {
    KTUserMenu,
  },
  setup() {
    const user = store.getters.currentUser;

    return {
      user,
    };
  },
});
</script>
