"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInventory = exports.getAllInventory = exports.getInventoryByItem = exports.insertNewInventory = void 0;
const MongoDBService_1 = require("../service/MongoDBService");
const tableName_1 = require("../type/tableName");
/**
 * insert inventoryBody to database
 * @param inventoryBody
 */
const insertNewInventory = async (inventoryBody) => (0, MongoDBService_1.dbServiceInsert)(tableName_1.DBTableName.INVENTORY, inventoryBody);
exports.insertNewInventory = insertNewInventory;
/**
 * get Inventory according to itemName
 * @param itemName
 */
const getInventoryByItem = async (itemName) => {
    try {
        const inventory = await (0, MongoDBService_1.dbServiceGet)(tableName_1.DBTableName.INVENTORY, {
            _id: itemName,
        });
        return inventory[0];
    }
    catch (error) {
        return null;
    }
};
exports.getInventoryByItem = getInventoryByItem;
/**
 * get Inventory according to itemName
 * @param itemName
 */
const getAllInventory = async () => {
    try {
        const inventory = await (0, MongoDBService_1.dbServiceGet)(tableName_1.DBTableName.INVENTORY, {});
        return inventory;
    }
    catch (error) {
        return null;
    }
};
exports.getAllInventory = getAllInventory;
/**
 * update inventory
 * @param inventory
 */
const updateInventory = async (inventory) => {
    const filterObj = { _id: inventory._id };
    const body = {
        $set: {
            currentInventory: inventory.currentInventory,
            defaultInventory: inventory.defaultInventory,
            preOrderNumber: inventory.preOrderNumber,
        },
    };
    return (0, MongoDBService_1.dbServiceUpdate)(tableName_1.DBTableName.INVENTORY, filterObj, body);
};
exports.updateInventory = updateInventory;
