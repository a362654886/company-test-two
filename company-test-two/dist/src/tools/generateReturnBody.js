"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResult = exports.generateReturnBody = void 0;
/**
 * format API return body
 * @param status
 * @param body
 */
const generateReturnBody = (status, body) => {
    return {
        statusCode: status,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: body,
    };
};
exports.generateReturnBody = generateReturnBody;
/**
 * auto generate return body according different function para
 * @param body
 * @param asyncFn
 * @param successInfo
 */
const getResult = async (body, asyncFn, successInfo) => {
    try {
        const aBody = body;
        const result = await asyncFn(aBody);
        return (0, exports.generateReturnBody)(200, JSON.stringify(successInfo ? successInfo : result));
    }
    catch (error) {
        return (0, exports.generateReturnBody)(400, JSON.stringify(error.toString()));
    }
};
exports.getResult = getResult;
