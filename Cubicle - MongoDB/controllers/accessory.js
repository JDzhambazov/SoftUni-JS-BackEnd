const Accessory = require('../models/accessories');

const getAllAccessory = async () =>{
    const accessories = await Accessory.find().lean();
    console.log(accessories)
    return accessories
};

const getAccessory = async (id) => {
    const accessory = await Accessory.findById(id).lean();
    return accessory;
}

module.exports={
    getAllAccessory,
    getAccessory
}