<template>
  <div>
    <div
      class="d-flex align-items-center justify-content-between bg-hover-secondary rounded py-2 px-3"
      @mouseover="show = true"
      @mouseleave="show = false"
    >
      <div class="d-flex align-items-center">
        <a
          href=""
          :class="`text-dark fs-3 ${isOpen && children ? 'fw-bolder' : ''}`"
          @click.prevent="isOpen = !isOpen"
        >
          <div>
            <span v-if="is_default == 1" class="svg-icon svg-icon-1 me-2">
              <inline-svg :src="`media/icons/duotune/general/gen047.svg`" />
            </span>
            <span v-else class="svg-icon svg-icon-1 svg-icon-success me-2">
              <inline-svg :src="`media/icons/duotune/general/gen043.svg`" />
            </span>

            <span
              v-if="!!children || node.parent_id == 0"
              :class="`svg-icon svg-icon-warning svg-icon-1 me-2`"
            >
              <inline-svg
                :src="`media/icons/duotune/files/${
                  isOpen ? 'fil014' : 'fil012'
                }.svg`"
              />
            </span>
            <span v-else class="svg-icon svg-icon-dark svg-icon-2 me-2">
              <inline-svg
                :src="`media/icons/duotune/files/${
                  !children ? 'fil003' : ''
                }.svg`"
              />
            </span>

            {{ label }}
          </div>
        </a>
        <span v-show="show" class="ms-5 fw-light">
          <div class="btn-group border border-secondary rounded" role="group">
            <button
              @click="$emit('clicked', node)"
              type="button"
              class="btn btn-sm px-4 py-1 btn-primary"
            >
              Add Child
            </button>
            <button
              v-if="is_default == 0"
              @click="
                $emit('clicked-edit', {
                  id: node.id,
                  parent: node.parent_name,
                  root_type: node.root_type,
                })
              "
              type="button"
              class="btn btn-sm px-4 py-1 btn-light"
            >
              Edit
            </button>

            <button
              v-else
              @click="
                $emit('clicked-view', {
                  id: node.id,
                  parent: node.parent_name,
                  root_type: node.root_type,
                })
              "
              type="button"
              class="btn btn-sm px-4 py-1 btn-success"
            >
              View
            </button>
            <button
              :disabled="children"
              v-if="is_default == 0"
              @click="$emit('clicked-delete', { id: node.id })"
              type="button"
              class="btn btn-sm px-4 py-1 btn-danger"
            >
              Delete
            </button>
          </div>
        </span>
      </div>

      <span class="fs-4">{{ balance }}</span>
    </div>

    <div class="ms-9" v-show="isOpen && !!children">
      <TreeComponent
        @clicked="(node) => $emit('clicked', node)"
        @clicked-edit="$emit('clicked-edit', $event)"
        @clicked-view="$emit('clicked-view', $event)"
        @clicked-delete="$emit('clicked-delete', $event)"
        v-for="(item, index) in children"
        :label="item.account_head_name"
        :children="item.children"
        :balance="item.balance"
        :is_default="item.is_default"
        :node="{
          id: item.id,
          parent_name: item.parent_name,
          self_parent: item.account_head_name,
          balance: item.balance,
          root_type: item.root_type,
          parent_id: item.parent_id,
          is_default: item.is_default,
        }"
        v-bind:key="index"
      ></TreeComponent>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "TreeComponent",
  props: {
    label: {
      type: String,
    },
    balance: {
      type: String,
    },
    is_default: {
      type: Number,
    },
    children: {
      type: Array,
    },
    node: {
      type: Object,
    },
  },
  methods: {},
  setup() {
    const isOpen = ref(false);
    const show = ref(false);

    return {
      isOpen,
      show,
    };
  },
};
</script>

<style scoped></style>
