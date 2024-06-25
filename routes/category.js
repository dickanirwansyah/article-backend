const express = require('express');
const connection = require('../connection');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authentication = require('../service/authentication');

router.post('/addNewCategory',authentication.authenticationToken,(req,res) => {
     let category = req.body;
     sqlQuery = "insert into category(name) values(?)";
     connection.query(sqlQuery,[category.name],(err,results) => {
          if(!err){
               return res.status(200).json({message: 'category is successfully created !'});
          }else{
               return res.status(500).json(err);
          }
     });
});

router.get('/getAllCategory', authentication.authenticationToken,(req,res) => {
     sqlQuery = "select id,name from category";
     connection.query(sqlQuery,(err,results) => {
          if (!err){
               return res.status(200).json(results);
          }else{
               return res.status(500).json(err);
          }
     });
});

router.post('/updateCategory',authentication.authenticationToken,(req,res) => {
     let category = req.body;
     var sqlQuery = "update category set name=? where id=?";
     connection.query(sqlQuery,[category.name, category.id],(err,results) => {
          if(!err){
               if (results.affectedRows == 0){
                    return res.status(404).json({message: 'category ID is not found !'});
               }else{
                    return res.status(200).json({message: 'category ID is successfully updated !'});
               }
          }else{
               return res.status(500).json(err);
          }
     });
});


module.exports = router;