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

const cors =require('cors')


const app =express()
const port = 3000
const oneDay = 1000 * 60 * 60 * 24 
//synchronisation a la base de donnee embarque
sequelize.sync({force:true}).then( ()=>console.log('base de donnée pret'));

//session middleware

app.use("/public/data/uploads",express.static(path.join(__dirname,"/public/data/uploads")))
app.use(cookiesParser())
.use(session({
    secret:'key that will be secret',
    resave:false,
    saveUninitialized: false,
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




require('./src/routes/enregistrer_video_youtube')(app)        //  http://localhost:3000/api/creation/videoyoutube/:id   pour les videos youtubes


require('./src/routes/enregistrer_videos')(app)                 // http://localhost:3000/api/uploads/id


require("./src/routes/lister_image_id_formation")(app)         // http://localhost:3000/api/image/:id

require("./src/routes/liste_formation")(app)                   // http://localhost:3000/api/liste/formatioideo/:id  id de la formation  video a uploader

//require('./src/routes/enregistrer_images')(app)                 // http://localhost:3000/api/uploads/image/:id

require("./src/routes/enregistrer_pdf")(app)                    // http://localhost:3000/api/uploads/pdf/:id

 
require("./src/routes/lister_videos_id_formation")(app)        // http://localhost:3000/api/video/:id

require("./src/routes/modifier_formation")(app)                  // http://localhost:3000/api/formation/modifier/:id

//require("./src/routes/modifier_video_uploader")(app)            // http://localhost:3000/api/uploads/modifier/video/:id/:id_formation

require("./src/routes/modifier_videos")(app)                     // http://localhost:3000/api/video/modifier/:id

require("./src/routes/enregistrer_images_acceuil")(app)                 //  http://localhost:3000/api/uploads/imageacceuil

require("./src/routes/lister_images_acceuil")(app)                      //   http://localhost:3000/api/liste/imageacceuil


 

//point de terminaison  front eend 

require("./src/routes/liste_image_complet")(app)                // http://localhost:3000/api/liste/imagecomplet
require("./src/routes/idadminstrateur")(app)                    // http://localhost:3000/api/administrateur
            
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