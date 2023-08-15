<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>{{$store.getters.getUser}}</h1>
    <button @click="$store.commit('changeUser',{name:'dwg',age:20})">修改user</button>
    <button @click="$store.dispatch('getInfo')">异步修改user</button>
  </div>
</template>
