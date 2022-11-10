"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const People_1 = require("./models/People");
const User_1 = require("./models/User");
exports.appDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "ec2-54-147-36-107.compute-1.amazonaws.com",
    port: 5432,
    username: "rtuucspprifcto",
    password: "50b152d1c35e116cc603539c668d850fd785fc7bd374ff616dfc92d42cf1ee45",
    database: "d6t6ghf7laf4hv",
    synchronize: true,
    logging: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        },
    },
    entities: [User_1.users, People_1.people]
});
