const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodPartner.model");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {

    const { fullName, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        email
    })

    //check if the user already exists...........
    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    //hashing the password.......................
    const hashedPassword = await (bcrypt.hash(password, 10));

    //create a new user.........................
    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    //token generate...............
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token)

    res.status(201).json({
        message: "User Registered Successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({
        email
    })

    if (!user) {
        res.status(400).json({
            message: "Invalied email or password"
        })
    }

    const isPasswordValied = await bcrypt.compare(password, user.password);

    if (!isPasswordValied) {
        res.status(400).json({
            message: "Invalied email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token)

    res.status(200).json({
        message: "User Login Successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}
//user Logout section.......................
function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User LogOut Successfully"
    })
}

//Food Pertner Section........................................................................................................


async function registerFoodPartner(req, res) {
    const { name, email, password, phone, address, contactName } = req.body;

    const isAccountAlreadyExist = await foodPartnerModel.findOne({
        email
    })

    if (isAccountAlreadyExist) {
        return res.status(400).json({
            message: "Food Pertner Account already exists"
        })
    }

    //hashing the password...............
    const hashedPassword = await (bcrypt.hash(password, 10));

    //create a new user..............
    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        contactName

    })

    //token generate...............
    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token)

    res.status(201).json({
        message: "Food Partner Registered Successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            fullName: foodPartner.name,
            address: foodPartner.address,
            contactName: foodPartner.contactName,
            phone: foodPartner.phone
        }
    })
}

//Food partner login section....................
async function loginFoodPartner(req, res) {
    const { email, password } = req.body;
    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if (!foodPartner) {
        res.status(400).json({
            message: "Invalied email or password"
        })
    }

    const isPasswordValied = await bcrypt.compare(password, foodPartner.password);

    if (!isPasswordValied) {
        res.status(400).json({
            message: "Invalied email or password"
        })
    }

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token)

    res.status(200).json({
        message: "Food Partener Login Successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            fullName: foodPartner.name
        }
    })
}

//Food Partner logout section.............
function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "Food Partner LogOut Successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}