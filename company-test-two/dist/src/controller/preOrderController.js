"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteManyPreOrders = exports.deletePreOrder = exports.getPreOrderByTime = exports.insertNewPreOrder = void 0;
const MongoDBService_1 = require("../service/MongoDBService");
const tableName_1 = require("../type/tableName");
/**
 * insert pre order to database
 * @param preOrderBody
 */
const insertNewPreOrder = async (preOrderBody) => (0, MongoDBService_1.dbServiceInsert)(tableName_1.DBTableName.PRE_ORDER, preOrderBody);
exports.insertNewPreOrder = insertNewPreOrder;
/**
 * get pre order by time
 * @param time
 */
const getPreOrderByTime = async (time) => {
    try {
        const preOrders = await (0, MongoDBService_1.dbServiceGet)(tableName_1.DBTableName.PRE_ORDER, {
            time: time,
        });
        return preOrders;
    }
    catch (error) {
        return null;
    }
};
exports.getPreOrderByTime = getPreOrderByTime;
/**
 * update preOrderBody
 * @param preOrderBody
 */
const deletePreOrder = async (preOrderId) => {
    const preOrders = await (0, MongoDBService_1.dbServiceGet)(tableName_1.DBTableName.PRE_ORDER, {
        _id: preOrderId,
    });
    if (preOrders) {
        return (0, MongoDBService_1.dbServiceDelete)(tableName_1.DBTableName.PRE_ORDER, preOrders[0]);
    }
    else {
        return null;
    }
};
exports.deletePreOrder = deletePreOrder;
/**
 * delete many preOrderBody
 * @param time
 */
const deleteManyPreOrders = async (time) => (0, MongoDBService_1.dbServiceDeleteMany)(tableName_1.DBTableName.PRE_ORDER, { time: time });
exports.deleteManyPreOrders = deleteManyPreOrders;
