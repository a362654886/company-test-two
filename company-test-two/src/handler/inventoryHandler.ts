import { Handler } from "aws-lambda";
import { InsertOneWriteOpResult } from "mongodb";
import {
  getAllInventory,
  insertNewInventory,
  updateInventory,
} from "../controller/inventoryController";
import { allTypes } from "../type/types";
import { generateReturnBody, getResult } from "../tools/generateReturnBody";
import { InventoryType } from "../type/InventoryType";
import { checkInventoryExistFn } from "../tools/getInventory";
import {
  deleteManyPreOrders,
  getPreOrderByTime,
} from "../controller/preOrderController";

/**
 * insert Channel handler
 */
const inventoryInsert: Handler = async (event, context) => {
  const { inventoryBody } = JSON.parse(event.body) || {};
  return getResult<InventoryType, InsertOneWriteOpResult<allTypes>>(
    inventoryBody,
    insertNewInventory,
    "success"
  );
};

/**
 * subtract inventory according the input item and number
 */
const subtractInventory: Handler = async (event, context) => {
  const { item, orderedNumber } = JSON.parse(event.body) || {};

  return checkInventoryExistFn(item, orderedNumber);
};

/**
 * reset inventory by time(day)
 * 1. set current inventory number to default inventory number
 * 2. get all pre order number for this setting day and then set this pre order number to current order number
 * 3. reduce all pre order number for this setting day from pre order number
 */
const resetInventory: Handler = async (event, context) => {
  const { time } = JSON.parse(event.body) || {};

  // get all pre order number for this setting day
  const allPreOrders = await getPreOrderByTime(time);

  // get all inventory
  const allInventory = await getAllInventory();

  //reset the data for each inventory
  if (allInventory && allPreOrders) {
    for (const inventory of allInventory) {
      const _preOrderNum = allPreOrders
        .filter(
          (preOrder) =>
            preOrder.time == time && preOrder.itemId == inventory._id
        )
        .map((item) => item.orderedNumber)
        .reduce((a, b) => a + b, 0);
      const newInventory = {
        _id: inventory._id,
        currentInventory: _preOrderNum,
        defaultInventory: inventory.currentInventory,
        preOrderNumber: inventory.preOrderNumber - _preOrderNum,
      };
      await updateInventory(newInventory);
    }
    await deleteManyPreOrders(time);
  }
  return generateReturnBody(200, "success");
};

export { inventoryInsert, subtractInventory, resetInventory };
