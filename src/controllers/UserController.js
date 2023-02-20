const { encrypt, compare } = require ("../utils/handlePassword")
const { tokenSign } = require("../utils/handleJWT")
const { handleHttpError } = require("../utils/handleError");
const  User = require("../models/Users");

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

const login = async (req, res) => {
  try{
    const params = req.body
    const user = await User.findOne({email: params.email})

    if(!user){
      handleHttpError(res, "El usuario no existe.", 404);
      return
    }

    const hashPassword = user.get('password');

    const check = await compare(params.password, hashPassword)

    if(!check){
      handleHttpError(res, "Password incorrecta.", 401);
      return
    }
    user.set("password", undefined, {strict: false})
    const data = {
      token: await tokenSign(user),
       user
    }

    res.send({data})


  }catch(e){
    console.log(e)
    handleHttpError(res, "Error al logear.")
  }

}


module.exports = {
    register,
    login
}