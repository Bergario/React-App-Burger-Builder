export const objectUpdate = (oldState, updateState) => {
  return {
    ...oldState,
    ...updateState,
  };
};

export const checkValidity = (value, validation) => {
  let isValid = true;
  if (validation.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (validation.maxLength) {
    isValid = value.length <= validation.maxLength && isValid;
  }
  if (validation.minLength) {
    isValid = value.length > validation.minLength && isValid;
  }
  if (validation.isEmail) {
    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    isValid = pattern.test(value) && isValid;
  }
  if (validation.isNumeric) {
    const pattern = /^\d{5}([\-]\d{4})?$/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};
