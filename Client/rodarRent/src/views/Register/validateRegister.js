const validateRegister = (data) => {
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexPass =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  const errors = {};
  if (!data.name) {
    errors.name = "(*)";
  }
  if (!data.lastName) {
    errors.lastName = "(*)";
  }
  if (!data.email) {
    errors.email = "(*)";
  } else if (!regexEmail.test(data.email)) {
    //FORMATO REGULAR PARA VER SI CUMPLE CON EL FORMATO EMAIL
    errors.emailMsj = "It must be an email";
  }
  if (!data.phoneNumber) {
    errors.phoneNumber = "(*)";
  }
  if (!data.personalId) {
    errors.personalId = "(*)";
  }
  if (!data.birthDate) {
    errors.birthDate = "(*)";
  }
  if (!data.country) {
    errors.country = "(*)";
  }
  if (!data.city) {
    errors.city = "(*)";
  }
  if (!data.address) {
    errors.address = "(*)";
  }
  if (!data.zipCode) {
    errors.zipCode = "(*)";
  }
  if (!data.password) {
    errors.password = "(*)";
  }
  else if (!regexPass.test(data.password)) {
    errors.passwordMsj = "The password must have: At least 6 characters, An uppercase letter and a number";
  }
  if (!data.repeatPass) {
    errors.repeatPass = "(*)";
  }
  else if (data.password !== data.repeatPass) {
    errors.repeatPassMsj = "Both passwords must be the same";
  }
  return errors;
};

export default validateRegister
