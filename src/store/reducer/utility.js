export const objectUpdate = (oldState, updateState) => {
  return {
    ...oldState,
    ...updateState,
  };
};
