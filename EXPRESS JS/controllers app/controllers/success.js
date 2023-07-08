const path=require("path");
const rootPath=require("../util/path");

exports.getsuccess=(req,res,next)=>{

    res.sendFile(path.join(rootPath,'views','success.html'));

};