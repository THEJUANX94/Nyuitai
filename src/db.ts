import { DataSource } from "typeorm";
import { people } from './models/People'
import { users } from './models/User'


export const appDataSource = new DataSource({
    type: "postgres",
    host: "ec2-54-147-36-107.compute-1.amazonaws.com",
    port: 5432,
    username: "rtuucspprifcto",
    password: "50b152d1c35e116cc603539c668d850fd785fc7bd374ff616dfc92d42cf1ee45",
    database: "d6t6ghf7laf4hv",
    synchronize: true,
    logging: true, 
    extra:{
        ssl:{
            rejectUnauthorized: false
        },
    },
    entities: [users, people]
})