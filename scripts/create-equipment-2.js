const mongoose = require("mongoose");
const Equipment = require("../models/Equipment");
const fast_csv = require("fast-csv");
const fs = require("fs");

(async () => {
  let stream = fs.createReadStream("./civil-inventory.csv");
  let equipment = await csvRead(stream);
  console.log(equipment[0]);
  await connectDB();
  
  for(let eq of equipment) {
    await delay(addEquipment(eq));
  }
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
      brand: toProperCase(equipment["Brand"]),
      color: "",
      modelNo: toProperCase(equipment["Model"]),
      quantity: toProperCase(equipment["Quantity"]),
      unit: equipment["Unit"].toLowerCase(),
      condition: getCondition(equipment),
      status: getStatus(equipment),
      location: toProperCase(equipment["Location"]),
      department: ["civil engineering"],
      inventorytype: "inventory",
      inventorytag: true,
    });
    console.log("new equipment created with id:", result._id);
  } catch (err) {
    console.log(err);
  }
}

function getCondition(equipment) {
  if (equipment["Remarks/Action Taken"].length) return "functional";
  else return "defective";
}

function getStatus(equipment) {
  if (equipment["A"].length) return "acquired";
  else if (equipment["R"].length) return "turned_over";
  else return "o";
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
