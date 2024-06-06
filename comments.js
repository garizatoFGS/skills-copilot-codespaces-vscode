// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// set the view engine to ejs
app.set('view engine', 'ejs');

// set the views to the views folder
app.set('views', './views');

// use body parser
app.use(bodyParser.urlencoded({ extended: false }));

// set the public folder to be accessible
app.use(express.static('public'));

// create a new route to the home page
app.get('/', (req, res) => {
    res.render('index');
});

// create a new route to the comments page
app.get('/comments', (req, res) => {
    // get the comments from the comments.json file
    let comments = JSON.parse(fs.readFileSync('comments.json'));

    // render the comments page and pass the comments array
    res.render('comments', { comments: comments });
});

// create a new route to the new comment page
app.get('/new', (req, res) => {
    res.render('new');
});

// create a new route to the post method
app.post('/new', (req, res) => {
    let comments = JSON.parse(fs.readFileSync('comments.json'));
    comments.push(req.body);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.redirect('/comments');
});

// listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});