const validator = require("validator")


const validateUser = (params, res)=>{
    
    
    let validateName = !validator.isEmpty(params.name);
    let validateEmail = !validator.isEmpty(params.email);
    let validatePassword = !validator.isEmpty(params.password);

    if(!validateName || !validateEmail || !validatePassword){
        throw new Error ("no se ha validado la informacion")
    }

}

module.exports = {
    validateUser
}
