const connectDB = require("./db");
const User = require("./models/User");

const run = async () => {
  await connectDB();

  // Clear collection for demo
  await User.deleteMany({});

  // Insert sample users
  await User.create([
    { name: "Alice", email: "alice@example.com", age: 25, city: "Chennai" },
    { name: "Bob", email: "bob@example.com", age: 30, city: "Bangalore" },
    { name: "Charlie", email: "charlie@example.com", age: 25, city: "Chennai" },
    { name: "Alice", email: "alice2@example.com", age: 28, city: "Mumbai" }
  ]);

  console.log("Users inserted.");

  // Query using index - find users living in chennai
  const usersInChennai = await User.find({ city: "Chennai" });
  console.log("Users in Chennai:", usersInChennai);

  // Query using compound index (name + age)
  const alice25 = await User.find({ name: "Alice", age: 25 });
  console.log("Alice, 25:", alice25);

  // View indexes
  const indexes = await User.collection.getIndexes();
  console.log("Indexes:", indexes);

  process.exit();
};

run();
