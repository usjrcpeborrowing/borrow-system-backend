const Users = require("../models/Users");

const getChairman = async (dept) => {
  let query = {
    department: { $in: [dept] },
    role: { $in: ["chairman"] },
  };
  return await Users.findOne(query);
};

const getOIC = async (dept) => {
  let query = {
    department: { $in: [dept] },
    role: { $in: ["oic"] },
  };
  return await Users.findOne(query);
};

const getAdministrator = async () => {
  let query = {
    role: { $in: ["administrator"] },
  };
  return await Users.findOne(query);
};

const findUserBySchoolId = async (schooldId) => {
  let query = {
    schoolId: schooldId,
  };
  return await Users.findOne(query);
};

const findUserBySchoolIdAndPassword = async (schooldId, password) => {
  let query = {
    schoolId: Number(schooldId),
    password,
  };
  return await Users.findOne(query).lean();
};

const getFacultyUsersByDepartment = async (department, search) => {
  let query = {
    $or: [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
    ],
    department: { $in: department },
    role: { $in: ['faculty'] },
  };

  return await Users.find(query).select("firstName lastName department").lean();
};

module.exports = {
  getChairman,
  getOIC,
  getAdministrator,
  findUserBySchoolId,
  findUserBySchoolIdAndPassword,
  getFacultyUsersByDepartment,
};
