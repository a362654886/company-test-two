import { UpdateWriteOpResult } from "mongodb";
import {
  getInventoryByItem,
  updateInventory,
} from "../controller/inventoryController";
import { InventoryType } from "../type/InventoryType";
import { generateReturnBody, getResult } from "./generateReturnBody";

export const checkInventoryExistFn = async (
  item: string,
  orderedNumber: number
) => {
  //get Inventory
  const inventoryBody = await getInventoryByItem(item);

  // if this inventory is not exist, system will return 400
  if (!inventoryBody) {
    return generateReturnBody(
      400,
      JSON.stringify(`this inventory is not exist`)
    );
  } else {
    return subtractInventoryFn(inventoryBody, orderedNumber);
  }
};

export const subtractInventoryFn = async (
  inventoryBody: InventoryType,
  orderedNumber: number
) => {
  const leftProducts =
    inventoryBody.currentInventory - inventoryBody.preOrderNumber;
  const isEnoughProduct: boolean = leftProducts >= orderedNumber;

  if (!isEnoughProduct) {
    return generateReturnBody(
      400,
      JSON.stringify(
        `this order failed, inventory don't have enough product to subtract`
      )
    );
  } else {
    const newInventory = inventoryBody;
    newInventory.currentInventory =
      newInventory.currentInventory - orderedNumber;
    return getResult<InventoryType, UpdateWriteOpResult>(
      newInventory,
      updateInventory,
      "success"
    );
  }
};
