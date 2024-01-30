import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { config } from 'apps/api/src/config';
import imgmgk from 'imagemagick';
const convert = require('heic-convert');
import { promisify } from 'util';
import fs from 'fs';

@Injectable()
export class ImageUploadService {
    async compressDefault(file: Express.Multer.File): Promise<string> {
        let destPathCompressed = file.path + '-compressed-' + file.originalname;
        let filePath = file.path;
        const splitName = file.originalname.split('.');
        const format = splitName[splitName.length - 1];

        if (format == 'heic') {
            const inputBuffer = await promisify(fs.readFile)(filePath);
            const fileConvered = filePath + '.jpg';
            const outputBuffer = await convert({
                buffer: inputBuffer,
                format: 'JPEG',
                quality: 1,
            });

            await promisify(fs.writeFile)(fileConvered, outputBuffer);
            filePath = fileConvered;
            destPathCompressed = destPathCompressed + '.jpg';
        }

        return new Promise((resolve) => {
            imgmgk.identify(filePath, (err) => {
                if (err) {
                    throw new InternalServerErrorException(
                        '[Imagemagick] - error ' + err.message,
                    );
                }

                imgmgk.resize(
                    {
                        format,
                        srcPath: file.path,
                        dstPath: destPathCompressed,
                        quality: config.upload.image.compressed.quality,
                        width: config.upload.image.compressed.width,
                    },
                    (err) => {
                        if (err) {
                            throw new InternalServerErrorException(
                                '[Imagemagick] - error ' + err.message,
                            );
                        }

                        resolve(destPathCompressed);
                    },
                );
            });
        });
    }
}
