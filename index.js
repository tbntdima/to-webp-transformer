const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const readdir = promisify(fs.readdir);
const sharp = require("sharp");

const srcPath = path.join(__dirname, "src-images");
const outputPath = path.join(__dirname, "output-images");

(async () => {
  const files = await readdir(srcPath);
  const images = files.filter(file =>
    /\.(gif|jpg|jpeg|png)$/i.test(path.extname(file))
  );
  images.forEach(async image => {
    const imageNameWithoutExtension = image
      .split(".")
      .slice(0, -1)
      .join(".");
    const imageNameWithWebpExtension = `${imageNameWithoutExtension}.webp`;
    const outputImagePath = await path.join(
      outputPath,
      imageNameWithWebpExtension
    );
    sharp(path.join(srcPath, image))
      .webp()
      .toFile(outputImagePath);
  });
})();
