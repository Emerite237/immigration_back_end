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


//point de terminaison des repertoires
require('./src/routes/creation_repertoire')(app);                     //http://localhost:3000/api/creation/abonnement
require('./src/routes/lister_images_id_repertoire')(app);                     //http://localhost:3000/api/imagepayante/id pour avoir les images associer a un repertoire 
 
require("./src/routes/liste_des_repertoires")(app)                     //http://localhost:3000/api/liste/repertoire


//point de terminaison d' abonnement
 require('./src/routes/creation_abonnement')(app);                     //http://localhost:3000/api/creation/abonnement

 require("./src/routes/listeabonnement")(app)                            //http://localhost:3000/api/liste/abonnement

 require("./src/routes/modifier_abonnement")(app)                        //http://localhost:3000/api/abonnement/modifier/id
   
 require("./src/routes/supprimer_abonnement")(app)                      //http://localhost:3000/api/abonnement/supprimer/id


// point de terminaison des utilisateurs
require('./src/routes/connexion')(app)                                // http://localhost:3000/api/login  

                                                                         // http://localhost:3000/api/admin/logout  

                                                                        // http://localhost:3000/api/logout


require('./src/routes/creation_utilisateur')(app)                    //  http://localhost:3000/api/register

require("./src/routes/modifier_speudo")(app)                         // http://localhost:3000/api/utilisateur/modifier/speudo
 

// point de terminaison des formations
require('./src/routes/creation_formation')(app)                  // http://localhost:3000/api/creation/formation

require("./src/routes/liste_formation")(app)                   // http://localhost:3000/api/liste/formation

require("./src/routes/supprimer_formation")(app)                        //  http://localhost:3000/api/formation/supprimer/:id

require("./src/routes/modifier_formation")(app)                  // http://localhost:3000/api/formation/modifier/:id

require("./src/routes/liste_formation_payés")(app)                  // http://localhost:3000/api/liste/formation_paye  pour avoir la liste des formation pour lesqu'elle un utilisateur s'est abonne 

  
require("./src/routes/listeformation_id")(app)                         //  http://localhost:3000/api/formation/:id

//point de terminaison des emails 
require('./src/routes/envoismaildiffusion')(app)                // http://localhost:3000/api/sendmail/:id



//points de terminaison des videos 
require('./src/routes/supprimer_videos_upload')(app)                // http://localhost:3000/api/video/supprimer/:id  ici il faut donner l'identifiant de la video 

require('./src/routes/enregistrer_videos')(app)                 // http://localhost:3000/api/uploads/id


require("./src/routes/modifier_videos")(app)                     // http://localhost:3000/api/video/modifier/:id
 
require("./src/routes/lister_videos_id_formation")(app)        // http://localhost:3000/api/video/:id


// points de terminaison des pdfs
require('./src/routes/supprimer_pdf_uploader')(app)                // http://localhost:3000//api/pdf/supprimer/:id     ici il faut donner l'identifiant du pdf 

require("./src/routes/enregistrer_pdf")(app)                    // http://localhost:3000/api/uploads/pdf/:id




//point de terminaisons des images 
require("./src/routes/lister_image_id_formation")(app)         // http://localhost:3000/api/image/:id


require('./src/routes/enregistrer_image')(app)                 // http://localhost:3000/api/uploads/image/:id


require("./src/routes/lister_images_acceuil")(app)                      //   http://localhost:3000/api/liste/imageacceuil




//point de terminaison  front end 

require("./src/routes/liste_image_complet")(app)                // http://localhost:3000/api/liste/imagecomplet
require("./src/routes/idadminstrateur")(app)                    // http://localhost:3000/api/administrateur
require("./src/routes/verification_connexion")(app)            //http://localhost:3000/api/verifier  permet de verifier si l'utilisateur est connecter ou pas 
require("./src/routes/liste_adresse_mail")(app)                //http://localhost:3000/api/liste/adresse_mail  pour avoir la liste des adresse mail 
require("./src/routes/liste_titre_formation")(app)              //http://localhost:3000/api/liste/titre_formation  pour avoir la liste des titres des formations 
            
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