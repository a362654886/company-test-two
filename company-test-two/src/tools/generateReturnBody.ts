export type returnBody = {
  statusCode: number;
  headers: Record<string, unknown>;
  body: JSON | string;
};

/**
 * format API return body
 * @param status
 * @param body
 */
export const generateReturnBody = (
  status: number,
  body: JSON | string
): returnBody => {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: body,
  };
};

/**
 * auto generate return body according different function para
 * @param body
 * @param asyncFn
 * @param successInfo
 */
export const getResult = async <T, N>(
  body: T,
  asyncFn: (value: T) => Promise<N>,
  successInfo?: string
): Promise<returnBody> => {
  try {
    const aBody: T = body;
    const result = await asyncFn(aBody);
    return generateReturnBody(
      200,
      JSON.stringify(successInfo ? successInfo : result)
    );
  } catch (error: any) {
    return generateReturnBody(400, JSON.stringify(error.toString()));
  }
};
