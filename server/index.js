const express = require('express');  // instance of express
const app = express();

const db = require('./models');     // create the tables in models/

db.sequelize.sync().then(() => {
    app.listen(3001, () => {  // put an anonymous callbakc function
        console.log("Server running on port 3001");
    });
});
