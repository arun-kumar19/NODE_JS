const path=require("path");
const rootPath=require('../util/path')

exports.getContactUs=(req,res,next)=>{

    res.sendFile(path.join(rootPath,'views','contactus.html'));
    //console.log(path.join(rootPath,'views','contactus.html'));

};