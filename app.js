
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const chalk = require('chalk')
const contactsRoute = require('./router')
const app = express()

app.set('view engine', 'ejs')  // set view engine by ejs

app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))  // to accept form data
app.use(express.json())  // to accept json data


// create schema

let testSchema = new mongoose.Schema({
    name: String
})
let Test = mongoose.model('Test', testSchema)


// use routers
app.use('/contacts', contactsRoute)
app.get('/', (req, res) => {
    let test = new Test({
        name: "Md. Lokman Hossen"
    })
    test.save()
        .then(t => {
            res.json(t)
        })
        .catch(e => {
            console.log(e)
            res.status(500).json({ error: "error occured" })
        })
    // let posts = [
    //     {
    //         title : "Post 1",
    //         description: "Post description",
    //         published: true
    //     },
    //     {
    //         title : "Post 2",
    //         description: "Post description",
    //         published: true
    //     },
    //     {
    //         title : "Post 3",
    //         description: "Post description",
    //         published: true
    //     },
    // ]
    // res.render('pages/index', {'title': "Learning EJS :_)", posts: posts})
})
app.get('/about', (req, res) => {
    res.render('pages/about', {'title': "This is about page"})
})
app.get('/contact', (req, res) => {
    res.render('pages/contact', {'title': "This is contact page"})
})

app.get('*', (req, res) => {
    res.send('<h1>404 Page not found</h1>')
})
const DB_URI = 'mongodb://localhost:27017/contact_list'
const PORT = process.env.PORT || 8080
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log(chalk.green("DB connected"))
        app.listen(PORT, () => {
            console.log(chalk.green(`Server running on ${PORT}`))
        })        
    })
    .catch(e => console.log(e))

