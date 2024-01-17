const dcmjs = require("dcmjs");
const { DicomMetaDictionary } = dcmjs.data;

const secondaryCaptureTemplate = {
  // Patient Module
  PatientName: "",
  PatientID: "",
  PatientBirthDate: "",
  PatientSex: "",
  // General Study Module
  StudyInstanceUID: DicomMetaDictionary.uid(),
  StudyDate: "",
  StudyTime: "",
  StudyID: "",
  AccessionNumber: "",
  // General Series Module
  Modality: "OT", //  OT = Other
  SeriesInstanceUID: DicomMetaDictionary.uid(),
  SeriesNumber: 1,
  SeriesDescription: "Rasterized Segmentation",
  // SC Equipment Module
  ConversionType: "SYN",
  // General Image Module
  ImageType: ["DERIVED", "SECONDARY"],
  InstanceNumber: 1,
  // Image Pixel
  SamplesPerPixel: 3, // 3 for color
  PhotometricInterpretation: "RGB", // 0 = black, RGB for color
  PlanarConfiguration: 0, // not planar (RGBRGBRGB not RRRGGGBBB)
  //NumberOfFrames: 1,
  Rows: 128,
  Columns: 128,
  BitsAllocated: 8,
  BitsStored: 8,
  HighBit: 7,
  PixelRepresentation: 0, // 0 = unsigned, 1 = signed
  PixelData: [], //[new Uint8Array(128 * 128).buffer],
  // SOP Common Module
  SOPClassUID: "1.2.840.10008.5.1.4.1.1.7", // secondary capture image storage
  SOPInstanceUID: DicomMetaDictionary.uid(), // T1

  // DCMJS specific
  _vrMap: { PixelData: "OB" },
  _meta: {},
};

module.exports = secondaryCaptureTemplate;
