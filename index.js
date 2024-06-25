const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const appuserRoutes = require('./routes/appuser');
const appCategoryRoutes = require('./routes/category');
const appArticleRoutes = require('./routes/article');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/appuser/',appuserRoutes);
app.use('/appcategory',appCategoryRoutes);
app.use('/apparticle',appArticleRoutes);

module.exports = app;