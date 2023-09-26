
const validate = (data) =>{
    const regexSpecialCharacters = /^[a-zA-Z0-9]+$/
    const regexNumbers = /^[0-9]+$/ 
    const errors = {}

    if (!data.brand) {
        errors.brand = 'Please Complete this field'
    }else if(!regexSpecialCharacters.test(data.brand)){
        errors.brand = "This field can't contain any special character"
    }

    if (!data.model) {
        errors.model = 'Please Complete this field'
    }else if(regexSpecialCharacters.test(data.model)){
        errors.model = "This field can't contain any special character"
    }

    if (!data.domain) {
        errors.domain = 'Please Complete this field'
    }else if(data.domain.length !== 6 ){
        errors.domain = "The domain must have 6 characters"
    }

    if (!data.capacity) {
        errors.capacity = 'Please Complete this field'
    } else if (Number(data.capacity) < 1 || Number(data.capacity) > 8) {
        errors.capacity = "The capacity of the car must be between 1 and 8"
    } else if(regexNumbers.test(data.capacity)){
        errors.capacity = "Please, only type numbers in this field"
    }

    if (!data.pricePerDay) {
        errors.pricePerDay = 'Please Complete this field'
    } 

    return errors
}

export default validate