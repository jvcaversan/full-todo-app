import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connection = mongoose.connect(
      "mongodb+srv://joaovitorcaversan:A5FDzyWfbcWtoXm0@cluster0.c3vxwzc.mongodb.net/blossom-app?retryWrites=true&w=majority&appName=Cluster0"
    );
    if (connection) {
      console.log("Connected");
    }
  } catch (error) {
    console.log("error ao conectar ao banco de dados", error);
  }
};

export default dbConnect;
