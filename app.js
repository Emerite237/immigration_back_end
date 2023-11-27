const express = require('express')
const cookiesParser = require('cookie-parser')
const session = require('express-session')
const morgan =require('morgan')
const favicon=require('serve-favicon')
const bodyParser=require('body-parser')
const {sequelize} = require('./src/db/sequelize')
const ejs = require("ejs")
const path= require("path")
const expressJwt = require('express-jwt');
const privatekey=require('./src/db/auth/private_key');
const sequelizeSession = require('connect-session-sequelize')(session.Store)
require("dotenv").config();

const cors =require('cors')


const app =express()
const port = 3000
const oneDay = 1000 * 60 * 60 * 24 
//synchronisation a la base de donnee embarque
sequelize.sync({force:false}).then( ()=>console.log('base de donnée pret'));

//session middleware
global.isConnected = false;


app.use("/public/data/uploads",express.static(path.join(__dirname,"/public/data/uploads")))
app.use(cookiesParser())
.use(session({
    name: process.env.SESSION_NAME,
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false,
    cookie :{
        maxAge :  1000 * 60 * 60 * 24 * 7,
        secure: false,
    } ,
    store:new sequelizeSession({
        db:sequelize
    })
}))
.use(express.static(__dirname))

.use(morgan('dev'))
//.use(expressJwt({ secret: privatekey }).unless({ path: ['/api/login'] }))
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended:true}))
.use(cors({ origin: '*',
methods:"GET,POST,HEAD,PUSH,DELETE,PATCH,PUT" }));

//ici, nous placerons nos futurs points de terminaison. 


// point de terminaison des utilisateurs
require('./src/routes/connexion')(app)                                // http://localhost:3000/api/login  

require('./src/routes/creation_utilisateur')(app)                    //  http://localhost:3000/api/register

require("./src/routes/modifier_speudo")(app)                         // http://localhost:3000/api/utilisateur/modifier/speudo
 

// point de terminaison de l'administrateur
require('./src/routes/creation_formation')(app)                  // http://localhost:3000/api/creation/formation


require('./src/routes/envoismaildiffusion')(app)                // http://localhost:3000/api/sendmail/:id



require('./src/routes/supprimer_videos_upload')(app)                // http://localhost:3000/api/video/supprimer/:id  ici il faut donner l'identifiant de la video 


require('./src/routes/supprimer_pdf_uploader')(app)                // http://localhost:3000//api/pdf/supprimer/:id     ici il faut donner l'identifiant du pdf 


//equire('./src/routes/enregistrer_video_youtube')(app)        //  http://localhost:3000/api/creation/videoyoutube/:id   pour les videos youtubes


require('./src/routes/enregistrer_videos')(app)                 // http://localhost:3000/api/uploads/id


require("./src/routes/lister_image_id_formation")(app)         // http://localhost:3000/api/image/:id

require("./src/routes/liste_formation")(app)                   // http://localhost:3000/api/liste/formation

require('./src/routes/enregistrer_image')(app)                 // http://localhost:3000/api/uploads/image/:id

require("./src/routes/enregistrer_pdf")(app)                    // http://localhost:3000/api/uploads/pdf/:id

 
require("./src/routes/lister_videos_id_formation")(app)        // http://localhost:3000/api/video/:id

require("./src/routes/modifier_formation")(app)                  // http://localhost:3000/api/formation/modifier/:id

//require("./src/routes/modifier_video_uploader")(app)            // http://localhost:3000/api/uploads/modifier/video/:id/:id_formation

require("./src/routes/modifier_videos")(app)                     // http://localhost:3000/api/video/modifier/:id

//require("./src/routes/enregistrer_images")(app)                 //  http://localhost:3000/api/uploads/image

require("./src/routes/lister_images_acceuil")(app)                      //   http://localhost:3000/api/liste/imageacceuil

require("./src/routes/supprimer_formation")(app)                        //  http://localhost:3000/api/formation/supprimer/:id

  
require("./src/routes/listeformation_id")(app)                         //  http://localhost:3000/api/formation/:id
//point de terminaison  front end 

require("./src/routes/liste_image_complet")(app)                // http://localhost:3000/api/liste/imagecomplet
require("./src/routes/idadminstrateur")(app)                    // http://localhost:3000/api/administrateur
require("./src/routes/verification_connexion")(app)            //http://localhost:3000/api/verifier

            
//require('./src/routes/envoismaildiffusion')(app)

app.get('/', (req, res) => {

   //  res.send(console.log(req.session.utilisateur.nom))
 })

//On ajoute la gestion des erreurs 404
app.use(({res})=>{
    const message ='Impossible de trouver la ressource demandée! vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})

app.listen(port,()=>console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))