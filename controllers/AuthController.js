const knex = require('../database/connections');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.login = (req, res) => {
  res.render('auth/login', { layout: 'auth' });
}

exports.register = (req, res) => {
  res.render('auth/register', { layout: 'auth' });
}

exports.password = (req, res) => {
  res.render('auth/reset-password', {layout: 'auth'});
}

exports.resetPassword = (req,res) =>{

    const userData= {
      useremail: req.body.email
    }

    console.log("USEREMAIL", userData.useremail);

  knex('userRol').select().where('email', userData.useremail).then((userResetPassword) =>{
    if(userData.useremail == userResetPassword[0].email){
      console.log("LO ENCONTRE", userResetPassword);
      let token = jwt.sign({
        usuario: userResetPassword
      }, 'seed-reset-password', {expiresIn: 60*60*24}); //Expira en 24 horas

      let url = 'http://localhost:3000/auth/reset_password?token='+token;

      let dataUrl = {
        urlPassword: url
      }

      console.log("URL RESET PASSWORD",dataUrl);
      res.status(200).render('auth/reset-password',{layout: 'auth', url: url});;
    }else{
      res.status(200).render('auth/reset-password',{layout: 'auth', error: 'Error'});;
      console.log('Error');
    }
    
  })
  .catch((error)=>{
    return res.status(422).render('auth/reset-password', {layout: 'auth', error: 'No encontramos tu dirección de correo'});
      console.log(error);
  })

}

//Create NEW user
exports.registerUser = (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/register', {layout: 'auth', errors: errors.array()});
  }

  const userData= {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10) ,
      rol: req.body.rol
  }

  if(!userData.name || !userData.email || !userData.password){
      return res.status(400).json({msg: 'Ingresa todos los datos'});
  }else{
      knex('userRol').insert(userData).then((user) => {
          //res.redirect('/');
          //res.status(200).render('homepage/index',{layout: 'main', user: user});;
      })
      .catch((error) => {
          res.status(500).json({ error });
      });

      knex('userRol').select().where('email', userData.email).then((userLogin) =>{
          let token = jwt.sign({
            usuario: userLogin
          }, 'seed-de-desarrollo', {expiresIn: 60*60*24*30});
    
          req.session.userData= userLogin;
          req.session.userToken= token;
    
          console.log("Usuario", req.session.userData);
          console.log("TOKEN ",req.session.userToken);
          //res.redirect('/');
          res.status(200).render('homepage/index',{layout: 'main', user: user});;
      })
      .catch((error)=>{
          res.status(500).json({error});
          console.log(error);
      })


  }
};

//Get User Login
exports.getUser = (req, res) => {

  const user= {
      useremail: req.body.email,
      password: req.body.password
  }

  knex('userRol').select().where('email', user.useremail).then((userLogin) =>{
    if(bcrypt.compareSync(user.password, userLogin[0].password)){

      let token = jwt.sign({
        usuario: userLogin
      }, 'seed-de-desarrollo', {expiresIn: 60*60*24*30});

      console.log('Sí existe');

      req.session.userData= userLogin;
      req.session.userToken= token;

      console.log("Usuario", req.session.userData);

      console.log("TOKEN ",req.session.userToken);
      //res.redirect('/');
      res.status(200).render('homepage/index',{layout: 'main', user: req.session.userData});;

    }else{
      console.log('Error');
    }
    
    //res.status(200).render('info', {data: userLogin});;
    //console.log(student);
  })
  .catch((error)=>{
      res.status(500).json({error});
      console.log(error);
  })
  
};