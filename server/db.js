import mongoose from "mongoose";

const mongoUrl = "mongodb://localhost:27017/Spotify"
// const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@spotify.brmz2.mongodb.net`;

mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on("connected", () => console.log("Connected to MongoDB server"));

db.on("error", (err) => console.error(`MongoDB error: ${err}`));

db.on("disconnected", () => console.log("Disconnected from MongoDB server"));

export default db;