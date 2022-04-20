const fs = require("fs");
const http = require("http");
const { off } = require("process");
const { json } = require("stream/consumers");
const url = require("url");

const replaceHtml = require("./modules/replaceHtml.js");

const overView = fs.readFileSync("./templates/overview.html", "utf-8");
const card = fs.readFileSync("./templates/card.html", "utf-8");
const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const product = fs.readFileSync("./templates/product.html", "utf-8");

const dataObj = JSON.parse(data);

// console.log(replaceHtml());

const server = http.createServer((req, res) => {
  const urlcha = req.url;
  const query = +url.parse(urlcha, true).query.id;
  if (urlcha == `/product?id=${query}`) {
    const obj = dataObj.find((val) => {
      return val.id === query;
    });
    let tayyorIchki = replaceHtml(product, obj);

    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end(tayyorIchki);
  } else if (urlcha === "/overview") {
    const tayyor = dataObj
      .map((val) => {
        return replaceHtml(card, val);
      })
      .join("");
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const output = overView.replace("{CardHtml}", tayyor);
    res.end(output);
  } else {
    res.end("Page not found!");
  }
});

server.listen("8000", "127.0.0.1");

// const server = http.createServer((req, res) => {
//   const arr = req.url;
//   if (arr === "/api") {
//     res.writeHead(200, {
//       "content-type": "text/json",
//       "mening-headrim": "zo'r ishladi",
//     });
//     res.end(data);
//   } else {
//     res.writeHead(404, {
//       "content-type": "text/plain",
//     });
//     res.end("Error");
//   }
// });

// server.listen("8000", "127.0.0.1");
