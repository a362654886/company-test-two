"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetInventory = exports.subtractInventory = exports.inventoryInsert = void 0;
const inventoryController_1 = require("../controller/inventoryController");
const generateReturnBody_1 = require("../tools/generateReturnBody");
const getInventory_1 = require("../tools/getInventory");
const preOrderController_1 = require("../controller/preOrderController");
/**
 * insert Channel handler
 */
const inventoryInsert = async (event, context) => {
    const { inventoryBody } = JSON.parse(event.body) || {};
    return (0, generateReturnBody_1.getResult)(inventoryBody, inventoryController_1.insertNewInventory, "success");
};
exports.inventoryInsert = inventoryInsert;
/**
 * subtract inventory according the input item and number
 */
const subtractInventory = async (event, context) => {
    const { item, orderedNumber } = JSON.parse(event.body) || {};
    return (0, getInventory_1.checkInventoryExistFn)(item, orderedNumber);
};
exports.subtractInventory = subtractInventory;
/**
 * reset inventory by time(day)
 * 1. set current inventory number to default inventory number
 * 2. get all pre order number for this setting day and then set this pre order number to current order number
 * 3. reduce all pre order number for this setting day from pre order number
 */
const resetInventory = async (event, context) => {
    const { time } = JSON.parse(event.body) || {};
    // get all pre order number for this setting day
    const allPreOrders = await (0, preOrderController_1.getPreOrderByTime)(time);
    // get all inventory
    const allInventory = await (0, inventoryController_1.getAllInventory)();
    //reset the data for each inventory
    if (allInventory && allPreOrders) {
        for (const inventory of allInventory) {
            const _preOrderNum = allPreOrders
                .filter((preOrder) => preOrder.time == time && preOrder.itemId == inventory._id)
                .map((item) => item.orderedNumber)
                .reduce((a, b) => a + b, 0);
            const newInventory = {
                _id: inventory._id,
                currentInventory: _preOrderNum,
                defaultInventory: inventory.currentInventory,
                preOrderNumber: inventory.preOrderNumber - _preOrderNum,
            };
            await (0, inventoryController_1.updateInventory)(newInventory);
        }
        await (0, preOrderController_1.deleteManyPreOrders)(time);
    }
    return (0, generateReturnBody_1.generateReturnBody)(200, "success");
};
exports.resetInventory = resetInventory;
