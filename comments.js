// create web server
// import express module
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// create a new route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Comments',
        comments: comments
    });
});

app.get('/new', (req, res) => {
    res.render('new', {
        title: 'New Comment'
    });
});

app.post('/new', (req, res) => {
    let comment = req.body.comment;
    comments.push(comment);
    fs.writeFile('comments.json', JSON.stringify(comments), 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/');
});

// create a new route
app.get('/delete', (req, res) => {
    res.render('delete', {
        title: 'Delete Comment',
        comments: comments
    });
});

app.post('/delete', (req, res) => {
    let comment = req.body.comment;
    comments = comments.filter((element) => {
        return element != comment;
    });
    fs.writeFile('comments.json', JSON.stringify(comments), 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/');
});

// create a new route
app.get('/edit', (req, res) => {
    res.render('edit', {
        title: 'Edit Comment',
        comments: comments
    });
});

app.post('/edit', (req, res) => {
    let oldComment = req.body.oldComment;
    let newComment = req.body.newComment;
    comments = comments.map((element) => {
        if (element == oldComment) {
            return newComment;
        }
        return element;
    });
    fs.writeFile('comments.json', JSON.stringify(comments), 'utf8', (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/');
});

// create a new route
app.get('/comments.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(comments));
});
