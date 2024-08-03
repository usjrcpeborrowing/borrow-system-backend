const mongoose = require("mongoose");
const Equipment = require("../models/Equipment");
const fast_csv = require("fast-csv");
const fs = require("fs");

(async () => {
  let stream = fs.createReadStream("./civil-inventory.csv");
  let equipment = await csvRead(stream);
  console.log(equipment[0]);
  await connectDB();
  await delay(addEquipment(equipment[0]));
})();

async function connectDB() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect("mongodb://127.0.0.1:27017/cpeborrowing");
    console.log("database connected");
  } catch (err) {
    console.log(err.message);
  }
}

async function addEquipment(equipment) {
  try {
    let result = await Equipment.create({
      serialNo: equipment["Serial #"].trim(),
      equipmentType: "transit",
      name: toProperCase(equipment["Description"]),
      brand: toProperCase(equipment['Brand']),
      color: "",
      modelNo: toProperCase(equipment['Model']),
      quantity: toProperCase(equipment['Quantity']),
      unit: equipment['Unit'].toLowerCase(),
      condition: "functional".toLowerCase(),
      department: "civil engineering",
      inventorytag: true,
    });
    console.log("new equipment created with id:", result._id);
  } catch (err) {
    console.log(err);
  }
}

async function delay(fn, params) {
  return new Promise((resolve) => {
    setTimeout(async () => resolve(await fn), 50);
  });
}

function toProperCase(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (s) => s.toUpperCase());
}

async function csvRead(stream) {
  return new Promise((resolve) => {
    let data = [];
    const options = { headers: true };

    fast_csv
      .parseStream(stream, options)
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", function (err) {
        // console.log({ err });
      });
  });
}
