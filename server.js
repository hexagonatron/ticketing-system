//Dependencies
var express = require('express');
require ('dotenv').config();

const path = require('path');

// Sets up the Express App
var app = express();

var PORT = process.env.PORT || 3001;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const userRoutes = require("./routes/api-user-routes");
const eventRoutes = require("./routes/api-event-routes");
const transactionRoutes = require("./routes/api-transaction-routes");
const ticketRoutes = require("./routes/api-ticket-routes");

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/tickets", ticketRoutes);

//Handle Prod
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


// Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
      // require("./seeders/utils/addAdmin")();
    });
  });