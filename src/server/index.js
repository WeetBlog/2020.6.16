const express = require('express');
const fs = require('fs');
const app = express();
const ejs = require('ejs');
const qs = require('querystring');

let sweet = {} ;

fs.readFile("../data/sweet1.json",(err,data)=>{
    sweet = JSON.parse(data);
})

app.get('/sweet/userinfo',(req,res)=>{
    fs.readFile("../data/sweet1.json",(err,data)=>{
        sweet = JSON.parse(data);
    })
    res.setHeader("Access-Control-Allow-Origin","*")
    res.send(sweet)
})

app.get('/sweet/add',(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    let data = req.query.sweet
    console.log(data);

    if(data){
        fs.writeFile('../data/sweet1.json',data,function(err){
            if(err){
                console.log("写入失败")
            }
        })
    }
    res.end('pass'); 
});

// app.get('/sweet/images/*',(req,res)=>{
//     res.send("." + req.url );
// })

app.listen(8080,()=>{
    console.log('服务8080已经开启.......');
});





// let user = {} ;

// fs.readFile(__dirname+"/user.json",(err,data)=>{
//     user = JSON.parse(data);
// })

// app.get('/reg-page',(req,res)=>{
//     res.sendFile(__dirname+"/register.html");
// });
// app.post('/register',(req,res)=>{
//     let body = "";
//     let acc = "";
//     req.on('data',chunk=>{
//         body += chunk ;
//     });
//     req.on('end',()=>{
//         acc = qs.parse(body).acc;
//         for(let i = 0 ; i<user.user.length ; i++){
//             console.log(acc);
//             // console.log(user.user[i].username);
//             // console.log( acc === user.user[i].username);
//             if(acc == user.user[i].username){
//                 res.end("× The account already exists");
//                 return;
//             }
//         }
//         res.end('pass'); 
//     });
    
// });

// app.get('/login',(req,res)=>{
//     let acc = req.query.acc ;
//     let pass = req.query.pass ;
//     user.user.push({
//         "username" : acc ,
//         "password" : pass
//     });
//     ejs.renderFile(__dirname+'/user.html',{user:user.user},(err,str)=>{
//         if(err){
//            res.status = 500 ;
//            res.setHeader('content-type','text/html;charset=utf-8');
//            res.end('<h1> Server Internal Error </h1>')
//            return ;
//         }
//         res.end(str);
//      })
// })