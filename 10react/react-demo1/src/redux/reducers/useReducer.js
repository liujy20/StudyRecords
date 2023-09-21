const initialState = { name: "xwg"};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE":
      state.name = action.payload;
      return {...state};

    default:
      return state;
  }
}

export default reducer