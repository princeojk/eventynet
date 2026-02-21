import { outComeEnum, statusEnum } from './eventEnums';

// userservice can implement this
class EventModel {
  public id: number;
  public question: string;
  public status: statusEnum;
  public closesAt: Date;
  public amountTraded: number;
  public totalTraded: number;
  public outCome: outComeEnum;
  public yesPrice: number;
  public noPrice: number;
  public liquidityParameter: number;
  public yesShares: number;
  public noShares: number;

  constructor(
    id: number,
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
    outcome: outComeEnum = outComeEnum.undecided,
  ) {
    this.id = id;
    this.question = question;
    this.status = status;
    this.amountTraded = amountTraded;
    this.totalTraded = totalTraded;
    this.closesAt = closesAt;
    this.yesPrice = yesPrice;
    this.noPrice = noPrice;
    this.liquidityParameter = liquidityParameter;
    this.yesShares = yesShares;
    this.noShares = noShares;
    this.outCome = outcome;
  }
}

export default EventModel;
