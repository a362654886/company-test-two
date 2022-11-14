import {
  Collection,
  DeleteWriteOpResultObject,
  FilterQuery,
  InsertOneWriteOpResult,
  MongoClient,
  SortOptionObject,
  UpdateQuery,
  UpdateWriteOpResult,
} from "mongodb";
import { allTypes } from "../type/types";

const dbConnectionUrl =
  "mongodb+srv://leilu0229:AAaa123581321@cluster0.vm8df.mongodb.net/?retryWrites=true&w=majority";

/**
 * connect to DB according the dbCollectionName and the return the collection body
 * @param dbCollectionName
 * @return dbCollection
 */
export const dbObject = async (
  dbCollectionName: string
): Promise<Collection> => {
  const dbInstance = await MongoClient.connect(dbConnectionUrl);
  const dbObject = dbInstance.db("multi-channel");
  const dbCollection = dbObject.collection(dbCollectionName);
  return dbCollection;
};

/**
 * get data by page
 * @param tableName
 * @param searchKey
 * @param page
 * @param pageSize
 * @param sort
 * @return Generics Array
 */
const dbServiceGet = async <T>(
  tableName: string,
  searchKey: Record<string, unknown>
): Promise<T[]> => {
  const result = await dbObject(tableName);
  return result.find(searchKey).toArray();
};

/**
 * insert data
 * @param tableName
 * @param body
 */
const dbServiceInsert = async <T>(
  tableName: string,
  body: T
): Promise<InsertOneWriteOpResult<allTypes>> => {
  const result = await dbObject(tableName);
  return result.insertOne(body);
};

/**
 * update data
 * @param tableName
 * @param filter
 * @param body
 */
const dbServiceUpdate = async <T>(
  tableName: string,
  filter: Record<string, unknown>,
  body: T
): Promise<UpdateWriteOpResult> => {
  const result = await dbObject(tableName);
  return result.updateOne(
    filter,
    body as UpdateQuery<any> | Partial<any>
  ) as unknown as UpdateWriteOpResult;
};

/**
 * delete one item
 * @param tableName
 * @param body
 */
const dbServiceDelete = async <T>(
  tableName: string,
  body: T
): Promise<DeleteWriteOpResultObject> => {
  const result = await dbObject(tableName);
  return result.deleteOne(
    body as FilterQuery<any>
  ) as unknown as DeleteWriteOpResultObject;
};

/**
 * delete many items
 * @param tableName
 * @param matchBody
 */
const dbServiceDeleteMany = async (
  tableName: string,
  matchBody: Record<string, unknown>
): Promise<DeleteWriteOpResultObject> => {
  const result = await dbObject(tableName);
  return result.deleteMany(matchBody);
};

/**
 * get table's count
 * @param tableName
 * @param searchKey
 */
const dbServiceCount = async (
  tableName: string,
  searchKey: Record<string, unknown>
): Promise<number> => {
  const result = await dbObject(tableName);
  return result.count(searchKey);
};

/**
 * mongoDB lookup function
 * @param tableName
 * @param lookupObj
 * @param page
 * @param pageSize
 * @param sort
 */
const dbServiceLookup = async <T>(
  tableName: string,
  lookupObj: any[],
  page: number,
  pageSize: number,
  sort: Record<string, unknown>
): Promise<T[]> => {
  const collection = await dbObject(tableName);
  return collection
    .aggregate(lookupObj)
    .sort(sort)
    .skip(pageSize * (page - 1))
    .limit(pageSize * 1)
    .toArray();
};

export {
  dbServiceGet,
  dbServiceInsert,
  dbServiceUpdate,
  dbServiceDelete,
  dbServiceLookup,
  dbServiceCount,
  dbServiceDeleteMany,
};
