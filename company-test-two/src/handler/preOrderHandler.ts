import { Handler } from "aws-lambda";
import { InsertOneWriteOpResult } from "mongodb";
import {
  getInventoryByItem,
  updateInventory,
} from "../controller/inventoryController";
import { allTypes } from "../type/types";
import { generateReturnBody, getResult } from "../tools/generateReturnBody";
import { insertNewPreOrder } from "../controller/preOrderController";
import { PreOrderType } from "../type/preOrderType";

/**
 * insert Pre order
 */
const insertPreOrder: Handler = async (event, context) => {
  const { preOrderBody } = JSON.parse(event.body) || {};

  const inventoryBody = await getInventoryByItem(preOrderBody.itemId);

  // if this inventory is not exist, system will return 400
  if (!inventoryBody) {
    return generateReturnBody(
      400,
      JSON.stringify(`this inventory is not exist`)
    );
  } else {
    //update inventory pre order
    //the inventory order number should add pre order number
    inventoryBody.preOrderNumber =
      inventoryBody.preOrderNumber + preOrderBody.orderedNumber;

    await updateInventory(inventoryBody);

    return getResult<PreOrderType, InsertOneWriteOpResult<allTypes>>(
      preOrderBody,
      insertNewPreOrder,
      "success"
    );
  }
};

export { insertPreOrder };
