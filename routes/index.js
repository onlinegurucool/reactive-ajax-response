var express = require('express');
var router = express.Router();
var con = require('../config/connection');

/* GET home page. */
router.get('/', function(req, res, next) {
	let options = {
		title: "Product List"
	}
	let query = `
		SELECT 
			p.*,
			CONCAT(p.name,"-",p.brand, "[",p.points,"]") as text
		FROM 
			product p
		WHERE 
			1 = 1
	`
	con.query(query,(err,results)=>{
		if(err) {
			return res.send(err)
		} else {
			console.log(results)
			options.products = results
			return res.render('index', options);
		}
	})
});

router.get('/product-list',function(req,res){
	let query = `
		SELECT 
			p.*,
			CONCAT(p.name,"-",p.brand, " [Point :- ",p.points,"]") as text
		FROM 
			product p
		WHERE 
			1 = 1
	`
	if(req.query.q) {
		query += ` AND p.name LIKE "%${req.query.q}%"`
	}
	// console.log(query)
	con.query(query,function(err,rows){
		if(err){
			console.log(err);
			res.status(503).send(err)
		} else {
			res.status(200).send({
				"results" : rows
			});
		}
	})
})





module.exports = router;
