
import connectDB from "./src/db/index.js";

import {app} from "./app.js";
const port = 5000 || 8000;


connectDB()
.then(() => {
  app.listen(port || 8000, () => {
      console.log(`⚙️ Server is running at port : ${port}`);
  })
})
.catch((err) => {
  console.log("MONGO db connection failed !!! ", err);
})

