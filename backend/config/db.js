import { connect } from "mongoose";
const dbConnection = async (url) => {
  try {
    await connect(url);
    console.log("db connected ");
  } catch (error) {
    console.log("db connection failed", error.message);
    process.exit(1);
  }
};
export default dbConnection