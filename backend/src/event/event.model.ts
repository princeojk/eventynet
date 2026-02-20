import { outComeEnum, statusEnum } from './eventEnums';

// userservice can implement this
class EventModel {
  public question: string;
  public status: statusEnum;
  public closesAT: Date;
  public amountTraded: number;
  public totalTraded: number;
  public outCome: outComeEnum;
  public yesPrice: number;
  public noPrice: number;
  public liquidityParameter: number;
  public yesShares: number;
  public noShares: number;

  constructor(
    question: string,
    status: statusEnum,
    amountTraded: number,
    totalTraded: number,
    closesAt: Date,
    yesPrice: number,
    noPrice: number,
    liquidityParameter: number,
    yesShares: number = 0,
    noShares: number = 0,
  ) {
    this.question = question;
    this.status = status;
    this.amountTraded = amountTraded;
    this.totalTraded = totalTraded;
    this.closesAT = closesAt;
    this.yesPrice = yesPrice;
    this.noPrice = noPrice;
    this.liquidityParameter = liquidityParameter;
    this.yesShares = yesShares;
    this.noShares = noShares;
  }
}

export default EventModel;
