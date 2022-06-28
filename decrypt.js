const { AES } = require("crypto-js");
let CryptoJS = require("crypto-js");

module.exports = {


  decryptBody: (req, res, next) => {
    try {
      var data = req.body.data;
      console.log(data);
      var body = CryptoJS.AES.decrypt(data, "841235432344ADRA");
      var parseBody = body.toString(CryptoJS.enc.Utf8);
      console.log(parseBody);
      req.body = JSON.parse(parseBody);
      next()
    }catch(ex){
      res.json({ status: false, message: "exception occured" });
    }
  }
}