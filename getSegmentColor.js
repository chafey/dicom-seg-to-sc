const segmentRGBValues = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const getSegmentColor = (data, segmentNumber) => {
  const segmentSequence = data.dict["00620002"];
  const seg = segmentSequence.Value[segmentNumber];
  //const CIELabValues = seg["0062000D"].Value;
  if (!segmentRGBValues[segmentNumber]) {
    // TODO: Map CIELab Values to RGB
    segmentRGBValues[segmentNumber] = {
      R: getRandomInt(255),
      G: getRandomInt(255),
      B: getRandomInt(255),
    };
  }
  return segmentRGBValues[segmentNumber];
};

module.exports = getSegmentColor;
