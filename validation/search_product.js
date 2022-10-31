const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = validateSearchProductInput = data => {
    let errors = {};
    //Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.price = !isEmpty(data.price) ? data.price : 0;
    data.category = !isEmpty(data.category) ? data.category : "";

    //Title checks
    if (validator.isEmpty(data.title)) {
        errors.title = "Product name is required";
    }

    //Price checks
    if (validator.isEmpty(data.price)) {
        errors.price = "Price is required";
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