"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbServiceDeleteMany = exports.dbServiceCount = exports.dbServiceLookup = exports.dbServiceDelete = exports.dbServiceUpdate = exports.dbServiceInsert = exports.dbServiceGet = exports.dbObject = void 0;
const mongodb_1 = require("mongodb");
const dbConnectionUrl = "mongodb+srv://leilu0229:AAaa123581321@cluster0.vm8df.mongodb.net/?retryWrites=true&w=majority";
/**
 * connect to DB according the dbCollectionName and the return the collection body
 * @param dbCollectionName
 * @return dbCollection
 */
const dbObject = async (dbCollectionName) => {
    const dbInstance = await mongodb_1.MongoClient.connect(dbConnectionUrl);
    const dbObject = dbInstance.db("multi-channel");
    const dbCollection = dbObject.collection(dbCollectionName);
    return dbCollection;
};
exports.dbObject = dbObject;
/**
 * get data by page
 * @param tableName
 * @param searchKey
 * @param page
 * @param pageSize
 * @param sort
 * @return Generics Array
 */
const dbServiceGet = async (tableName, searchKey) => {
    const result = await (0, exports.dbObject)(tableName);
    return result.find(searchKey).toArray();
};
exports.dbServiceGet = dbServiceGet;
/**
 * insert data
 * @param tableName
 * @param body
 */
const dbServiceInsert = async (tableName, body) => {
    const result = await (0, exports.dbObject)(tableName);
    return result.insertOne(body);
};
exports.dbServiceInsert = dbServiceInsert;
/**
 * update data
 * @param tableName
 * @param filter
 * @param body
 */
const dbServiceUpdate = async (tableName, filter, body) => {
    const result = await (0, exports.dbObject)(tableName);
    return result.updateOne(filter, body);
};
exports.dbServiceUpdate = dbServiceUpdate;
/**
 * delete one item
 * @param tableName
 * @param body
 */
const dbServiceDelete = async (tableName, body) => {
    const result = await (0, exports.dbObject)(tableName);
    return result.deleteOne(body);
};
exports.dbServiceDelete = dbServiceDelete;
/**
 * delete many items
 * @param tableName
 * @param matchBody
 */
const dbServiceDeleteMany = async (tableName, matchBody) => {
    const result = await (0, exports.dbObject)(tableName);
    return result.deleteMany(matchBody);
};
exports.dbServiceDeleteMany = dbServiceDeleteMany;
/**
 * get table's count
 * @param tableName
 * @param searchKey
 */
const dbServiceCount = async (tableName, searchKey) => {
    const result = await (0, exports.dbObject)(tableName);
    return result.count(searchKey);
};
exports.dbServiceCount = dbServiceCount;
/**
 * mongoDB lookup function
 * @param tableName
 * @param lookupObj
 * @param page
 * @param pageSize
 * @param sort
 */
const dbServiceLookup = async (tableName, lookupObj, page, pageSize, sort) => {
    const collection = await (0, exports.dbObject)(tableName);
    return collection
        .aggregate(lookupObj)
        .sort(sort)
        .skip(pageSize * (page - 1))
        .limit(pageSize * 1)
        .toArray();
};
exports.dbServiceLookup = dbServiceLookup;
