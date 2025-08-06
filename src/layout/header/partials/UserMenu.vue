<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold py-4 fs-6 w-275px"
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-3">
        <!--begin::Avatar-->
        <div class="symbol symbol-50px me-2">
          <span class="svg-icon svg-icon-3x svg-icon-gray-800">
            <inline-svg src="media/icons/duotune/communication/com006.svg" />
          </span>
        </div>
        <!--end::Avatar-->
        <!--begin::Username-->
        <div class="d-flex flex-column">
          <div
            class="fw-bolder d-flex align-items-center text-hover-primary fs-5"
          >
            {{ user.name }}
            <!--            <span-->
            <!--              class="badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2"-->
            <!--              >Pro</span-->
            <!--            >-->
          </div>
          <a href="#" class="fw-bold text-muted text-hover-primary fs-7">{{
            user.email
          }}</a>
        </div>
        <!--end::Username-->
      </div>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->

    <!--    &lt;!&ndash;begin::Menu item&ndash;&gt;-->
    <!--    <div class="menu-item px-5">-->
    <!--      <router-link to="/pages/profile/overview" class="menu-link px-5">-->
    <!--        My Profile-->
    <!--      </router-link>-->
    <!--    </div>-->
    <!--    &lt;!&ndash;end::Menu item&ndash;&gt;-->

    <!--    &lt;!&ndash;begin::Menu separator&ndash;&gt;-->
    <!--    <div class="separator my-2"></div>-->
    <!--    &lt;!&ndash;end::Menu separator&ndash;&gt;-->

    <!--    &lt;!&ndash;begin::Menu item&ndash;&gt;-->
    <!--    <div class="menu-item px-5 my-1">-->
    <!--      <router-link to="/pages/profile/overview" class="menu-link px-5">-->
    <!--        Account Settings-->
    <!--      </router-link>-->
    <!--    </div>-->
    <!--    &lt;!&ndash;end::Menu item&ndash;&gt;-->

    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <a @click="signOut()" class="menu-link px-5"> Sign Out </a>
    </div>
    <!--end::Menu item-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Actions } from "@/store/modules/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "kt-user-menu",
  components: {},
  setup() {
    const router = useRouter();
    const i18n = useI18n();
    const store = useStore();
    const user = store.getters.currentUser;

    i18n.locale.value = localStorage.getItem("lang")
      ? (localStorage.getItem("lang") as string)
      : "en";

    const countries = {
      en: {
        flag: "media/flags/united-states.svg",
        name: "English",
      },
      es: {
        flag: "media/flags/spain.svg",
        name: "Spanish",
      },
      de: {
        flag: "media/flags/germany.svg",
        name: "German",
      },
      ja: {
        flag: "media/flags/japan.svg",
        name: "Japanese",
      },
      fr: {
        flag: "media/flags/france.svg",
        name: "French",
      },
    };

    const signOut = () => {
      store
        .dispatch(Actions.LOGOUT)
        .then(() => router.push({ name: "sign-in" }))
        .catch((error) => {
          Swal.fire({
            text: store.getters.getErrors.message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Try again!",
            customClass: {
              confirmButton: "btn fw-bold btn-light-danger",
            },
          });
        });
    };

    const setLang = (lang) => {
      localStorage.setItem("lang", lang);
      i18n.locale.value = lang;
    };

    const currentLanguage = (lang) => {
      return i18n.locale.value === lang;
    };

    const currentLangugeLocale = computed(() => {
      return countries[i18n.locale.value];
    });

    return {
      signOut,
      setLang,
      currentLanguage,
      currentLangugeLocale,
      countries,
      user,
    };
  },
});
</script>
