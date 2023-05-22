"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express 
const express_1 = __importDefault(require("express"));
// Validator middleware
const ValidateLogin_1 = __importDefault(require("./middlewares/ValidateInput/ValidateLogin"));
const ValidateRegister_1 = __importDefault(require("./middlewares/ValidateInput/ValidateRegister"));
// User Model
const ConfigUserModel_1 = require("./models/User/ConfigUserModel");
const Login_1 = __importDefault(require("./models/User/Login"));
const Register_1 = __importDefault(require("./models/User/Register"));
// Auth Token
const Auth_1 = __importDefault(require("./routes/Auth"));
// Cors for using resource in cross domain
const cors = require('cors');
// Module for parsing payload
const bodyParser = require('body-parser');
const multer = require('multer');
// Validation result
const { validationResult } = require('express-validator');
// HTTP Payload Parser
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const jsonPayload = bodyParser.json();
// Initialize Express
const app = (0, express_1.default)();
// Port number
const port = 3000;
// Defining Model Database
(0, ConfigUserModel_1.checkUserModel)();
(0, ConfigUserModel_1.syncUserModel)();
// Using payload parser in Express
app.use(urlEncodedParser);
app.use(jsonPayload);
// Using Cors middleware
app.use(cors());
// API Route
app.post('/api/register', ValidateRegister_1.default, Register_1.default);
app.post('/api/login', ValidateLogin_1.default, Login_1.default);
app.get('/api/auth/:token', Auth_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
