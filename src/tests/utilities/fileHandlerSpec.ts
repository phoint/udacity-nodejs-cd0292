import path from 'path';
import {
  imagesDir,
  resize,
  search,
  thumbDir,
} from '../../utilities/fileHandler';

describe('Test Search File', () => {
  it("search should return null when image doesn't exist", async () => {
    const dir = imagesDir;
    const imageName = 'sampleImage';
    const imagePath = await search(dir, imageName);
    expect(imagePath).toBeNull();
  });

  it('search should return path when image exist', async () => {
    const dir = imagesDir;
    const imageName = 'encenadaport';
    const imagePath = await search(dir, imageName);
    expect(imagePath).not.toBeNull;
    expect(imagePath).toContain(imageName);
    expect(imagePath).toContain(dir);
  });
});

describe('Test Resize Image', () => {
  const width = 200;
  const height = 200;
  const notExistImage = 'sampleImage.jpg';
  const existImage = 'encenadaport.jpg';
  const resizedName = `encenadaport-${width}x${height}.jpg`;
  const trueInputPath = path.join(imagesDir, existImage);
  const falseInputPath = path.join(imagesDir, notExistImage);
  const output = path.join(thumbDir, resizedName);

  it("resizing should throw error when image doesn't exist", () => {
    expectAsync(resize(falseInputPath, output, width, height)).toBeRejected();
  });

  it('resizing should throw error when width is not defined', () => {
    expectAsync(
      resize(trueInputPath, output, undefined, height),
    ).toBeRejected();
  });

  it('resizing should return output path when provide all arguments', () => {
    expectAsync(resize(trueInputPath, output, width, height)).toBeResolvedTo(
      output,
    );
  });
});
