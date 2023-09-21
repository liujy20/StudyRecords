const initialState = {count: 12 };

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD":
      state.count += action.payload;
      return {...state};

    default:
      return state;
  }
}

export default reducer