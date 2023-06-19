const fs=require("fs");

const requestHandler=(req,res)=>{
    const url=req.url;
    const method=req.method;
    var message;
    if(url==='/'){
     
try {
    const data = fs.readFileSync('message.txt', 'utf8');
    console.log(data);
    message=data;
  } catch (err) {
    console.error(err);
    message="undefined";
  }

//        console.log("fildata data="+message);
        
        res.write('<html>');
        res.write('<head><title>form</title></head>');
        res.write('<body>');
        res.write('<p>')
        res.write(message);
        res.write('</p>')
        res.write('<form action="message" method="POST"><input type="text" name="message"></input><button>send</button></form>');
     res.write('</html>');
    return res.end();

}
    
if(url==='/message' && method==='POST'){
    //console.log("inside if");
   const body=[];
   req.on('data',(chunk)=>{
    console.log(chunk);
    body.push(chunk);
   });

   req.on('end',()=>{
    const parsedbody=Buffer.concat(body).toString();
    const message=parsedbody.split('=')[1];
    //console.log("third message: "+message);
    fs.writeFileSync('message.txt',message);
   
   });
   
   res.statusCode=302;
   res.setHeader('Location','/');
   return res.end();

}
};

/*module.exports={
    handler:requestHandler
}*/


//module.exports.handler=requestHandler;


exports.handler=requestHandler;