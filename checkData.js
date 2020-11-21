import cheerio from "cheerio";
import axios from "axios";
import AWS from "aws-sdk";

import { baseUrl, headers } from "./lib/scrapperUtils";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event, context, callback) => {
  let scrappedProds = [];
  let newProdsArray = [];

  const { data } = await axios.get(baseUrl, { headers });
  const $ = cheerio.load(data);

  $(
    'div[class*="s-main-slot s-result-list"] > div a[class="a-link-normal a-text-normal"]'
  ).each(function (i, elem) {
    const url = $(this).attr("href");
    if (!url.includes("slredirect")) {
      scrappedProds.push({ id: url.split("/").slice(3, 4)[0], url });
    }
  });

  for (let prod of scrappedProds) {
    const params = {
      TableName: process.env.tableName,
      Key: {
        amzId: prod.id,
      },
    };

    try {
      const res = await dynamoDb.get(params).promise();
      if (!res.Item) {
        newProdsArray.push(prod);
      }
    } catch (error) {
      console.log(error);
    }
  }

  callback(null, {
    NewProds: newProdsArray,
    isNewData: newProdsArray.length !== 0,
  });
};
