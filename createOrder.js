import * as uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event, context) {
  let body, statusCode;
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.orderTable,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      orderId: uuid.v1(),
      prodTitle: data.prodTitle,
      prodId: data.prodId,
      prodPrice: data.prodPrice,
      createdAt: Date.now(),
    },
  };

  try {
    await dynamoDb.put(params).promise();

    body = params.Item;
    statusCode = 200;
  } catch (e) {
    body = { error: e.message };
    statusCode = 500;
  }

  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
}
