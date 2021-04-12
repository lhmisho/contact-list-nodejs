
const express = require('express')
const morgan = require('morgan')
const contactsRoute = require('./router')
const app = express()

app.set('view engine', 'ejs')  // set view engine by ejs

app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))  // to accept form data
app.use(express.json())  // to accept json data


// use routers
app.use('/contacts', contactsRoute)
app.get('/', (req, res) => {
    let posts = [
        {
            title : "Post 1",
            description: "Post description",
            published: true
        },
        {
            title : "Post 2",
            description: "Post description",
            published: true
        },
        {
            title : "Post 3",
            description: "Post description",
            published: true
        },
    ]
    res.render('index', {'title': "Learning EJS :_)", posts: posts})
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
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})
    
