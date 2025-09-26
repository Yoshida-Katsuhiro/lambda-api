// app.js
require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const serverless = require('serverless-http');
const app = express();

// ▼ 追加: リクエストボディをJSONとして解析するためのミドルウェア
app.use(express.json());

const dbConfig = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
};

// 全ての商品を取得するAPI (既存)
app.get('/products', (req, res) => {
  const connection = mysql.createConnection(dbConfig);
  connection.connect(err => {
    if (err) {
      return res.status(500).json({ error: 'Database connection failed' });
    }
    connection.query('SELECT * FROM Product', (error, results) => {
      connection.end();
      if (error) {
        return res.status(500).json({ error: 'Query failed' });
      }
      res.json(results);
    });
  });
});

// ▼ 追加: 新しい商品をデータベースに挿入するAPI
app.post('/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'name and price are required' });
  }

  const connection = mysql.createConnection(dbConfig);
  connection.connect(err => {
    if (err) {
      return res.status(500).json({ error: 'Database connection failed' });
    }
    const query = 'INSERT INTO Product (name, price) VALUES (?, ?)';
    connection.query(query, [name, price], (error, results) => {
      connection.end();
      if (error) {
        return res.status(500).json({ error: 'Query failed' });
      }
      res.status(201).json({ message: 'Product created successfully', id: results.insertId });
    });
  });
});

// ▼ 追加: 指定されたIDの商品を削除するAPI
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  
  const connection = mysql.createConnection(dbConfig);
  connection.connect(err => {
    if (err) {
      return res.status(500).json({ error: 'Database connection failed' });
    }
    const query = 'DELETE FROM Product WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      connection.end();
      if (error) {
        return res.status(500).json({ error: 'Query failed' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    });
  });
});

// ExpressアプリをLambdaのハンドラーとしてラップ (既存)
exports.handler = serverless(app);