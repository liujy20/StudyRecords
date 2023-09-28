import { defineStore } from "pinia";

export const userStore = defineStore("useStore", {
  state: () => {
    return {
      count: 1,
    };
  },
  getters: {
    getCount: (state) => {
      return state.count;
    },
  },
  actions: {
    addCount() {
      this.count++;
    },
  },
});
