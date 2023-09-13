import mongoose from "mongoose";

const run = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      `mongodb://${process.env.URL_DATABASE}:${process.env.PORT_DATABASE}/`
    );
    console.log("Connection to the db successful.");
  } catch (error) {
    console.log(error.message);
  }
};

export { run };
