const User = require("../models/Users");
const { encrypt, compare } = require ("../utils/handlePassword")
const { tokenSign } = require("../utils/handleJWT")

const register = async(req, res) =>{
    const params = req.body;
    const passwordHash = await encrypt(params.password);
    const body = {...params , password:passwordHash};
    

    const dataUser = await User.create(body);
    dataUser.save((error)=>{
        if(error || !dataUser){
            return res.status(404).json({
                status:"error",
                message: "no se ha guardado el usuario"
            })
        }
    })

    const data = {
        token: await tokenSign(dataUser),
        user: dataUser 
    }

    return res.status(200).json({
        status: "success",
        user: data,
        message: "Usuario creado con exito"

    })
}

module.exports = {
    register,
}