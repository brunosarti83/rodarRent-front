
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
    }

    if (!data.domain) {
        errors.domain = 'Please Complete this field'
    }else if(data.domain.length !== 7 ){
        errors.domain = "The domain must have 7 characters"
    }

    if (!data.passengers) {
        errors.passengers = 'Please, Complete this field.'
    } else if((Number(data.passengers < 1)) || (Number(data.passengers) > 8)){
        errors.passengers = 'The number must be between 1 and 8.'
    } else if(!regexNumbers.test(data.passengers)){
        errors.passengers = 'Please, only type numbers in this field.'
    }

    if (!data.pricePerDay) {
        errors.pricePerDay = 'Please Complete this field'
    } 

    return errors
}

export default validate