<template>
  <CalendarApp1></CalendarApp1>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import CalendarApp1 from "@/components/calendar/CalendarApp1.vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "calendar",
  components: {
    CalendarApp1,
  },
  setup() {
    onMounted(() => {
      setCurrentPageTitle("Calender");
    });
  },
});
</script>
