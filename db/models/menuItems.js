const mongoose = require("../db.js");

const menuItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  }
});
menuItemsSchema.set("toJSON", {
  virtuals: true
});
// menu model
const MenuItems = mongoose.model("MenuItems", menuItemsSchema);

const getAll = async () => {
  try {
    const menuItems = await MenuItems.find();
    return menuItems;
  } catch (error) {
    return error;
  }
};

const getOne = async (id) => {
  try {
    const menuItem = await MenuItems.findById(id);
    return menuItem;
  } catch (error) {
    return error;
  }
};

const create = async (body) => {
  try {
    const menuItem = await MenuItems.create(body);
    return menuItem;
  } catch (error) {
    return error;
  }
};

const update = async (id, body) => {
  try {
    const now = new Date();
    const updatedData = { ...body, updatedAt: now };
    const menuItem = await MenuItems.findByIdAndUpdate(id, updatedData, {
      new: true
    });
    return menuItem;
  } catch (error) {
    return error;
  }
};

const deleteOne = async (id) => {
  try {
    await MenuItems.findByIdAndDelete(id);
    return id;
  } catch (error) {
    return error;
  }
};

const searchMany = async (query) => {
  try {
    const menuItems = await MenuItems.find({
      $or: [
        { description: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } }
      ]
    });
    return menuItems;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  MenuItems,
  update,
  deleteOne,
  searchMany
};
