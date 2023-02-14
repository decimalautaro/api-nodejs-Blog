const validator = require("validator")


const validateArticle  = (params, res)=>{
    
    
    let validarTitle = !validator.isEmpty(params.title);
    let validarContent = !validator.isEmpty(params.content);

    if(!validarContent || !validarTitle){
        throw new Error ("no se ha validado la informacion")
    }

}

module.exports = {
    validateArticle
}

