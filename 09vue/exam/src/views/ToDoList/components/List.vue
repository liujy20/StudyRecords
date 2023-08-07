<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <span id="todocount">{{data.length}}</span>
    <ol id="todolist">
      <item-vue v-for="item in data" :key="item" :info="item" v-bind="$attrs" v-on="$listeners">{{item}}</item-vue>
    </ol>
  </div>
</template>

<script>
import ItemVue from "./Item.vue";
export default {
  components: {
    ItemVue,
  },
  props: ["data", "title"],
};
</script>

<style>
</style>