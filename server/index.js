const express = require('express');  // instance of express
const app = express();

app.use(express.json())

const db = require('./models');     // create the tables in models/

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {  // put an anonymous callbakc function
        console.log("Server running on port 3001");
    });
});
