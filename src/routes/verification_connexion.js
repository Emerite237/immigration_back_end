


module.exports= (app) => {

    app.get('/api/verifier',(req,res)=>{
           
            return res.json({isconnected: global.isConnected})
        }
    )

    } 
