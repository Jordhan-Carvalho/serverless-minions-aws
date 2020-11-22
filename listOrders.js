import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event, context) {
  let body, statusCode;

  const params = {
    TableName: process.env.orderTable,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId,
    },
  };

  try {
    const res = await dynamoDb.query(params).promise();
    if (!res.Items) {
      throw new Error("No order found.");
    }
    body = res.Items;
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
