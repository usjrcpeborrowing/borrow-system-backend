const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    name: {
        firstName: {
            type: String,
        },
        middleName: {
            type: String,
        },
        lastName: {
            type: String,
        }
    },
    age: {
        type: Number,
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: "userTypes",
    },
    department: {
        type: mongoose.Types.ObjectId,
        ref: "department",
    },
    dis: {
        type: Boolean,
        default: true,
    }
    
});

module.exports = mongoose.model("users", userSchema);