const http=require("http");


const server=http.createServer((req,res)=>{
    if(req.url=='/'){
        res.write("welcome to Index page");
        res.end();
    }

    if(req.url=='/home'){
        res.write("welcome home");
        res.end();
    }

    if(req.url=='/about'){
        res.write("welcome to About Us page");
        res.end();
    }

    if(req.url=='/node'){
        res.write("welcome to my Node JS project");
        res.end();
    }
    
});


server.listen(4000);