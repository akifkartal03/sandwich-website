const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const categoriesRouter = require("./routes/categories");
const ingredientsRouter = require("./routes/ingredients");
const recipesRouter = require("./routes/recipes");
const usersRouter = require("./routes/users");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/categories", categoriesRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/recipes", recipesRouter);
app.use("/users", usersRouter);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

export default app;
