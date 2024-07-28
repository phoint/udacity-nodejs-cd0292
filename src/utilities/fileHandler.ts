import util from 'util';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const imagesDir = path.join(__dirname, '..', '..', 'images');
const thumbDir = path.join(imagesDir, 'thumb');

const search = async (
  dir: string,
  fileName: string,
): Promise<string | null> => {
  const files = await readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await stat(filePath);
    const index = file.lastIndexOf(fileName);
    if (fileStat.isDirectory()) {
      continue;
    } else if (index > -1 && file.charAt(fileName.length) === '.') {
      return filePath;
    }
  }
  return null;
};

const resize = async (
  input: string,
  output: string,
  width?: number,
  height?: number,
): Promise<string | null> => {
  const outputFile = await sharp(input)
    .resize(height ? { width: width, height: height, fit: 'fill' } : width)
    .jpeg()
    .toFile(output);
  if (outputFile) {
    return output;
  }
  return null;
};

export { search, resize, imagesDir, thumbDir };
