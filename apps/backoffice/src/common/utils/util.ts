import * as crypto from 'crypto';
import BN from 'bn.js';
import { config } from 'apps/backoffice/src/config';
import BigNumber from 'bignumber.js';
import { Request } from 'express';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import { Logger, ServiceUnavailableException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Storage } from '@google-cloud/storage';
import { snakeCase } from 'snake-case';
import { format } from 'date-fns';

export class Utils {
    static md5(contents: string): string {
        return crypto.createHash('md5').update(contents).digest('hex');
    }

    static formatDate(
        date: string | Date,
        pattern = 'yyyy-MM-dd H:i:s',
    ): string {
        return format(new Date(date), pattern);
    }

    static async bcryptHash(contents: string): Promise<string> {
        return await bcrypt.hash(contents, 10);
    }

    static nowTime(): number {
        return new Date(Date.now()).getTime();
    }

    /**
     * snake case object key
     * @param obj
     */
    static snakeCaseKey(obj: { [x: string]: any }): { [x: string]: any } {
        if (typeof obj != 'object') return obj;

        for (const oldName in obj) {
            // Camel to underscore
            const newName = snakeCase(oldName);

            // Only process if names are different
            if (newName != oldName) {
                // Check for the old property name to avoid a ReferenceError in strict mode.
                if (obj.hasOwnProperty(oldName)) {
                    obj[newName] = obj[oldName];
                    delete obj[oldName];
                }
            }

            // Recursion
            if (typeof obj[newName] == 'object') {
                obj[newName] = Utils.snakeCaseKey(obj[newName]);
            }
        }
        return obj;
    }

    static resetSessionError(req: Request): void {
        req.session['error'] = null;
    }

    /**
     * make a delay for milisecond before continue to next process
     * @param milisecond
     */
    static takeDelay(milisecond: number): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, milisecond);
        });
    }

    static async moveFile(
        fileOriginalRelativePath: string,
        fileDestPath: string,
    ): Promise<string> {
        switch (config.assets.storage.toLocaleLowerCase()) {
            case 'gcs':
                const keyPath =
                    path.resolve('./') +
                    '/dist/apps/backoffice/' +
                    config.storage.gcs.pathKeyFileJson;
                const storage = new Storage({
                    projectId: config.storage.gcs.projectId,
                    keyFilename: keyPath,
                });

                const bucketName = config.storage.gcs.bucketName;
                const fileUploaded = storage
                    .bucket(bucketName)
                    .file(fileDestPath);
                const fileBuffer = fs.readFileSync(fileOriginalRelativePath);
                const stream = fileUploaded.createWriteStream();

                stream.end(fileBuffer).on('finish', async () => {
                    await fileUploaded.makePublic();
                });

                return fileUploaded.publicUrl();
            case 's3':
                const file = fs.readFileSync(fileOriginalRelativePath);
                const s3 = new AWS.S3({
                    accessKeyId: config.storage.s3.accessKeyId,
                    secretAccessKey: config.storage.s3.secretAccessKey,
                    region: config.storage.s3.defaultRegion,
                });

                const filename = fileDestPath.replace(/^.*[\\\/]/, '');

                // TEMPORARY ALL PUBLIC ACCESS
                const params: AWS.S3.PutObjectRequest = {
                    Bucket: config.storage.s3.bucketName,
                    Key: filename,
                    Body: file,
                };

                try {
                    const s3Response = await s3.upload(params).promise();
                    return s3Response.Location;
                } catch (e) {
                    Logger.error('Error upload', e.stack);
                    throw new ServiceUnavailableException('Error upload');
                }

                return '';
            default:
                const fileDestRelativePath =
                    path.resolve('./') +
                    '/dist/' +
                    config.assets.public +
                    fileDestPath;
                fs.rename(
                    fileOriginalRelativePath,
                    fileDestRelativePath,
                    function (err) {
                        if (err) {
                            Logger.log('Successfully not renamed - AKA moved!');
                        }
                    },
                );

                return Utils.pathToUrl(fileDestPath);
        }
    }

    static pathToUrl(path: string): string {
        return config.host + ('/' + path).replace(/\/\//g, '/');
    }

    /**
     * count pagination offset
     * @param {number} page
     * @param {number} perPage
     * @returns {number}
     */
    static countOffset(page?: number, perPage?: number): number {
        page = page ?? 1;
        perPage = perPage ?? 10;

        return (page - 1) * perPage;
    }

    /**
     * find the next occurance date of the day specified
     * ex. startingDate is friday 2021-09-10
     * then the next monday is on 2021-09-13
     * @param startingDate the starting date
     * @param nearestDay the day expected in number (0 - 6)
     * @returns {Date}
     */
    static dateOfNearestDay(startingDate: Date, nearestDay: number): Date {
        const nearestTime = new Date(startingDate.getTime());

        if (startingDate.getDay() == 6 && nearestDay == 5) {
            nearestTime.setDate(
                startingDate.getDate() +
                    ((7 + nearestDay - startingDate.getDay()) % 7) -
                    7,
            );
        } else {
            nearestTime.setDate(
                startingDate.getDate() +
                    ((7 + nearestDay - startingDate.getDay()) % 7),
            );
        }

        return nearestTime;
    }

    /**
     * Find the diffirence in days between 2 dates
     * @param date1
     * @param date2
     * @returns {number}
     */
    static diffInDays(date1: Date, date2: Date): number {
        const timeDiff = date1.getTime() - date2.getTime();
        return timeDiff / (1000 * 60 * 60 * 24);
    }

    /**
     * Get platform fee from given amount
     * @param {string | number | BN} amount
     * @returns {BN}
     */
    static getPlatformFee(amount: string | number | BN): BN {
        const bnAmount = new BN(amount);

        return bnAmount
            .muln(config.calculation.platformFee)
            .divn(config.calculation.maxPercentage);
    }

    static getFromWeiToUsd(amount: BN): string {
        return new BigNumber(amount.toString()).dividedBy(10 ** 6).toFixed();
    }

    static convertPercentageToAmount(
        price: number,
        percentage: number,
    ): number {
        return (price * percentage) / 100;
    }

    static convertAmountToPercentage(
        price: number,
        pricePercentage: number,
    ): number {
        return (pricePercentage / price) * 100;
    }

    static addDaysInDate = function (
        date: Date | string,
        days: number,
    ): Date | string {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result.toISOString();
    };

    static generateRandomHexString(length) {
        return crypto.randomBytes(length).toString('hex');
    }

    static splitBaggageHeader(baggageHeader: string): [string, string] {
        const splittedBaggageHeader = baggageHeader?.split(',');

        const traceIdFromFe = splittedBaggageHeader[2]?.split('=')[1];
        const replayIdFromFe = splittedBaggageHeader[3]?.split('=')[1];

        return [traceIdFromFe, replayIdFromFe];
    }
}
