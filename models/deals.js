const nedb = require("nedb-promise");
dealsDb = new nedb({ filename: "./databases/deals.db", autoload: true });

async function addNewDeal(deal) {
    return await dealsDb.insert(deal);
}

module.exports = { addNewDeal };
