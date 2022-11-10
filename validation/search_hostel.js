const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = validateSearchHostelInput = data => {
    let errors = {};
    //Convert empty fields to an empty string so we can use validator functions
    data.city = !isEmpty(data.city) ? data.city : "";
    data.category = !isEmpty(data.category) ? data.category : "";


    //city checks
    if (validator.isEmpty(data.city)) {
        errors.city = "City field is required";
    }

    //Category Checks
    if (validator.isEmpty(data.category)) {
        errors.category = "Category field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};