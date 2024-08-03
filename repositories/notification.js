const Notification = require("../models/Notifications");

const createNotification = async (msg, user, type) => {
  let notification = {
    message: msg,
    user: user,
    type: type,
  };
  return await Notification.create(notification);
};

const getNotification = async (query, limit) => {
  return await Notification.find(query).limit(limit);
};

module.exports = { createNotification, getNotification };
