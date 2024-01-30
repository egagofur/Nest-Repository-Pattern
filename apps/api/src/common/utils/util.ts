import * as _ from 'lodash';
import * as crypto from 'crypto';
import BN from 'bn.js';
import { config } from 'apps/api/src/config';
import BigNumber from 'bignumber.js';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as AWS from 'aws-sdk';
import {
    InternalServerErrorException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { GMT_WIB_INDONESIA } from '../constants/general.constant';
import moment from 'moment-timezone';

export class Utils {
    static md5(contents: string): string {
        return crypto.createHash('md5').update(contents).digest('hex');
    }

    static async bcryptHash(contents: string): Promise<string> {
        return await bcrypt.hash(contents, 10);
    }

    static randStr(length: number) {
        let result = '';
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength),
            );
        }
        return result;
    }

    static isJson(value: string): boolean {
        try {
            if (
                (value.includes('}') && value.includes('{')) ||
                (value.includes(']') && value.includes('['))
            ) {
                JSON.parse(value);
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }

        return true;
    }

    /**
     * Parse datetime object key
     * @param obj
     */
    static parseDatetime(obj: { [x: string]: any }, timezone: string): any {
        if (typeof obj != 'object') {
            return obj;
        }

        for (const oldName in obj) {
            // Recursion
            if (typeof obj[oldName] == 'object') {
                obj[oldName] = Utils.parseDatetime(obj[oldName], timezone);
            }
        }

        if (obj instanceof Date) {
            const date = moment
                .tz(obj, timezone)
                .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

            return date;
        }

        return obj;
    }

    /**
     * snake case object key
     * @param obj
     */
    static snakeCaseKey(obj: { [x: string]: any }): { [x: string]: any } {
        if (typeof obj != 'object') return obj;

        for (const oldName in obj) {
            // Camel to underscore
            const newName = _.snakeCase(oldName);

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

    static nowTime(): number {
        return new Date(Date.now()).getTime();
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

    /**
     * upload photo or files to gcs or aws
     */
    static async moveFile(
        fileOriginalRelativePath: string,
        fileDestPath: string,
    ): Promise<string> {
        switch (config.assets.storage.toLocaleLowerCase()) {
            case 'gcs':
                const keyPath =
                    path.resolve('./') +
                    '/dist/apps/api/' +
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
                });

                const filename = fileDestPath.replace(/^.*[\\\/]/, '');

                // TEMPORARY ALL PUBLIC ACCESS
                const params = {
                    Bucket: config.storage.s3.bucketName,
                    Key: filename,
                    Body: file,
                    ACL: 'public-read',
                    CreateBucketConfiguration: {
                        LocationConstraint: config.storage.s3.defaultRegion,
                    },
                };

                try {
                    const s3Response = await s3.upload(params).promise();
                    return s3Response.Location;
                } catch (e) {
                    throw new InternalServerErrorException('Error upload');
                }

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
                            console.log(
                                '[File Store] Successfully not renamed - AKA moved!',
                            );
                        }
                    },
                );

                return Utils.pathToUrl(fileDestPath);
        }
    }

    static pathToUrl(path: string): string {
        return config.host + ('/attachment/' + path).replace(/\/\//g, '/');
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
    static padTo2Digits(num: number): string {
        return num.toString().padStart(2, '0');
    }

    static moneyFormat(angka: string, prefix: string): string {
        const numberString = angka.replace(/[^,\d]/g, '').toString();
        const split = numberString.split(',');
        const sisa = split[0].length % 3;
        const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        let rupiah = split[0].substr(0, sisa);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
            const separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : rupiah ? '(IDR) ' + rupiah : '';
    }

    static formatDateISO8601(date: Date) {
        return (
            [
                date.getFullYear(),
                Utils.padTo2Digits(date.getMonth() + 1),
                Utils.padTo2Digits(date.getDate()),
            ].join('-') +
            ' ' +
            [
                Utils.padTo2Digits(date.getHours()),
                Utils.padTo2Digits(date.getMinutes()),
                Utils.padTo2Digits(date.getSeconds()),
            ].join(':')
        );
    }

    static ucFirstChar(str: string) {
        return str[0].toUpperCase() + str.slice(1);
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
}

export const fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
        return callback(
            new UnprocessableEntityException('This file type is not allowed!'),
        );
    }
    callback(null, true);
};

export const photoFilter = (
    file: Express.Multer.File,
): UnprocessableEntityException => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return new UnprocessableEntityException(
            'Wrong format! Please select photo with jpg|jpeg|png',
        );
    }
};

export const generateRandomCode = (numberOfCode = 4): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < numberOfCode; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
    }

    return result;
};

export const generateWithdrawCode = (userId: number): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
    }

    const timeNow = new Date();
    const digitCombination = timeNow.getMilliseconds() + Number(userId) + 7;
    return 'WD' + String(digitCombination).substring(0, 3) + result;
};

export const generateWithdrawTransactionCode = (userId: number): string => {
    const timeNow = new Date();
    const digitCombination =
        timeNow.getFullYear() + Number(userId) + timeNow.getMilliseconds();
    return 'PS-TF-' + String(digitCombination) + String(timeNow.getDate());
};

export const toLocalTimeWIB = (localTime: Date): Date => {
    const dateConv = new Date(localTime);
    if (!localTime) {
        return null;
    }
    return new Date(dateConv.setHours(dateConv.getHours() + GMT_WIB_INDONESIA));
};

export const formatCurrencyIndonesiaAsString = (amount: number): string => {
    return Number(amount).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    });
};
