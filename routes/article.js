const express = require('express');
const connection = require('../connection');
const router = express.Router();
var authentication = require('../service/authentication');


router.post('/addNewArticle',authentication.authenticationToken,(req,res) => {
     let article = req.body;
     var sqlQuery = "insert into article (title,content,category_id,publication_date,article_status) values (?,?,?,?,?)";
     connection.query(sqlQuery,[article.title,article.content,article.category_id, new Date(), article.status],(err,results) => {
          if (!err){
               return res.status(200).json({message: 'new article is successfully created !'});
          }else{
               return res.status(500).json(err);
          }
     });
});

router.post('/updateArticle', authentication.authenticationToken, (req,res) => {
     let article = req.body;
     var sqlQuery = "update article set title=?,content=?,category_id=?,article_status=?,publication_date=? where id=?";
     connection.query(sqlQuery, [article.title, article.content, article.category_id, article.article_status, new Date(), article.id],(err,results) => {
          if (!err){
               if (results.affectedRows == 0){
                    return res.status(404).json({message: "sorry article not found !"});
               }else{
                    return res.status(200).json({message: "article is successfully updated !"});
               }
          }else{
               return res.status(500).json(err);
          }
     });
});

router.get('/getAllPublishArticle',(req,res) => {
     var sqlQuery = "select a.id, a.title, a.content, c.name as category_name, a.publication_date, a.article_status from article a join category c on a.category_id = c.id where a.article_status='publish' ";
     connection.query(sqlQuery,(err, results) => {
          if (!err){
               return res.status(200).json(results);
          }else{   
               return res.status(500).json(err);
          }
     });
});

router.get('/getAllArticle', authentication.authenticationToken, (req,res) => {
     var sqlQuery = "select a.id, a.title, a.content, c.name as category_name, a.publication_date, a.article_status from article a join category c on a.category_id = c.id";
     connection.query(sqlQuery, (err,results) => {
          if (!err){
               return res.status(200).json(results);
          }else{
               return res.status(500).json(err);
          }
     });
});

router.get('/deleteArticle/:id',authentication.authenticationToken, (req,res) => {
     const id = req.params.id
     var sqlQuery = "delete from article where id=?";
     connection.query(sqlQuery,[id],(err,results) => {
          if (!err){
               if (results.affectedRows == 0){
                    return res.status(404).json({message: "sorry article not found !"});
               }else{
                    return res.status(200).json({message: "article is successfully created !"});
               }
          }else{
               return res.status(500).json(err);
          }
     });
});

module.exports = router;