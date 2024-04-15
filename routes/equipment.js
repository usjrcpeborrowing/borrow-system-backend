const express = require("express");
const mongoose = require("mongoose");
const Equipment = require("../models/Equipment");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    let equipmenttype = req.query.equipmenttype;
    let brand = req.query.brand;
    let matter = req.query.matter;
    let description = req.query.description;
    let dateacquired = req.query.dateAcquired;
    let remarks = req.query.remarks;
    let department = req.query.department;
    let populateQuery = [{ path: "type", select: "name" }];
    let query = { dis: true };

    if (equipmenttype) query.equipmenttype = equipmenttype;
    if (brand) query.brand = { $regex: brand, $options: "i" };
    if (matter) query.matter = matter;
    if (description) query.description = { $regex: description, $options: "i" };
    if (dateacquired) query.dateAcquired = dateacquired;
    if (remarks) query.remarks = remarks;
    if (department) query.department = department;

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

router.get("/getbrandlist", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    let [brandlist, total] = await Promise.all([
      Equipment.distinct('brand'),
      Equipment.find({ dis: true }).count(),
    ]);

    res.json({ data: brandlist, total: total, message: "success get", success: true });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getmatterlist", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    let [brandlist, total] = await Promise.all([
      Equipment.distinct('matter'),
      Equipment.find({ dis: true }).count(),
    ]);

    res.json({ data: brandlist, total: total, message: "success get", success: true });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getinventorytypelist", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    let [brandlist, total] = await Promise.all([
      Equipment.distinct('inventorytype'),
      Equipment.find({ dis: true }).count(),
    ]);

    res.json({ data: brandlist, total: total, message: "success get", success: true });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getremarks", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    let [brandlist, total] = await Promise.all([
      Equipment.distinct('remarks'),
      Equipment.find({ dis: true }).count(),
    ]);

    res.json({ data: brandlist, total: total, message: "success get", success: true });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getbynameasc", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    let[ascedingnamelist, total] = await Promise.all([
      Equipment.find({ dis: true }, {name: 1})
      .sort({ name: 1})
      .limit(limit)
      .skip(limit * (page - 1)),
      Equipment.find({ dis: true }).count(),
    ]);

    res.json({ data: ascedingnamelist, total: total, message: "success get", success: true });
  } catch (err) {
      res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getbynamedesc", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    let[descendingnamelist, total] = await Promise.all([
      Equipment.find({ dis: true }, {name: 1})
      .sort({ name: -1})
      .limit(limit)
      .skip(limit * (page - 1)),
      Equipment.find({ dis: true }).count(),
    ]);

    res.json({ data: descendingnamelist, total: total, message: "success get", success: true });
  } catch (err) {
      res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getbycolorasc", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    let[ascendingcolorlist, total] = await Promise.all([
      Equipment.find({ dis: true }, {color: 1})
      .sort({ color: 1 })
      .limit(limit)
      .skip(limit * (page - 1)),
      Equipment.find({ dis: true }).count(),
    ]);

    res.json({ data: ascendingcolorlist, total: total, message: "success get", success: true });
  } catch (err) {
      res.json({ data: null, message: err.message, success: false });
  }
});

router.get("/getbycolordesc", async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    let[descendingcolorlist, total] = await Promise.all([
      Equipment.find({ dis: true }, {color: 1})
      .sort({ color: -1 })
      .limit(limit)
      .skip(limit * (page - 1)),
      Equipment.find({ dis: true }).count(),
    ]);

    res.json({ data: descendingcolorlist, total: total, message: "success get", success: true });
  } catch (err) {
      res.json({ data: null, message: err.message, success: false });
  }
});

router.post("/", async (req, res) => {
  try {
    let {authorize, uploadFile, createNewFolder, compressImage, thumbSizeUpload, midSizeUpload, convertImage, fetchImage, toThumbnail, toMidSize, initializeVariable, getThumbnailURL, getMidSizeURL} = require('../scripts/uploadEquipment');

    let data = await req.body;
    let directory = {
      Inventory: '16Hn6FnhtPplQaLiMXKPIqMWBjoY7l6T4',
      Non_Inventory: '1PN3cEnrDHW0LmVvAJEjNEMASBpdizTES',
    }
     
    let URL = await data.images.Url;
    let mainFolder = "";

    console.log("Current URL: "+ URL);
    if (data.description === "Inventory")
    {
      mainFolder = directory.Inventory;
    }
    else 
    {
      mainFolder = directory.Non_Inventory;
    }
    let department = data.department;
    let nameEquipment = data.equipmentType;

    await initializeVariable(department, nameEquipment,URL,mainFolder);
    await compressImage();

    let thumbnailUrl = await getThumbnailURL();
    let midSizeUrl = await getMidSizeURL();

    // thumbnailUrl, midSizeUrl = await getURL();

    console.log("Thumbnail Url : " + thumbnailUrl);

    data.images.thumbnailUrl = thumbnailUrl;
    data.images.midSizeUrl = midSizeUrl;
    await Equipment.create(data);
    res.json({
      data: data,
      message: "success create",
      success: true,
    });
  } catch (err) {
    res.json({ data: null, message: err.message, success: false });
  }
});

router.patch("/:id", async (req, res) => {
  try {
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
