const { Video }= require('../db/sequelize')
const {ValidationError}=require('sequelize')
const cors=require("cors")

module.exports =(app) =>{
    app.put('/api/video/modifier/:id', cors(),(req,res) =>
    {
        const id= parseInt(req.params.id)

      Video.update(req.body,{
            where: {id_Videos: id}

        })
        .then(_=>{
          return Video.findByPk(id).then(Videos => {
                if(Videos===null)
                {
                    
                    const message="le Videos n'existe pas "
                        res.status(404).json({message}) 
                    
                }
                const message='le Videos a bien ete modifie.'
                res.json({Videos})
            })
        
            }).catch(error =>{
                const message="le Videos n'a pas pue etre modifier,reesayer dans quelques instant"
                res.status(500).json({message,data: error}) 
                console.log(error)
            }).catch(error => {
                if(error instanceof ValidationError ){
                return res.status(400).json({message: error.message,data: error})
               }
               if(error instanceof UniqueConstraintError){
                return res.status(400).json({message: error.message})
               }

             
               res.status(500).json({message, data:error})
               
            })
        })
    }