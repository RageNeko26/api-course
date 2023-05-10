"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.syncUserModel = exports.checkUserModel = void 0;
const { Sequelize: ORMUser, DataTypes: TypeUser } = require('sequelize');
// For hashing password
const bcrypt = require('bcrypt');
const ormUser = new ORMUser('course_api', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
// Salt rounds
const salt = 10;
;
const User = ormUser.define('sus_users', {
    email: {
        type: TypeUser.STRING(20),
        allowNull: false,
    },
    password: {
        type: TypeUser.STRING(255),
        allowNull: false,
    },
    name: {
        type: TypeUser.STRING(50),
        allowNull: false,
    },
    gender: {
        type: TypeUser.STRING(10),
        allowNull: false,
    },
    role: {
        type: TypeUser.INTEGER(2),
        allowNull: false,
        defaultValue: 0
    }
});
;
const checkUserModel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ormUser.authenticate();
        console.log(`Connection to database is successfull`);
    }
    catch (err) {
        console.log(`Failed to connect database ${err}`);
    }
});
exports.checkUserModel = checkUserModel;
const syncUserModel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ormUser.sync();
        console.log(`Table sus_users is created`);
    }
    catch (err) {
        console.log(`Can't create table sus_users`);
    }
});
exports.syncUserModel = syncUserModel;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const successResponse = {
            message: 'Pendaftaran berhasil!',
            success: true,
            status: 201
        };
        const hash = yield bcrypt.hash(req.body.password, salt);
        yield User.create({
            email: req.body.email,
            password: hash,
            name: req.body.name,
            gender: req.body.gender,
        });
        res.end(JSON.stringify(successResponse, null, 2));
    }
    catch (err) {
        const failResponse = {
            message: `${err}`,
            success: false,
            status: 403,
        };
        res.end(JSON.stringify(failResponse, null, 2));
    }
});
exports.registerUser = registerUser;
