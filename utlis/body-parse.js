module.exports.reqOnBody = function (body, data, req){
  var body = ''
  req.on("data", (chunk)=>{
    body = chunk.toString();
  })

 req.on("end",()=>{
  
 })
  
  
}