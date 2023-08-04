<template>
    <div id="main">
      <GroupBox></GroupBox>
      <SearchGroup></SearchGroup>
      <GroupList></GroupList>
      <Pagin></Pagin>
    </div>
  </template>
  
  <script>
  import SearchGroup from '../components/SearchGroup.vue';
  import GroupBox from '../components/GroupBox.vue';
  import GroupList from '../components/GroupList.vue';
  import Pagin from '../components/Pagin.vue';
  export default {
    components:{
        SearchGroup,
      GroupBox,
      GroupList,
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