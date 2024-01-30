import { BadRequestException } from '@nestjs/common';

export default class InternalOpenCircuitException extends BadRequestException { }
