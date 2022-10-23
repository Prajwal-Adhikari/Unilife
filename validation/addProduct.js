const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = validateAddProductInput = data => {
    let errors = {};
    //Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.productby = !isEmpty(data.productby) ? data.productby : "";
    data.price = !isEmpty(data.price) ? data.price : "";
    data.imagepath = !isEmpty(data.imagepath) ? data.imagepath : "";
    data.category = !isEmpty(data.category) ? data.category : "";
    data.description = !isEmpty(data.description) ? data.description : "";

    //Title Checks
    if (validator.isEmpty(data.title)) {
        errors.title = "Title field is required";
    }

    //Productby Checks
    if (validator.isEmpty(data.productby)) {
        errors.productby = "Productby field is required";
    }

    //Price Checks
    if (validator.isEmpty(data.price)) {
        errors.price = "Price field is required";
    }

    //Category Checks
    if (validator.isEmpty(data.category)) {
        errors.category = "Category field is required";
    }

    //Description Checks
    if (validator.isEmpty(data.description)) {
        errors.description = "Description field is required";
    }

    //Imagepath Checks
    if (validator.isEmpty(data.imagepath)) {
        errors.imagepath = "Imagepath field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};