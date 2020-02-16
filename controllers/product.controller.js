var db = require('../db');
const shortid = require('shortid');

module.exports.index = function(req, res){
    var page = parseInt(req.query.page) || 1;
    var perpage = 8;

    // var start = (page - 1) * perpage;
    // var end = page * perpage;

    var drop = (page - 1) * perpage;

    res.render('products/index', {
        // products : db.get('products').value().slice(start, end)
        products : db.get('products').drop(drop).take(perpage).value()
    });
}

module.exports.search = function(req, res){
    var q = req.query.q;
    var matchedProducts = db.get('products').value().filter(function(product){
        return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('products/index', {
        products: matchedProducts
    });
}

module.exports.create = function(req, res){
    res.render('products/create');
}

module.exports.findById = function(req, res){
    var id = parseInt(req.params.id);
    
    var product = db.get('products').find({ id : id }).value();
    console.log(product)
    res.render('products/view', {
        product : product
    });
}

module.exports.postCreate = function(req, res){
    req.body.id = shortid.generate();
    
    db.get('products').push(req.body).write();
    res.redirect('/products');
}