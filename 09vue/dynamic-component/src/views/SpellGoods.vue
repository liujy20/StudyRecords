<template>
    <div id="main">
      <Search></Search>
      <List></List>
      <Pagin></Pagin>
    </div>
  </template>
  
  <script>
  import Search from "../components/Search.vue";
  import List from "../components/List.vue";

  import Pagin from '../components/Pagin.vue';
  export default {
    components:{
        Search,
      List,
      Pagin
    }
  }
  </script>
  
  <style>
  #main{
  
    background-color: #fff;
    flex-grow: 1;
    overflow-y: auto;
  }
  </style>