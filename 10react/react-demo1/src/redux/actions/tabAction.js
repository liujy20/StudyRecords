export const addTab = (val) => {
  return {
    type: "ADDTAB",
    payload: val,
  };
};
export const delTab = (val) => {
  return {
    type: "DELTAB",
    payload: val,
  };
};
export const toTab = (val) => {
  return {
    type: "TOTAB",
    payload: val,
  };
};
