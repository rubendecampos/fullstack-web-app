const express = require('express');  // instance of express
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');     // create the tables in models/

// Routers
const postsRouter = require("./routes/Posts");
app.use("/posts", postsRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {  // put an anonymous callbakc function
        console.log("Server running on port 3001");
    });
});
