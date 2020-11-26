import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event, context) {
  let body, statusCode;

  const params = {
    TableName: process.env.prodTable,
    Key: {
      amzId: event.pathParameters.id,
    },
  };

  try {
    const res = await dynamoDb.get(params).promise();
    if (!res.Item) {
      throw new Error("Item not found.");
    }
    body = res.Item;
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
