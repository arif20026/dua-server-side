const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to SQLite database
const db = new sqlite3.Database('./dua_main.sqlite');

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3002'
  }));

// Endpoint to fetch categories
app.get('/categories', (req, res) => {
    db.all('SELECT * FROM category', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/duas', (req, res) => {
    db.all('SELECT * FROM dua', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Endpoint to fetch duas for a subcategory
app.get('/duas/:categoryId', (req, res) => {
    const subcategoryId = req.params.categoryId;
    db.all('SELECT dua.* FROM dua INNER JOIN category ON dua.cat_id = category.id WHERE category.id = ?', [subcategoryId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});
app.get('/subcategories', (req, res) => {
    db.all('SELECT * FROM sub_category', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});


// // Endpoint to fetch subcategories for a category
// app.get('/subcategories/:categoryId', (req, res) => {
//     const categoryId = req.params.categoryId;
//     db.all('SELECT * FROM sub_category WHERE cat_id = ?', [categoryId], (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json(rows);
//     });
// });

// Endpoint to fetch duas for a subcategory
// app.get('/duas/:subcategoryId', (req, res) => {
//     const subcategoryId = req.params.subcategoryId;
//     db.all('SELECT dua.* FROM dua INNER JOIN sub_category ON dua.sub_cat_id = sub_category.id WHERE sub_category.id = ?', [subcategoryId], (err, rows) => {
//         if (err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json(rows);
//     });
// });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
