import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "favetti159",
    database: "hotel"
});
