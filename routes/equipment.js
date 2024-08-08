const express = require("express");
const mongoose = require("mongoose");
const Equipment = require("../models/Equipment");
const equipmentRepository = require("../repositories/equipment");
const borrowedItemsRepository = require("../repositories/borrowedItems");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    let name = req.query.name;
    let equipmenttype = req.query.equipmenttype;
    let brand = req.query.brand;
    let matter = req.query.matter;
    let inventoryType = req.query.inventorytype;
    let description = req.query.description;
    let dateacquired = req.query.dateAcquired;
    let remarks = req.query.remarks;
    let department = req.query.department;
    let location = req.query.location;
    let availability = req.query.availability;
    let populateQuery = [{ path: "type", select: "name" }];
    let query = { dis: true };

    if (name) query.name = { $regex: name, $options: "i" };
    if (equipmenttype) query.equipmentType = equipmenttype;
    if (brand) query.brand = { $regex: brand, $options: "i" };
    if (matter) query.matter = matter;
    if (inventoryType) query.inventorytype = inventoryType;
    if (description) query.description = { $regex: description, $options: "i" };
    if (dateacquired) {
      const [start, end] = dateacquired.includes("|")
        ? dateacquired.split("|").map((date) => new Date(date))
        : [new Date(dateacquired), new Date()];
      query.dateAcquired = {
        $gte: start,
        $lte: end,
      };
    }
    if (remarks) query.remarks = remarks;
    if (department) query.department = department;
    if (location) query.location = location;
    if (availability) query.availability = availability;

    let [equipments, total] = await Promise.all([
      Equipment.find(query)
        .limit(limit)
        .skip(limit * (page - 1)),
      Equipment.find(query).count(),
    ]);
    res.json({
      data: equipments,
      total: total,
      message: "success get",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getavailableequipment", async (req, res) => {
  try {
    let { department, availability = "available", page = 1, limit = 100 } = req.query;

    let query = {
      // availability: availability,
      department: department,
    };
    let [equipments, total] = await equipmentRepository.getEquipmentByQuery(query, limit, page);
    let borrowedItemIds = equipments.map((x) => x._id);
    let currentBorrowedItems = await borrowedItemsRepository.getBorrowedItemsByEquipmentIds(
      borrowedItemIds,
      limit,
      page,
      ""
    );

    let filtered = currentBorrowedItems
      .map((x) => x.itemborrowed)
      .flat(1)
      .filter((item) => !["returned", "rejected"].includes(item.status));

    equipments = equipments
      .map((item) => {
        let found = filtered.find((x) => x.equipment.toString() == item._id.toString());
        if (found && item.quantity > found.quantity) {
          item.quantity = item.quantity - found.quantity;
        } else if (found) {
          item.availability = "borrowed";
        }

        return item;
      })
      .filter((x) => x.availability != "borrowed");

    console.log([...new Set(filtered.map((x) => x.equipment))]);

    res.json({
      data: equipments,
      message: "success getting available equipments",
      success: true,
      total: equipments.length,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getbrandlist", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    let equipmenttype = req.query.equipmenttype;
    let query = {};

    if (equipmenttype) query.equipmentType = equipmenttype;

    let [brandlist, total] = await Promise.all([
      Equipment.find(query).distinct("brand"),
      Equipment.find({ dis: true }).count(),
    ]);

    // res.json({ data: brandlist, message:  "success get brands", success: true });

    res.json({
      data: brandlist,
      total: total,
      message: "success get",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getmatterlist", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    let [brandlist, total] = await Promise.all([Equipment.distinct("matter"), Equipment.find({ dis: true }).count()]);

    res.json({
      data: brandlist,
      total: total,
      message: "success get",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getequipmenttype", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    let [brandlist, total] = await Promise.all([
      Equipment.distinct("equipmentType"),
      Equipment.find({ dis: true }).count(),
    ]);

    res.json({
      data: brandlist,
      total: total,
      message: "success get",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getinventorytypelist", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    let [brandlist, total] = await Promise.all([
      Equipment.distinct("inventorytype"),
      Equipment.find({ dis: true }).count(),
    ]);

    res.json({
      data: brandlist,
      message: "success get",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getremarks", async (req, res) => {
  try {
    let [remarks] = await Promise.all([Equipment.distinct("remarks"), Equipment.find({ dis: true }).count()]);

    res.json({ data: remarks, message: "success get", success: true });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getbynameasc", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    let [ascedingnamelist, total] = await Promise.all([
      Equipment.find({ dis: true }, { name: 1 })
        .sort({ name: 1 })
        .limit(limit)
        .skip(limit * (page - 1)),
      Equipment.find({ dis: true }).count(),
    ]);

    res.json({
      data: ascedingnamelist,
      total: total,
      message: "success get",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getbynamedesc", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    let [descendingnamelist, total] = await Promise.all([
      Equipment.find({ dis: true }, { name: 1 })
        .sort({ name: -1 })
        .limit(limit)
        .skip(limit * (page - 1)),
      Equipment.find({ dis: true }).count(),
    ]);

    res.json({
      data: descendingnamelist,
      total: total,
      message: "success get",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getbycolorasc", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    let [ascendingcolorlist, total] = await Promise.all([
      Equipment.find({ dis: true }, { color: 1 })
        .sort({ color: 1 })
        .limit(limit)
        .skip(limit * (page - 1)),
      Equipment.find({ dis: true }).count(),
    ]);

    res.json({
      data: ascendingcolorlist,
      total: total,
      message: "success get",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getbycolordesc", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    let [descendingcolorlist, total] = await Promise.all([
      Equipment.find({ dis: true }, { color: 1 })
        .sort({ color: -1 })
        .limit(limit)
        .skip(limit * (page - 1)),
      Equipment.find({ dis: true }).count(),
    ]);

    res.json({
      data: descendingcolorlist,
      total: total,
      message: "success get",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.post("/", async (req, res) => {
  try {
    // let {
    //   authorize,
    //   uploadFile,
    //   createNewFolder,
    //   compressImage,
    //   thumbSizeUpload,
    //   midSizeUpload,
    //   convertImage,
    //   fetchImage,
    //   toThumbnail,
    //   toMidSize,
    //   initializeVariable,
    //   getThumbnailURL,
    //   getMidSizeURL,
    // } = require("../scripts/uploadEquipment");

    // let data = await req.body;
    // let directory = {
    //   Inventory: "16Hn6FnhtPplQaLiMXKPIqMWBjoY7l6T4",
    //   Non_Inventory: "1PN3cEnrDHW0LmVvAJEjNEMASBpdizTES",
    // };

    // let URL = await data.images.Url;
    // let mainFolder = "";

    // console.log("Current URL: " + URL);
    // if (data.description === "Inventory") {
    //   mainFolder = directory.Inventory;
    // } else {
    //   mainFolder = directory.Non_Inventory;
    // }
    // let department = data.department;
    // let nameEquipment = data.equipmentType;

    // await initializeVariable(department, nameEquipment, URL, mainFolder);
    // await compressImage();

    // let thumbnailUrl = await getThumbnailURL();
    // let midSizeUrl = await getMidSizeURL();

    // // thumbnailUrl, midSizeUrl = await getURL();

    // console.log("Thumbnail Url : " + thumbnailUrl);

    // data.images.thumbnailUrl = thumbnailUrl;
    // data.images.midSizeUrl = midSizeUrl;


    let data = await req.body;
    let result = await equipmentRepository.createEquipment(data)
    res.json({
      data: result,
      message: "success creating equipment",
      success: true,
    });
  } catch (err) {
    res.status(400).json({ data: null, message: err.message, success: false });
  }
});

router.get("/getdepartmentlist", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    let [departmentlist, total] = await Promise.all([
      Equipment.distinct("department"),
      Equipment.find({ dis: true }).count(),
    ]);

    res.json({
      data: departmentlist,
      total: total,
      message: "success get",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getlocationlist", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    let [locationlist, total] = await Promise.all([
      Equipment.distinct("location"),
      Equipment.find({ dis: true }).count(),
    ]);

    res.json({
      data: locationlist,
      message: "success get",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    let less = req.body;
    let id = req.params.id;
    await Equipment.findByIdAndUpdate(id, less);
    res.json({
      data: less,
      message: "success update equipment",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await Equipment.findByIdAndUpdate(id, { dis: false });
    res.json({ data: null, message: "success remove", success: true });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

/**
 * free search query search using $regex in "like" expression
 */
router.get("/search", async (req, res) => {
  try {
    let searchword = req.query.search;
    let equipments = await Equipment.find({
      $or: [{ name: { $regex: searchword, $options: "i" } }, { description: { $regex: searchword, $options: "i" } }],
    });
    res.json({ data: equipments, message: "success search", success: true });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

module.exports = router;
