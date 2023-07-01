const express=require('express');
const fs=require("fs");
const app=express();
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
var message;
    
    app.get('/login',(req,res,next)=>{

    const htmldata=`<html><body><form action="/" method="GET" onsubmit="saveLocal()">
    Username: <input type="text" name="username" id="username">
    <button>Login</button>
    </form>
        <script>
        function saveLocal(){
        //    alert(document.getElementById("username").value);
        localStorage.setItem("username",document.getElementById("username").value);
        }
        </script>
    </body></html>`

    res.send(htmldata);

    })
    app.post("/",(req,res,next)=>{
      
        console.log("post request body=",req.body)
        console.log('username=',req.body.username);
        console.log('message=',req.body.message);
        
        fs.writeFileSync('message.txt','<p>'+`${req.body.username}:${req.body.message}`+'</p>\n',{
  
          encoding: "utf8",
          flag: "a+",
          mode: 0o666
        
      });
        res.redirect('/');
    });


    app.get("/",(req,res,next)=>{
        console.log("get method called");
      try {
         let data = fs.readFileSync('message.txt', 'utf8');
          //console.log(data);
          message=data;
  
      }catch (err) {
          //console.error(err);
          message="no chat found";
        }
   
        const html=`<html>
            
          <body><p>${message}</p>
          <form action='/' onsubmit="sendData()" method="POST">
          <input type="text" name="message" id="message">
          <input type="hidden" name="username" id="username" >
          <button type="submit">send message</button></form> 
          <script>
            function sendData(){  
          document.getElementById("username").value=localStorage.getItem("username");
          //alert(document.getElementById("username").value);
        }
          </script>
          </body></html>`;
  
          res.send(html);
  
  })

app.listen(3000);