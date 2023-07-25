<template>
  <div class="Study">
    <div class="l" @click="clickA">
      <div class="m" @click="clickB">
        <div class="s" @click="clickC"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Study',
  mixins: [],
  components: {},
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    clickA(data){
      console.log('a');
    },
    clickB(data){
      console.log('b');
    },
    clickC(data){
      console.log('c');
    }
  }
}
</script>

<style scoped lang="scss">
  .l{
    width: 300px;
    height: 300px;
    background-color: lightblue;
    .m{
      width: 200px;
      height: 200px;
      background-color: lightcoral;
      .s{
        width: 100px;
        height: 100px;
      background-color: lightgreen;

      }
    }
  }
</style>