var mongoose = require("mongoose");
require("./mekansema");
var dbURI = "mongodb://localhost/mekanbul";
//var dbURI= "mongodb+srv://hakan:29467585028Fb*@mekanbul.wbefyny.mongodb.net/mekanbul?retryWrites=true&w=majority";
mongoose.connect(dbURI);

function kapat(msg, callback) {
    mongoose.connection.close(function() {
        console.log(msg);
        callback;
    });
}

process.on("SIGINT", function() {
    kapat("Uygulama Kapatıldı!", function() {
        process.exit(0);
    });
});

mongoose.connection.on("connected", function() {
    console.log(dbURI + " adresindeki veritabanına bağlandı! \n")
});

mongoose.connection.on("disconnected", function() {
    console.log(dbURI + " adresindekii veritabanı bağlantısı koptu! \n")
});

mongoose.connection.on("error", function() {
    console.log("Bağlantı Hatası!")
});