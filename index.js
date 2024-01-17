const getParameters = require("./getParameters");
const readAndParseDICOMFile = require("./readAndParseDICOMFile");
const rasterizeSegments = require("./rasterizeSegments");
const validateDICOMSEG = require("./validateDICOMSEG");

try {
  const params = getParameters();
  const data = readAndParseDICOMFile(params.inputFile);
  validateDICOMSEG(data);
  rasterizeSegments(data);
} catch (ex) {
  console.log("Exception:", ex);
}
