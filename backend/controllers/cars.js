const CarOption = require("../models/cars");

const getcars = async (req,res) =>{
    try{
        const allcars= await CarOption.find();
        res.json(allcars);
    }catch(error){
        res.status(500).json({message:'Error fetching cars'});
    }
}

module.exports = getcars;