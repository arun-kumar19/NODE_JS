const fs=require("fs");

module.exports=class Product{
    
    constructor(t){
        this.title=t;
       
    }

    save(){

        fs.appendFileSync('product.txt',this.title+'/n',function(err){
            if(err){
                console.error(err);
            }
            else{
                console.log("written in file successfully");
            }
        });
    }

    static fetchAll(cb){
    
        fs.readFile('product.txt','utf8',(err,data)=>{
            if(err){
                console.error(err);
                cb([]);
    
            }
            else{
                cb(data.split('/n').slice(0,-1));
                
                //console.log('file data=',products);
            }
        })

    }
}