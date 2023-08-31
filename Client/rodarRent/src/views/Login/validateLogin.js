const validate = (data) => {
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexPass =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  const errors = {};
  if (!data.email) {
    errors.email = "Email is required";
  }
  if (!regexEmail.test(data.email)) {
    //FORMATO REGULAR PARA VER SI CUMPLE CON EL FORMATO EMAIL
    errors.email = "It must be an email";
  }
  if (!data.password) {
    errors.password = "Password is required";
  }
  /*if (!regexPass.test(data.password)) {
    errors.password = "The password must have at least 6 characters, an uppercase letter, a lowercase letter and a number";
  }*/
  return errors;
};

export default validate
