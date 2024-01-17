const dcmjs = require("dcmjs");
const writeDICOMFile = require("./writeDICOMFile");
const getDICOMValue = require("./getDICOMValue");
const getSegmentColor = require("./getSegmentColor");
const createSEGAccessor = require("./createSEGAccessor");
const secondaryCaptureTemplate = require("./secondaryCaptureTemplate");
const { DicomMetaDictionary } = dcmjs.data;
const syncPatientAndStudyAttributes = require("./syncPatientAndStudyAttributes");

const instance = secondaryCaptureTemplate;

const rasterizedImageFrames = [];

const rasterizeSegments = (data) => {
  syncPatientAndStudyAttributes(instance, data);

  const numSegments = data.dict["00620002"].Value.length;
  let numFrames = getDICOMValue(data.dict, "00280008");
  const rows = getDICOMValue(data.dict, "00280010");
  const columns = getDICOMValue(data.dict, "00280010");
  let numRasterizedFrames = numFrames / numSegments;

  for (let i = 0; i < numRasterizedFrames; i++) {
    rasterizedImageFrames[i] = Buffer.alloc(rows * columns * 3);
    for (let segmentNumber = 0; segmentNumber < numSegments; segmentNumber++) {
      const color = getSegmentColor(data, segmentNumber);
      const segAccessor = createSEGAccessor(data);
      let index = 0;
      for (let y = 0; y < segAccessor.rows; y++) {
        for (let x = 0; x < segAccessor.columns; x++) {
          if (segAccessor.get(segmentNumber, i, x, y)) {
            rasterizedImageFrames[i][index++] = color.R;
            rasterizedImageFrames[i][index++] = color.G;
            rasterizedImageFrames[i][index++] = color.B;
          } else {
            index += 3;
          }
        }
      }
    }

    instance.Rows = rows;
    instance.Columns = columns;
    instance.PixelData[0] = rasterizedImageFrames[i].buffer;
    instance.InstanceNumber = i + 1;
    instance.SOPInstanceUID = DicomMetaDictionary.uid();
    console.log(
      "Writing DICOM File Instance ",
      instance.InstanceNumber,
      "/",
      numRasterizedFrames
    );
    writeDICOMFile(instance);
  }
};

module.exports = rasterizeSegments;
