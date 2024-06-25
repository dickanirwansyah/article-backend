const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
var auth = require('../service/authentication');
const authentication = require('../service/authentication');


router.post('/addNewAppUser',auth.authenticationToken, (req, res) => {
     let user = req.body;
     sqlQuery = "select email,password,status from appuser where email=?";
     connection.query(sqlQuery, [user.email], (err, results) => {
          if (!err) {
               if (results.length <= 0) {
                    sqlQuery = "insert into appuser(name,email,password,status,is_deletable) values (?,?,?, 'false','true')";
                    connection.query(sqlQuery, [user.name, user.email, user.password], (err, results) => {
                         if (!err) {
                              return res.status(200).json({
                                   message: "Successfully registered !"
                              })
                         } else {
                              return res.status(500).json(err);
                         }
                    });
               } else {
                    return res.status(400).json({
                         message: "Email is already exists !"
                    });
               }
          } else {
               return res.status(500).json(err);
          }
     });
});


router.get('/getAllAppuser', auth.authenticationToken,(req,res) => {
     const tokenPayload = res.locals;
     var sqlQuery;
     if (tokenPayload.is_deletable === 'false'){
          sqlQuery = "select id, name, email, status from appuser where is_deletable = 'true'";
     }else{
          sqlQuery = "select id, name, email, status from appuser where is_deletable='true' and email !=?";
     }
     connection.query(sqlQuery,[tokenPayload.email],(err,results) => {
          if (!err){
               return res.status(200).json(results);
          }else{
               return res.status(500).json(err);
          }
     });
});

router.post('/updateUserStatus',authentication.authenticationToken,(req,res) => {
     let user = req.body;
     var sqlQuery = "update appuser set status=? where id=? and is_deletable='true'";
     connection.query(sqlQuery,[user.status,user.id],(err,results) => {
          if(!err){
               if (results.affectedRows == 0){
                    return res.status(404).json({message: 'appuser ID is not found !'});
               }else{
                    return res.status(200).json({message: 'appuser ID is successfully update !'})
               }
          }else{
               return res.status(500).json(err);
          }
     });
});

router.get('/checkToken', authentication.authenticationToken,(req,res) => {
     return res.status(200).json({message: 'true'});
});

router.post('/updateUser',authentication.authenticationToken,(req,res) => {
     let user = req.body;
     var sqlQuery = "update appuser set name=?, email=? where id=?";
     connection.query(sqlQuery, [user.name, user.email, user.id],(err,results) => {
          if (!err){
               if (results.affectedRows == 0){
                    return res.status(404).json({message: 'appuser ID is not found !'});
               }else{
                    return res.status(200).json({message: 'appuser ID is successfully update !'})
               }
          }else{
               return res.status(500).json(err);
          }
     });
})

router.post('/login', (req,res) => {
     const user = req.body;
     sqlQuery = "select email, password, status, is_deletable from appuser where email=?";
     connection.query(sqlQuery,[user.email],(err,results) => {
          if (!err){
               if (results.length <= 0 || results[0].password != user.password){
                    return res.status(403).json({message: "Incorrer email or password !"});
               }else if (results[0].status === 'false'){
                    return res.status(401).json({message: 'Wait for admin approval !'});
               }else if (results[0].password === user.password){
                    const response = {
                         email: results[0].email,
                         is_deletable: results[0].is_deletable
                    }
                    const accessToken = jwt.sign(response, process.env.SECRET_KEY, {expiresIn:'8h'});
                    return res.status(200).json({token: accessToken})
               }else{
                    return res.status(400).json({message: 'Failed login !'});
               }
          }else{
               return res.status(500).json(err);
          }
     });
});

module.exports = router;