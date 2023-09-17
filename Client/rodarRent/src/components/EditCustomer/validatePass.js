const validatePass = (data) => {
const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

const errors = {};

  if (data.password) {
    if (!regexPass.test(data.password)) {
      errors.passwordMsj = "The password must have at least 6 characters, an uppercase letter, a lowercase letter, and a number";
    }
    if (!data.repeatPass) {
      errors.repeatPass = "(*)";
    } else if (data.password !== data.repeatPass) {
      errors.repeatPassMsj = "Both passwords must be the same";
    }
  }
return errors;

}

export default validatePass;