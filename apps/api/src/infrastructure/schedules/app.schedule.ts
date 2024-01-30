import { MessageContract } from '../../modules/queue/contracts/message.contract';

export abstract class AppSchedule {
    abstract handle(
        messageContract: MessageContract,
        delay: number,
    ): Promise<boolean>;
}
