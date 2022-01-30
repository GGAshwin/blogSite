require('dotenv').config()
//sudo lsof -iTCP -sTCP:LISTEN -n -P
//modules
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bodyParser = require('body-parser');
const Post = require('./database/models/Post');
const { find } = require('./database/models/Post');

app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect(process.env.database_url,{ useNewUrlParser: true })

const db=mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('connected to database'))

app.get('/',(req,res)=>{
    res.render('index')
})

// Post.remove({},(err)=>{
//     console.log("deleted all")
// })

app.get('/blog', async (req, res) => {
    const posts = await Post.find({})
    // console.log(posts[0].id)
    res.render('blog', {data:posts})
});

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.get('/post/:id',async(req,res)=>{
    const post = await Post.findById(req.params.id)
    console.log(post)
    res.render('post', {data:post})
})

app.post('/posts/store', (req, res) => {
    Post.create(req.body, (error, post) => {
        res.redirect('/blog')
    })
});

app.listen('6969')