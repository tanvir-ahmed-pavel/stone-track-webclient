<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
    <!--begin::Form-->
    <Form
      class="form w-100"
      id="kt_login_signin_form"
      @submit="onSubmitLogin"
      :validation-schema="login"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">Sign In to M/S Raian Traders.</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <!--        <div class="text-gray-400 fw-bold fs-4">-->
        <!--          New Here?-->
        <!--          <router-link to="/sign-up" class="link-primary fw-bolder">-->
        <!--            Create an Account-->
        <!--          </router-link>-->
        <!--        </div>div-->
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bolder text-dark">Email</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="email"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bolder text-dark fs-6 mb-0"
            >Password</label
          >
          <!--end::Label-->

          <!--begin::Link-->
          <!--          <router-link to="/password-reset" class="link-primary fs-6 fw-bolder">-->
          <!--            Forgot Password ?</router-link-->
          <!--          >-->
          <!--end::Link-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <!--begin::Submit button-->
        <button
          type="submit"
          id="kt_sign_in_submit"
          class="btn btn-lg btn-primary w-100 mb-5"
        >
          <span v-if="!loading" class="indicator-label">
            Continue
            <span class="svg-icon svg-icon-3 ms-2 me-0">
              <inline-svg src="icons/duotune/arrows/arr064.svg" />
            </span>
          </span>
          <span v-if="loading">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Submit button-->

        <!--begin::Separator-->
        <!--        <div class="text-center text-muted text-uppercase fw-bolder mb-5">-->
        <!--          or-->
        <!--        </div>-->
        <!--end::Separator-->

        <!--begin::Google link-->
        <!--        <a-->
        <!--          href="#"-->
        <!--          class="btn btn-flex flex-center btn-light btn-lg w-100 mb-5"-->
        <!--        >-->
        <!--          <img-->
        <!--            alt="Logo"-->
        <!--            src="media/svg/brand-logos/google-icon.svg"-->
        <!--            class="h-20px me-3"-->
        <!--          />-->
        <!--          Continue with Google-->
        <!--        </a>-->
        <!--end::Google link-->

        <!--begin::Google link-->
        <!--        <a-->
        <!--          href="#"-->
        <!--          class="btn btn-flex flex-center btn-light btn-lg w-100 mb-5"-->
        <!--        >-->
        <!--          <img-->
        <!--            alt="Logo"-->
        <!--            src="media/svg/brand-logos/facebook-4.svg"-->
        <!--            class="h-20px me-3"-->
        <!--          />-->
        <!--          Continue with Facebook-->
        <!--        </a>-->
        <!--end::Google link-->

        <!--begin::Google link-->
        <!--        <a href="#" class="btn btn-flex flex-center btn-light btn-lg w-100">-->
        <!--          <img-->
        <!--            alt="Logo"-->
        <!--            src="media/svg/brand-logos/apple-black.svg"-->
        <!--            class="h-20px me-3"-->
        <!--          />-->
        <!--          Continue with Apple-->
        <!--        </a>-->
        <!--end::Google link-->
      </div>
      <!--end::Actions-->
    </Form>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Actions } from "@/store/modules/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import * as Yup from "yup";

import { mapActions } from "vuex";
import { ACTIONS } from "@/store/modules/enums/StoreModuleEnums";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const loading = ref<boolean>(false);

    //Create form validation object
    const login = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
      password: Yup.string().min(4).required().label("Password"),
    });

    return {
      login,
      loading,
    };
  },

  methods: {
    ...mapActions({
      fetchLookupData: ACTIONS.LOOKUP_DATA.FETCH_LOOKUP_DATA,
    }),

    onSubmitLogin(values) {
      // Clear existing errors
      this.$store.dispatch(Actions.CLEAR_ERROR);

      // // Dummy delay
      setTimeout(() => {
        //   // Send login request
        this.$store
          .dispatch(Actions.LOGIN, values)
          .then(() => {
            this.fetchLookupData();
            this.loading = false;
            this.$router.push({ name: "dashboard" });
          })
          .catch(() => {
            Swal.fire({
              text: this.$store.getters.getErrors.email,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Try again!",
              customClass: {
                confirmButton: "btn fw-bold btn-light-danger",
              },
            });
          });
      }, 2000);

      this.loading = true;
    },
  },
});
</script>
