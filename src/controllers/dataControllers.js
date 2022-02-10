import db from "../db.js";
import data from "../data/index.js"
export async function getData(req,res){
  try{
    const paintings = await db.collection("Quadros").find({}).toArray();
    res.status(200).send(paintings);
  }catch{
    res.sendStatus(500);
  }
}
export async function insertData(req,res){
  try{
    await db.collection("Quadros").insertMany(data);
    res.sendStatus(201);
  }catch{
    res.sendStatus(500);
  }
}