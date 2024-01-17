const getDICOMValue = require("./getDICOMValue");

const createSEGAccessor = (data) => {
  const rows = getDICOMValue(data.dict, "00280010");
  const columns = getDICOMValue(data.dict, "00280010");
  const pixelDataArrayBuffer = getDICOMValue(data.dict, "7FE00010");
  const pixelData = new Uint8Array(pixelDataArrayBuffer);

  const numSegments = data.dict["00620002"].Value.length;
  const numFrames = getDICOMValue(data.dict, "00280008");
  const numFramesPerSegment = numFrames / numSegments;
  const segmentFrameSize = (rows * columns) / 8;
  const segmentSizeBytes = numFramesPerSegment * segmentFrameSize;

  const get = (seg, frame, x, y) => {
    const segStartOffset = seg * segmentSizeBytes;
    const frameOffset = frame * segmentFrameSize;
    const byteOffset = Math.floor(x / 8) + Math.floor((y * columns) / 8);
    const byte = pixelData[segStartOffset + frameOffset + byteOffset];
    const bitNum = 1 << x % 8; // TODO: Verify this is correct, it may be opposite?
    const isSet = byte & bitNum;
    return isSet;
  };

  return {
    numSegments,
    rows,
    columns,
    pixelData,
    get,
  };
};

module.exports = createSEGAccessor;
