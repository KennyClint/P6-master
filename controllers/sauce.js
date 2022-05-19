const Sauce = require("../models/Sauce");
const fs = require("fs");

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
	const sauceObject = JSON.parse(req.body.sauce);
	delete sauceObject._id;
	const sauce = new Sauce ({
		...sauceObject,
		likes : 0,
		dislikes : 0,
		imageUrl : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`	
	});
	sauce.save()
	.then(function(){
		res.status(201).json({message : "Post saved successfully"});
	})
	.catch(function(error){
		res.status(400).json({error : error});
	});
};

exports.getOneSauce = function(req, res, next)
{
	Sauce.findOne({_id : req.params.id})
	.then(function(sauce){
		res.status(200).json(sauce);
	})
	.catch(function(error){
		res.status(404).json({error : error});
	});
};

exports.modifySauce = function(req, res, next)
{
	const sauceObject = req.file ?
	{
		...JSON.parse(req.body.sauce),	
		imageUrl : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
	} : {...req.body};
	Sauce.updateOne({_id : req.params.id}, {...sauceObject, _id : req.params.id})
	.then(function(){
		res.status(200).json({message : "Sauce updated successfully"});
	})
	.catch(function(error){
		res.status(400).json({error});
	});
};

exports.deleteSauce = function(req, res, next)
{
	Sauce.findOne({_id : req.params.id})
	.then(function(sauce){
		if(!sauce)
		{
			res.status(404).json({error : new Error("No such sauce")});
		} else 
		{
			if(sauce.userId !== req.auth.userId)
			{
				res.status(400).json({error : new Error("Unauthorized request")});
			} else
			{
				Sauce.findOne({_id : req.params.id})
				.then(function(sauce){
					const filename = sauce.imageUrl.split("/images/")[1];
					fs.unlink(`images/${filename}`,function(){
						Sauce.deleteOne({_id : req.params.id})
						.then(function(){
							res.status(200).json({message : "Deleted"});
						})
						.catch(function(error){
							res.status(400).json({error : error});
						});
					});
				})
				.catch(function(error){
					res.status(500).json({error});
				});
			}
		}
	})
};

exports.likeSauce = function(req, res, next)
{

};