import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: '172.17.0.2',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'BANCO_DADOS_IT_TALENT',
}).promise();

export async function getAlunos(){
    const result = await pool.query(`SELECT * FROM ALUNOS;`);
    return result[0];
}

export async function getAluno(id){
    const result = await pool.query(`
    SELECT * 
    FROM ALUNOS
    WHERE id = ?;
    `, [id]);
    return result[0];
}

export async function createAluno(nome, idade, cidade){
    const result = await pool.query(`
    INSERT INTO ALUNOS (nome, idade, cidade)
    VALUES (?, ?, ?);
    `, [nome, idade, cidade]);
    const id = result[0].insertId;
    return getAluno(id);
}