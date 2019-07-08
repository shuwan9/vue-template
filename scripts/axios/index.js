const fs = require("fs")
const prettier = require("prettier")
const ejs = require("ejs")
const apis = require("./api")

ejs.renderFile("./api.ejs", { apis, sendPath: "" }, {}, (err, str) => {
  if (err) {
    console.log(err)
  } else {
    fs.writeFile(
      "testhttp.js",
      prettier.format(str, { parser: "babel" }),
      {},
      err => {
        if (err) {
          console.log(err)
        }
      }
    )
  }
})
