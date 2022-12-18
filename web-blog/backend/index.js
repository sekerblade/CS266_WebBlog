const express = require('express');
const app = express();
const router = express.Router();

const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser");
app.use(cors());
// app.use(express.json());
// // app.use(require('connect').bodyParser());
// app.use(bodyParser.urlencoded({
//     extended: true
//  }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// var jsonParser = bodyParser.json();

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "blog"
})

router.post('/posts', (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let email = req.body.email;
    let origin = req.headers.origin;
    console.log(req.body);
    console.log(origin);
    db.query('INSERT INTO `post`(`title`,`content`,`postby`) VALUES (?,?,?)',[title,content,email],(err,result)=> {
        if(err){
            console.log(err);
        }else{
    res.send(`<script> alert(' posted successfully ');window.location.href="${origin}/src/html/home.html";</script>`);
            // res.sendStatus(200);
        }
    })
})

router.get('/postsandcomments', (req, res) => {
    // get all posts and comments group by post id
    db.query('SELECT * FROM post as p order by p.like DESC', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(result);
            db.query('SELECT Distinct c.* FROM comments as c,post order by post.like desc', (err, result2) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result2);
                    const posts = result.map(post => {
                        return {
                            postby: post.postby,
                            pid: post.pid,
                            title: post.title,
                            content: post.content,
                            like : post.like,
                            dislike : post.dislike,
                            comments: result2.filter(comment => comment.pid === post.pid)
                        }
                    });
                    res.send(posts);
                }
            })
        }
    })
})


router.post('/comments', (req, res) => {
    // get post id from request body
    let pid = req.body.pid;
    let content = req.body.comment;
    let commentby = req.body.commentby
    let origin = req.headers.origin;
    console.log(req.body);
    console.log(origin);
    db.query('INSERT INTO `comments`(`commentuser`,`pid`,`commentby`) VALUES (?,?,?)',[content,pid,commentby],(err,result)=> {
        if(err){
            console.log(err);
        }else{
    res.send(`<script> alert (' commented successfully ');window.location.href="${origin}/src/html/home.html";</script>`);
        }
    })
})

router.post('/like', (req, res) => {
    // get post id from request body
    let pid = req.body.pid;
    let origin = req.headers.origin;
    console.log(req.body);
    console.log(origin);
    db.query('UPDATE `post` SET `like` = `like` + 1 WHERE `pid` = ?',[pid],(err,result)=> {
        if(err){
            console.log(err);
        }else{
            // swalfire
           res.sendStatus(200); 
        }
    })
})

router.post('/dislike', (req, res) => {
    // get post id from request body
    let pid = req.body.pid;
    let origin = req.headers.origin;
    console.log(req.body);
    console.log(origin);
    db.query('UPDATE `post` SET `dislike` = `dislike` + 1 WHERE `pid` = ?',[pid],(err,result)=> {
        if(err){
            console.log(err);
        }else{
            // swalfire
           res.sendStatus(200); 
        }
    })
})

// for use import img and css file in html
app.use(express.static(__dirname));
app.engine('html', require('ejs').renderFile);


app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');