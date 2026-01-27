import db from "../config/db.js";

export const findUser = async (email)=> {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?", 
        [email]
    );
    return rows;
};

export const CreateUser = async (username,email,password)=> {
    return await db.query(
        "INSERT INTO users (username, email, password) VALUE ( ?,?,? )",
        [username,email,password]
    );
};