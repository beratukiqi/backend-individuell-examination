const nedb = require("nedb-promise");
menuDb = new nedb({ filename: "./databases/menu.db", autoload: true });

async function getAllMenuItems() {
    return await menuDb.find({});
}

async function findMenuItemById(id) {
    return await menuDb.findOne({ _id: id });
}

async function addNewMenuItem(item) {
    return await menuDb.insert(item);
}

async function updateMenuItem(id, changes) {
    const numAffected = await menuDb.update(
        { _id: id },
        { $set: changes },
        { upsert: false }
    );
    console.log("Number of affected documents:", numAffected);
    return numAffected;
}

async function deleteMenuItem(id) {
    return await menuDb.remove({ _id: id });
}

module.exports = {
    getAllMenuItems,
    findMenuItemById,
    addNewMenuItem,
    updateMenuItem,
    deleteMenuItem,
};
