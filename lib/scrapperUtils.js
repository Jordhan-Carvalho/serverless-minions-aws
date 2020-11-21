const baseUrl = `https://www.amazon.com/s?k=minions+toys&i=toys-and-games&language=pt&qid=1605892574&ref=sr_pg_1`;
const headers = {
  // prettier-ignore
  'accept':
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
  "accept-language": "en-US,en;q=0.9,en-US;q=0.8,en;q=0.7",
  "cache-control": "max-age=0",
  "upgrade-insecure-requests": "1",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
  "accept-encoding": "gzip, deflate, br",
};

const timer = (min, max) =>
  new Promise((res) => setTimeout(res, randomIntFromInterval(min, max)));

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export { baseUrl, headers, timer };
