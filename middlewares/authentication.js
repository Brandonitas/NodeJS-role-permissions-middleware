const knex = require('../database/connections');
const jwt = require('jsonwebtoken');

//Middleware permissions routes
module.exports = (userRol)=>{
    return (req, res, next) => {
        
        let token = req.session.userToken;
        let userData = req.session.userData;

        jwt.verify(token, 'seed-de-desarrollo', (err, decoded) =>{
            if(err){
                res.redirect('/register');
                return res.status(401);
            }

            req.usuario = decoded.usuario;
            let rol = req.usuario[0].rol;
            console.log("ROLLLL", rol);

           
            if(userRol.includes(rol)){
                next();
            }else{
                res.status(403).render('error',{layout: 'main', user: req.usuario});;
                console.log("No tienes permisos");
            }

        });
      
        };   
};


