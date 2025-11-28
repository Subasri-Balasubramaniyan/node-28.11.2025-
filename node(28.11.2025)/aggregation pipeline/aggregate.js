const mongoose = require("mongoose");
const User = require("./model/User");

async function runAggregation() {
  await mongoose.connect("mongodb://127.0.0.1:27017/agg-demo");
/* Aggregation pipeline part */
  const result = await User.aggregate([
    {
      $group: {
        _id: "$city",
        totalUsers: { $sum: 1 } 
      }
    }
  ]);

  console.log(result);
  mongoose.disconnect();
}

runAggregation();
