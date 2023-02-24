const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.set('strictQuery', false);


mongoose.connect('mongodb://localhost/blog' , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


// mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_URL, () => {
//     console.log("Connected to MongoDB");
// });
/*
mongoose.connect('mongodb://127.0.0.1:27017/test').
    catch(error => handleError(error));   */       

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended : false }))

app.use(methodOverride('_method'))

app.get('/' , async (req,res) => {
    const articles = await Article.find().sort({ createdAt : 'desc' })
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000)