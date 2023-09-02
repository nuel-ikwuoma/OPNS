const { BadRequestError, NotFoundError } = require("../errors");
const ethers = require("ethers");
const Address = require("../models/address");
const keccak256 = require("keccak256");
const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

const addNumber = async (req, res) => {
    const { phone, address } = req.body;

    // check if they provided all values
    if (!phone || !address) {
        throw new BadRequestError(
            "Please provide a valid phone number and address"
        );
    }

    const phoneNumberHash = await keccak256(phone).toString("hex");

    // check if number exist
    const phoneNumberHashExist = await Address.findOne({ phoneNumberHash });
    if (phoneNumberHashExist) {
        throw new BadRequestError(
            "Phone number already exist, please use another"
        );
    }

    // Generate a random 6-digit verification code and add too body
    let code = Math.floor(Math.random() * 900000) + 100000;
    code = code.toString();
    // Set the expiration time to 10 minutes from now
    const expiration = Date.now() + 1000 * 60 * 10;

    // create otp in body
    const otp = [code, expiration];

    // update db with phoneNumberHash provide and insert otp
    req.body.otp = otp;
    req.body.phoneNumberHash = phoneNumberHash;

    // create address
    await Address.create(req.body);

    await client.messages.create({
        body: code,
        from: "+13343842164",
        to: phone,
    });

    res.status(200).json({
        msg: "Created",
    });
};

const sendCode = async (req, res) => {
    // get phoneNumberHash from query
    const { phone, resend } = req.query;

    const phoneNumberHash = await keccak256(phone).toString("hex");
    // check if phoneNumberHash is provided
    if (!phoneNumberHash) {
        throw new BadRequestError("Please provide a valid phone number hash");
    }

    // check if address exist
    const address = await Address.findOne({ phoneNumberHash });
    if (!address) {
        throw new NotFoundError(
            `address with this phone number hash does not exist.`
        );
    }
    if (address.isVerified) {
        return res.json({ msg: "Verified already" });
    }
    if (address.otp[0] && (resend == "no" || !resend)) {
        return res.json({ msg: "Sent already" });
    }

    // Generate a random 6-digit verification code and add too body
    let code = Math.floor(Math.random() * 900000) + 100000;
    code = code.toString();
    // Set the expiration time to 10 minutes from now
    const expiration = Date.now() + 1000 * 60 * 10;

    // create otp in body
    const otp = [code, expiration];
    // update db with phoneNumberHash provide and insert otp
    address.otp = otp;
    await address.save();

    await client.messages.create({
        body: code,
        from: "+13343842164",
        to: phone,
    });

    res.json({ msg: "sent" });
};

const verifyCode = async (req, res) => {
    const { code, phoneNumberHash } = req.query;

    // check if they provided all values
    if (!phoneNumberHash || !code) {
        throw new BadRequestError(
            "Please provide a valid phone number hash and otp code"
        );
    }

    // get address info
    const address = await Address.findOne({ phoneNumberHash });
    // check if address exist in db
    if (!address) {
        throw new NotFoundError(
            `address with this phone number hash does not exist.`
        );
    }

    // Check if the code is correct
    if (code !== address.otp[0]) {
        throw new BadRequestError("The code provided is incorrect");
    }
    // Check if the code has expired
    if (Date.now() > address.otp[1]) {
        throw new BadRequestError("Code has expired, Request a new one");
    }

    // if phoneNumberHash is unverified change to verified
    if (!address.isVerified) {
        address.isVerified = true;
    }
    // Save updates
    await address.save();

    res.json({
        msg: "The code you entered is correct",
    });
};

const getNumber = async (req, res) => {
    const { hash } = req.query;
    if (!hash) {
        throw new BadRequestError("No hash provided");
    }

    const number = await Address.findOne({ phoneNumberHash: hash });

    if (!number) {
        throw new BadRequestError("No number found");
    }
};

module.exports = {
    addNumber,
    sendCode,
    verifyCode,
    getNumber,
};
