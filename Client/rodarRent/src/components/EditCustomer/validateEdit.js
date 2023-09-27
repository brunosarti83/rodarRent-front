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
  if (!data.phoneNumber || data.phoneNumber==='n/a') {
    errors.phoneNumber = "(*)";
  }
  if (!data.personalId) {
    errors.personalId = "(*)";
  }
  if (!data.birthDate) {
    errors.birthDate = "(*)";
  }
  if (!data.country || data.country==='n/a') {
    errors.country = "(*)";
  }
  if (!data.city || data.city==='n/a') {
    errors.city = "(*)";
  }
  if (!data.address || data.address==='n/a') {
    errors.address = "(*)";
  }
  if (!data.zipCode || data.zipCode==='n/a') {
    errors.zipCode = "(*)";
  }


  return errors;
};

export default validateEdit;