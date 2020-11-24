import AWS from "aws-sdk";

const SES = new AWS.SES({ region: "us-east-1" });

export const main = async (event, context) => {
  let body, statusCode;
  const { to, from, subject, text } = JSON.parse(event.body);

  if (!to || !from || !subject || !text) {
    body = { error: "All fields are required" };
    statusCode = 400;
  } else {
    const params = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Text: { Data: text },
        },
        Subject: { Data: subject },
      },
      Source: from,
    };

    try {
      const r = await SES.sendEmail(params).promise();
      console.log("r", r);
      body = params;
      statusCode = 200;
    } catch (e) {
      console.log("erro", e);
      body = { error: e.message };
      statusCode = 500;
    }
  }

  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  };
};
