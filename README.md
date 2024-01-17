# dicom-seg-to-sc

Tool to convert DICOM SEG to Secondary Capture

## Pre-requisites

- NodeJS (tested with v18.16.0 but recent versions should work)

## Setup

```sh
$ npm install
```

## Running

You must specify two command line paramaters - the first is the path to the DICOM P10 SEG file, the second is a directory to write the rasterized dicom files

```sh
$ node index.js test/fixtures/MonaiSEG.dcm dicomout
```

## TODO

- Map CIELab values to RGB (colors are currently randomly generated)
- Add more validation logic
- Add support for displaying help and usage
- Verify that bit unpacking logic is correct in createSEGAccessor
