const express = require("express");
const fallback = require("express-history-api-fallback");

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = "./dist/";

app.use(express.static(ROOT));
app.use(fallback("index.html", {root: ROOT}))

app.listen(PORT, () => {
    console.log(`Messenger app listening on port ${PORT}!`);
});
