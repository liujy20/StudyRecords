const initialState = {
  goods:[]
}

export default function reducer (state = initialState, { type, payload }) {
  switch (type) {

  case "GOODFINDALL":
    state.goods=payload
    // console.log('reducer',payload);
    return { ...state }

  default:
    return state
  }
}
