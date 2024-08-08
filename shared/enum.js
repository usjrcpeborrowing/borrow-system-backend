const roles = [
  "student",
  "reads",
  "oic",
  "faculty",
  "chairman",
  "administrator",
];

const departments = ["computer_engineering", "civil_engineering", "electrical_engineering"];

const equipment_availability = ["available", "borrowed", "unreturned"];
const equipment_condition = ["functional", "defective", "obsolete", "lost"];
const equipment_status = ["acquired", "returned", "o"];
module.exports = {
  roles,
  departments,
  equipment_availability,
  equipment_condition,
  equipment_status
};
