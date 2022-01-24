const express=require('express')
const app=express()

app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs')

app.get('/blog',(req,res)=>{
    res.render('blog')
})

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen('6969')