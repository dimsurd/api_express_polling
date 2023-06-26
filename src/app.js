require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const pollingRoutes = require("./routes/pollings");
const pollingOptionsRoutes = require("./routes/polling_options");

app.use(express.json());
app.listen(PORT, (req, res) => {
  console.log(`Server Running on ${PORT}`);
});

app.use("/pollings", pollingRoutes);
app.use("/polling_options", pollingOptionsRoutes);
