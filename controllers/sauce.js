const Sauce = require("../models/Sauce");

exports.getAllSauce = function(req, res, next)
{
	Sauce.find()
	.then(function(sauces){
		res.status(200).json(sauces);
	})
	.catch(function(error){
		res.status(400).json({error : error});
	})
};

exports.createSauce = function(req, res, next)
{
	const sauce = new Sauce ({
		userId : req.body.userId,
		name : req.body.name,
		manufacturer : req.body.manufacturer,
		description : req.body.description,
		mainPepper : req.body.mainPepper,
		imageUrl : req.body.imageUrl,
		heat : req.body.heat	
	});
	sauce.save()
	.then(function(){
		res.status(201).json({message : "Post saved successfully"});
	})
	.catch(function(error){
		res.status(400).json({error : error});
	});
};