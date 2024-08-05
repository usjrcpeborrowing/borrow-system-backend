const Users = require("../models/Users");
const stringservice = require("../shared/stringservice");
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
    role: { $in: ["faculty"] },
  };

  return await Users.find(query).select("firstName lastName department").lean();
};

const createUser = async (data) => {
  const user = {
    ...data,
    firstName: stringservice.toProperCase(data.firstName),
    middleName: stringservice.toProperCase(data.middleName),
    lastName: stringservice.toProperCase(data.lastName),
  };
  return await Users.create(user);
};

const updateUser = async (userid, update) => {
  return await Users.findByIdAndUpdate(userid, update);
};

module.exports = {
  getChairman,
  getOIC,
  getAdministrator,
  findUserBySchoolId,
  findUserBySchoolIdAndPassword,
  getFacultyUsersByDepartment,
  createUser,
  updateUser
};
