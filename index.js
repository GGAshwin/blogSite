require('dotenv').config()
//sudo lsof -iTCP -sTCP:LISTEN -n -P
//modules
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bodyParser = require('body-parser');
const Post = require('./database/models/Post');
const port = process.env.PORT || 3000
app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// mongoose.connect("mongodb://localhost/blog",{ useNewUrlParser: true })

// const db=mongoose.connection
// db.on('error',(error)=>console.error(error))
// db.once('open',()=>console.log('connected to database'))




const url = `mongodb+srv:/<username:password>@cluster0.cjcyr.mongodb.net/blogDB?retryWrites=true&w=majority`;
// =======
// const url = `mongodb+srv://<user:pass>@cluster0.cjcyr.mongodb.net/blogDB?retryWrites=true&w=majority`;
// >>>>>>> 458bc87ad1966e3ccd7d631589a16a29a24fb403

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to the database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })


app.get('/',(req,res)=>{
    res.render('index')
})

// Post.remove({})

// Post.remove({},(err)=>{
//     console.log("deleted all")
// })

app.get('/blog', async (req, res) => {
    const posts = await Post.find({}).sort({ date: -1 })
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
    console.log(req.body);
    Post.create(req.body, (error, post) => {
        res.redirect('/blog')
    })
});

app.post('/blog/:id',(req,res)=>{
    // delete article
    const id=req.params.id
    Post.findByIdAndDelete(id,(err)=>{
        if(err) throw err
        res.redirect('/blog')
    })
})

app.listen(port)
