import cheerio from "cheerio";
import axios from "axios";
import AWS from "aws-sdk";

import { headers, timer } from "./lib/scrapperUtils";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event, context, callback) => {
  const newProds = event.NewProds;

  for (let prod of newProds) {
    await timer(75, 450);

    const { data } = await axios.get(`https://amazon.com${prod.url}`, {
      headers,
    });
    const $ = cheerio.load(data);

    const descArray = [];
    $('div[id="feature-bullets"] span[class="a-list-item"]').each(function (
      i,
      elem
    ) {
      descArray.push($(this).text().trim());
    });

    const params = {
      TableName: process.env.prodTable,
      Item: {
        amzId: prod.id,
        title: $('span[id="productTitle"]').text().trim(),
        description: descArray.join(""),
        price: $('span[id="price_inside_buybox"]').text().trim(),
        imageUrl: $('img[id="landingImage"]').attr("data-old-hires"),
        createdAt: Date.now(),
      },
    };

    try {
      await dynamoDb.put(params).promise();
    } catch (error) {
      console.log(error);
    }
  }
};
