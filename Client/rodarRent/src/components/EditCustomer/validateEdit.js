const validateEdit = (data) => {
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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



  return errors;
};

export default validateEdit;

