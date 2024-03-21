const Categories = require('../models/categories')


module.exports.categoriesAll = function(req, res){
    Categories.findAll().then((category)=>{
        const json = JSON.stringify(category)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(json)
    }).catch((err)=>{
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Ошибка при получении списка фильмов');
    })
}

module.exports.createCategories = function(req,res){
    let body = '';
    req.on('data',(chunk)=>{
        body = body + chunk.toString();
    })

    req.on('end', ()=>{
        try {
            const data = JSON.parse(body);
            Categories.create({
                name: data.name
            }).then(()=>{
                res.end("Данные внесенны успешно!");
            }).catch((err) => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Ошибка при добавлении категории');
            });
        } catch(error) {
            console.error("Ошибка при парсинге JSON: ", error);
        
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end("Ошибка при обработке данных");
        }
    })

}