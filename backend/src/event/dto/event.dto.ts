import { outComeEnum, statusEnum } from '../eventEnums';

export class EventDto {
  id: number;
  question: string;
  closesAt: Date;
  status: statusEnum;
  amountTraded: number;
  totalTraded: number;
  outCome: outComeEnum;
  yesPrice: number;
  noPrice: number;
  liquidityParameter: number;
  yesShares: number;
  noShares: number;
}
