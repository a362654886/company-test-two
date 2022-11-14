import { InsertOneWriteOpResult, UpdateWriteOpResult } from "mongodb";
import {
  dbServiceGet,
  dbServiceInsert,
  dbServiceUpdate,
} from "../service/MongoDBService";
import { allTypes } from "../type/types";
import { DBTableName } from "../type/tableName";
import { InventoryType } from "../type/InventoryType";

/**
 * insert inventoryBody to database
 * @param inventoryBody
 */
export const insertNewInventory = async (
  inventoryBody: InventoryType
): Promise<InsertOneWriteOpResult<allTypes>> =>
  dbServiceInsert<InventoryType>(DBTableName.INVENTORY, inventoryBody);

/**
 * get Inventory according to itemName
 * @param itemName
 */
export const getInventoryByItem = async (
  itemName: string
): Promise<InventoryType | null> => {
  try {
    const inventory = await dbServiceGet<InventoryType>(DBTableName.INVENTORY, {
      _id: itemName,
    });
    return inventory[0];
  } catch (error) {
    return null;
  }
};

/**
 * get Inventory according to itemName
 * @param itemName
 */
export const getAllInventory = async (): Promise<InventoryType[] | null> => {
  try {
    const inventory = await dbServiceGet<InventoryType>(
      DBTableName.INVENTORY,
      {}
    );
    return inventory;
  } catch (error) {
    return null;
  }
};

/**
 * update inventory
 * @param inventory
 */
export const updateInventory = async (
  inventory: InventoryType
): Promise<UpdateWriteOpResult> => {
  const filterObj = { _id: inventory._id };
  const body = {
    $set: {
      currentInventory: inventory.currentInventory,
      defaultInventory: inventory.defaultInventory,
      preOrderNumber: inventory.preOrderNumber,
    },
  };
  return dbServiceUpdate<Record<string, unknown>>(
    DBTableName.INVENTORY,
    filterObj,
    body
  );
};
