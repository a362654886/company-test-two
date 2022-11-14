"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtractInventoryFn = exports.checkInventoryExistFn = void 0;
const inventoryController_1 = require("../controller/inventoryController");
const generateReturnBody_1 = require("./generateReturnBody");
const checkInventoryExistFn = async (item, orderedNumber) => {
    //get Inventory
    const inventoryBody = await (0, inventoryController_1.getInventoryByItem)(item);
    // if this inventory is not exist, system will return 400
    if (!inventoryBody) {
        return (0, generateReturnBody_1.generateReturnBody)(400, JSON.stringify(`this inventory is not exist`));
    }
    else {
        return (0, exports.subtractInventoryFn)(inventoryBody, orderedNumber);
    }
};
exports.checkInventoryExistFn = checkInventoryExistFn;
const subtractInventoryFn = async (inventoryBody, orderedNumber) => {
    const leftProducts = inventoryBody.currentInventory - inventoryBody.preOrderNumber;
    const isEnoughProduct = leftProducts >= orderedNumber;
    if (!isEnoughProduct) {
        return (0, generateReturnBody_1.generateReturnBody)(400, JSON.stringify(`this order failed, inventory don't have enough product to subtract`));
    }
    else {
        const newInventory = inventoryBody;
        newInventory.currentInventory =
            newInventory.currentInventory - orderedNumber;
        return (0, generateReturnBody_1.getResult)(newInventory, inventoryController_1.updateInventory, "success");
    }
};
exports.subtractInventoryFn = subtractInventoryFn;
