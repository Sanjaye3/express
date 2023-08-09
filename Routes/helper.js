import { client } from "../index.js";
import bcrypt from "bcrypt";

export async function updateMovie(id, updateData) {
    return await client.db("movies").collection("movies").updateOne({ id: id }, { $set: updateData });
}
export function deleteMovie(id) {
    return client.db("movies").collection("movies").deleteOne({ id: id });
}
export async function createMovie(addmovie) {
    return await client.db("movies").collection("movies").insertMany(addmovie);
}
export async function getMoviesById(id) {
    return await client.db("movies").collection("movies").findOne({ id: id });
}
export async function getAllMovies(filter) {
    return await client.db("movies").collection("movies").find(filter).toArray();
}

export async function genPassword(pwd){
    const NO_OF_ROUNDS = 10;
    const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
    const hashedPassword = await bcrypt.hash(pwd,salt);
    return hashedPassword;
  }


export async function createUser(newUser){
    return await client.db("movies").collection("users").insertOne(newUser);
}

export async function getUserByName(username){
    return await client.db("movies").collection("users").findOne({ username : username});
}

export async function verifyPassword(password,storePassword){
    return await bcrypt.compare(password,storePassword)
}
