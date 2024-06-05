import mongoose from "mongoose";
import colors from "colors";
const connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.DB_URL as string);
    console.log(
      colors.green.bold(
        `Database connected on host ${response.connection.host}`
      )
    );
  } catch (error) {
    console.log(colors.red.bold(`Could not connect to server ${error}`));
  }
};

export default connectDB;
