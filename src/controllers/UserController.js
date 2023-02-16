const User = require("../models/Users");
const { validateUser } = require("../helpers/validate-user");


const create = (req, res) =>{
    const params = req.body;

    try{
        
        validateUser(params)

    }catch (error) {
        return res.status(400).json({
            status:"error",
            message: "faltan datos por enviar"
        })
    }

    const user = new User(params);
    user.save((error)=>{
        if(error || !user){
            return res.status(404).json({
                status:"error",
                message: "no se ha guardado el usuario"
            })
        }
    })

    return res.status(200).json({
        status: "success",
        user: user,
        message: "Usuario creado con exito"

    })
}

const getAll = (req, res) =>{
    const consulta = User.find({}).sort({date:-1}).exec((error, users)=>{
        if(error || !users){
            return res.status(404).json({
                status:"error",
                message: "no se han encontrado usuarios"
            })
        }

        return res.status(200).send({
            status:"success",
            users

        })
    })
}

const getById = (req, res)=>{
    const {id} = req.params
    User.findById(id, (error,user)=>{

        if(error || !user){
            return res.status(404).json({
                status:"error",
                message: "no se ha encontrado el usuario"
            })
        }
        res.status(200).json({
            status: "success",
            user
        })

    })
}
const remove = (req, res)=>{
    const { id } = req.params;
    User.findOneAndDelete({_id : id}, (error,userRemove)=>{
        if(error || !userRemove){
            
        return res.status(500).json({
            status:"error",
            user: userRemove,
            message: "error al borrar el usuario"
        })
        }


        return res.status(200).json({
            status:"success",
            user: userRemove,
            message: "Usuario borrado"
        })
    }) 
}

const edit = (req, res) =>{
    const { id } = req.params;
    const params= req.body;

    try{
        
        validateUser(params)
        
    }catch (error) {
        return res.status(400).json({
            status:"error",
            message: "faltan datos por enviar"
        })
    }
    
    User.findOneAndUpdate({_id : id}, params, {new: true}, (error, userUpdate)=>{
        
        if(error || !userUpdate){
            return res.status(500).json({
                status: "error",
                message: "error al actualizar el usuario"
            })
        }
        
        return res.status(200).json({
            status: "success",
            user: userUpdate
        })

    })


}

module.exports = {
    create,
    getAll,
    getById,
    remove,
    edit
}