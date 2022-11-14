import { DeleteWriteOpResultObject, InsertOneWriteOpResult } from "mongodb";
import {
  dbServiceDelete,
  dbServiceDeleteMany,
  dbServiceGet,
  dbServiceInsert,
} from "../service/MongoDBService";
import { allTypes } from "../type/types";
import { DBTableName } from "../type/tableName";
import { PreOrderType } from "src/type/preOrderType";

/**
 * insert pre order to database
 * @param preOrderBody
 */
export const insertNewPreOrder = async (
  preOrderBody: PreOrderType
): Promise<InsertOneWriteOpResult<allTypes>> =>
  dbServiceInsert<PreOrderType>(DBTableName.PRE_ORDER, preOrderBody);

/**
 * get pre order by time
 * @param time
 */
export const getPreOrderByTime = async (
  time: string
): Promise<PreOrderType[] | null> => {
  try {
    const preOrders = await dbServiceGet<PreOrderType>(DBTableName.PRE_ORDER, {
      time: time,
    });
    return preOrders;
  } catch (error) {
    return null;
  }
};

/**
 * update preOrderBody
 * @param preOrderBody
 */
export const deletePreOrder = async (
  preOrderId: string
): Promise<DeleteWriteOpResultObject | null> => {
  const preOrders: PreOrderType[] = await dbServiceGet<PreOrderType>(
    DBTableName.PRE_ORDER,
    {
      _id: preOrderId,
    }
  );

  if (preOrders) {
    return dbServiceDelete<PreOrderType>(DBTableName.PRE_ORDER, preOrders[0]);
  } else {
    return null;
  }
};

/**
 * delete many preOrderBody
 * @param time
 */
export const deleteManyPreOrders = async (
  time: string
): Promise<DeleteWriteOpResultObject | null> =>
  dbServiceDeleteMany(DBTableName.PRE_ORDER, { time: time });
