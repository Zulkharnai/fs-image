
const router = require('express').Router();
const mysql = require('mysql');
const cors = require('cors');
var formidable = require('formidable');
const fs = require('fs');
const path = require('path')

const conn = mysql.createConnection({
    host: "localhost",
    database: "imagestest",
    user: "root",
    password: ""
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

router.use(cors());

//===============================================================================================================================//
// images API's


router.post('/upload', (req, res, next) => {

    
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
  console.log(files);
        var oldpath = files.image.filepath;
        var newpath = "C:\\emullim-test\\Shopping_backend-main\\Shopping_backend-main\\public\\" + files.image.originalFilename;
        console.log(Date);
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          res.send("Done")
        });

  })
});

router.get('/image',  function (req, res) {

    conn.query('SELECT * FROM imagesave', function (err, result, fields) {
        if (err) throw err;
        res.send(result)
    })
});

router.get('/image/:id',  function (req, res) {

    conn.query('SELECT * FROM imagesave WHERE image_id = ?', [req.params.id], function (err, result, fields) {
        if (!err)
            res.send(result);
        else
            console.log(err);
    })

});

router.post('/image',  function (req, res) {
    var {
        first_name, last_name, mobile_number, user_name, password
    } = req.body;

    console.log(title);

    var VALUES = [
        first_name, last_name, mobile_number, user_name, password
    ];

        var sql = "INSERT INTO imagesave(first_name, last_name, mobile_number, user_name, password) VALUES (?,?,?.?,?)";

        
    

    conn.query(sql, [VALUES], function (err, result) {
        if (err) throw err;
        console.log("Number of the record inserted: " + result.affectedRows);
    });

    return res.json({ success: true, message: "You have Inserted the data" });
});

// router.put('/books', verification, function (req, res) {

//     const {
//         title,
//         author,
//         price,
//         user_id,
//         Img_name,
//         Img_url,
//         book_id
//     } = req.body;

//     var sql = `UPDATE book
//     SET title = ?,
//     author = ?,
//     price = ?,
//     user_id = ?,
//     Img_name = ?,
//     Img_url =? 
//     WHERE book_id = ?`;

//     var data = [title,
//         author,
//         price,
//         user_id,
//         Img_name,
//         Img_url,
//         book_id
//     ];

//     conn.query(sql, data, (error, results, fields) => {
//         if (error) {
//             return console.error(error.message);
//         }
//     });

//     res.send("OKk");
// });

// router.delete('/Delete/:id', verification, function (req, res) {

//     conn.query('DELETE FROM book WHERE book_id = ?', [req.params.id], function (err, result, fields) {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             return res.json({ success: true, message: "Book Deleted" });
//         }
//     });

// });



module.exports = router;
