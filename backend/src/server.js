const emailRoutes = require("./routes/emailRoutes");

app.use("/api/emails", emailRoutes);
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/emailScheduler")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
