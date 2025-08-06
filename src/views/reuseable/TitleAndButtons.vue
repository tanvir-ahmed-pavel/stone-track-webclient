<template>
  <div
    :class="`card custom-sticky-top ${
      transparent ? 'transparent' : 'not-transparent'
    }`"
  >
    <div class="card-body py-6">
      <div class="row justify-content-between">
        <div class="col-md-6 fv-row">
          <span class="fw-bolder fs-2">
            {{ title }}
          </span>
        </div>
        <div class="col-md-6 fv-row text-end">
          <div class="d-flex justify-content-end align-items-center">
            <slot name="buttons"> </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleAndButtons",
  props: {
    title: {
      type: String,
    },
  },
  data() {
    return {
      transparent: true,
    };
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.transparent = window.scrollY <= 0;
    },
  },
};
</script>

<style scoped>
.custom-sticky-top {
  position: sticky;
  top: 65px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin: -30px 0 2px 0;
}
.transparent {
  background-color: transparent;
}
.not-transparent {
  box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.3);
  z-index: 99;
}
</style>
