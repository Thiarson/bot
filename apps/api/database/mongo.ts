import mongoose, { Mongoose } from "mongoose";
import { mongoUrl } from "@config/mongo.config";

export async function connectToMongo(): Promise<Mongoose> {
    if (!mongoUrl) throw new Error("MONGODB_URI env var is required");

    return mongoose.connect(mongoUrl)
        .then((mongo) => {
            mongoose.connection.on("connected", () => { console.log("Mongo connected") });
            mongoose.connection.on("error", () => { console.log("Mongo connection error") });
            mongoose.connection.on("disconnected", () => { console.log("Mongo disconnected") });

            return mongo;
        });
}
