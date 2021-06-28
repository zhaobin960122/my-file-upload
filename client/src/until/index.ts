export const CHUNK_SIZE = 1 * 1024 * 1024; // 1M
const IMG_WIDTH_LIMIT = 1000;
const IMG_HEIGHT_LIMIT = 1000;

async function isGif(file) {
  const ret = await blobToString(file.slice(0, 6))
  const isgif = ret === "47 49 46 38 39 61" || ret === "47 49 46 38 37 61";
  return isgif
}
async function isPng(file) {
  const ret = await blobToString(file.slice(0, 8))
  const ispng = ret === "89 50 4E 47 0D 0A 1A 0A";
  return ispng;
}
async function isJpg(file) {
  // jpg开头两个仕 FF D8
  // 结尾两个仕 FF D9
  const len = file.size;
  const start = await blobToString(file.slice(0, 2));
  const tail = await blobToString(file.slice(-2, len));
  const isjpg = start === "FF D8" && tail === "FF D9";
  return isjpg;
}
async function blobToString(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      const ret = reader.result
        .split("")
        .map(v => v.charCodeAt())
        .map(v => v.toString(16).toUpperCase())
        .map(v => v.padStart(2, "0"))
        .join(" ")
      resolve(ret)
    }
    reader.readAsBinaryString(blob)
  })
  // 二进制=》ascii码=》转成16进制字符串
}

async function isImage(file) {
  return await isGif(file) || await isPng(file) || await isJpg(file)
}
export {
  isImage
}
