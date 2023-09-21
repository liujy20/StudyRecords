const initialState = {
  list:[{key:'/home/main',name:'主页'}],
  aliveKey:'/home/main'
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADDTAB":
      console.log('ADDTAB');
      if(!state.list.find(item=>item.key===action.payload.key)){
        state.list.push(action.payload)
      }
      return {...state};
    case "DELTAB":
      console.log('DELTAB');
      state.list=state.list.filter(item=>{
        return item.key!==action.payload
      })
      return {...state};
    case "TOTAB":
      console.log('TOTAB');
      state.aliveKey=action.payload
      return {...state};

    default:
      return state;
  }
}

export default reducer