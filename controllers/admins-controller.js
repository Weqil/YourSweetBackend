const Admins = require('../models/admins');

// module.exports.createAdmins = Admins.bulkCreate(adm)

module.exports.adminsAll = function(req,res){
    Admins.findAll()
.then(admins => {
    const adminsJson = JSON.stringify(admins);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(adminsJson);
})
.catch(err => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: err.message }));
});
} 

module.exports.adminsAdd = function(req,res){
    let body = ''
    req.on('data', (chunk)=>{
        body = body + chunk.toString()
    })

    req.on('end', ()=>{
        data = JSON.parse(body)
        Admins.create(
            {
            user_name:data.user_name,
            password:data.password
            }).then((admin)=>{
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Данные успешно получены и записаны в базу данных');
            }).catch((err)=>{
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('ошибка добавления админа');
            })
    })
    
}