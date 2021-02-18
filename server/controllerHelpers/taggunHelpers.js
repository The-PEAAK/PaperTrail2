const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const FormData = require("form-data");


function createFormData(filePath) {
    const filename = path.basename(filePath);
    const fileStream = fs.createReadStream(filePath, { autoClose: true });
    const formData = new FormData();
  
    // Add any other POST properties that you require
    formData.append("file", fileStream, {
      filename,
      contentType: getContentType(filePath),
    });
  
    formData.append("refresh", "false");
  
    return formData;
  }

function getContentType(filePath) {
    const fileExt = path.extname(filePath);
    switch (fileExt.toLocaleLowerCase()) {
      case ".png":
        return "image/png";
      case ".pdf":
        return "application/pdf";
      default:
        return "image/jpg";
    }
  }


module.exports = {
  createFormData,
  getContentType
};