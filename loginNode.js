var http = require("http");
var fs = require("fs");
var querystring = require("querystring");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
http.createServer(function (req, res) {
    if (req.url === "/") {
        /* res.writeHead(200, {
            "Content-Type": "text/html"
        });
        fs.createReadStream("Index.html", "UTF-8").pipe(res); */
        /* fs.readFile('Index.html', function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Content-Length': data.length
            });
            res.write(data);
            res.end();
        }); */
    }
    if (req.method === "POST") {
        var data = "";
        // data will be stored in the chunk
        req.on("data", function (chunk) {
            data += chunk;
        });
        req.on("end", function (chunk) {
            MongoClient.connect("mongodb://localhost:27017/", function (err, client) {
                if (err) throw err;
                var db = client.db('demo');
                var q = querystring.parse(data);
                console.log('q :: ' + JSON.stringify(data, null, 2));
                console.log('q :: ' + JSON.stringify(q, null, 2));
                db.collection('democollection').insertOne(q, function (findErr, result) {
                    if (findErr) throw findErr;
                    console.log(result);
                  //  client.close();
                });
            });
        });
    }
}).listen(3007);
console.log("Server started on 3007 port::::::::");
