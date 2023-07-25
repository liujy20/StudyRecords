<template>
  <div class="content">
    <div class="bg">
      <div class="tit">
        <SearchVue></SearchVue>
        <button>导入</button>
      </div>
      <TableVue></TableVue>
    </div>
    <FooterVue></FooterVue>
  </div>
</template>

<script>
import SearchVue from "./Search.vue";
import TableVue from "./Table.vue";
import FooterVue from "./Footer.vue";

export default {
  name: "Content",
  mixins: [],
  components: {
    TableVue,
    SearchVue,
    FooterVue,
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.content {
  background-color: #f5f5f5;
  overflow: auto;
  height: 100%;
  .bg {
    margin: 20px;
    background-color: #fff;
    text-align: left;
    position: relative;

    .tit {
      padding-bottom: 20px;
      border-bottom: 1px solid #e6ebf5;
      button {
        margin-left: 20px;
        width: 55px;
        height: 30px;
      }
    }
  }
}
</style>