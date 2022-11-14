"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertPreOrder = void 0;
const inventoryController_1 = require("../controller/inventoryController");
const generateReturnBody_1 = require("../tools/generateReturnBody");
const preOrderController_1 = require("../controller/preOrderController");
/**
 * insert Pre order
 */
const insertPreOrder = async (event, context) => {
    const { preOrderBody } = JSON.parse(event.body) || {};
    const inventoryBody = await (0, inventoryController_1.getInventoryByItem)(preOrderBody.itemId);
    // if this inventory is not exist, system will return 400
    if (!inventoryBody) {
        return (0, generateReturnBody_1.generateReturnBody)(400, JSON.stringify(`this inventory is not exist`));
    }
    else {
        //update inventory pre order
        //the inventory order number should add pre order number
        inventoryBody.preOrderNumber =
            inventoryBody.preOrderNumber + preOrderBody.orderedNumber;
        await (0, inventoryController_1.updateInventory)(inventoryBody);
        return (0, generateReturnBody_1.getResult)(preOrderBody, preOrderController_1.insertNewPreOrder, "success");
    }
};
exports.insertPreOrder = insertPreOrder;
