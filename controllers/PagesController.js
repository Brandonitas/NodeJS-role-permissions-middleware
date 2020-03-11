const knex = require('../database/connections');

exports.dashboard = (req, res) => {
    res.render('dashboard');
}

exports.users = (req, res) => {
    knex('userRol').select().then((user) =>{
        res.status(200).render('users', {data: user});;
    })
    .catch((error)=>{
        res.status(500).json({error});
    })
}

exports.error = (req, res) => {
    res.render('error');
}


  
  
  