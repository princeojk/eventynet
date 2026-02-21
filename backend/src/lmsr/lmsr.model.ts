import { Injectable } from '@nestjs/common';
import EventModel from 'src/event/event.model';

@Injectable()
class LmsrCalculator {
  private event: EventModel;
  private amount: number;
  private side: string;

  constructor(event: EventModel, amount: number, side: string) {
    this.event = event;
    this.amount = amount;
    this.side = side;
  }

  private calculateShares() {
    console.log('tk side', this.side);
    if (this.side === 'YES') {
      console.log('tk this Amount', this.amount);
      console.log('tk if yesPrice ', this.event.yesPrice);
      const yesShares = this.amount / this.event.yesPrice;
      this.event.yesShares += yesShares;
      console.log('tk if yesShares ', this.event.yesShares);
    } else {
      const noShares = this.amount / this.event.noPrice;
      this.event.noShares += noShares;
    }

    return this.event;
  }

  public calculatePrice(): EventModel {
    this.calculateShares();

    this.event.yesPrice = this.calculateYesPrice();
    console.log('tk calculated yesPrice', this.event.yesPrice);
    this.event.noPrice = 100 - this.event.yesPrice;

    console.log('tk noPrice', this.event.noPrice);
    return this.event;
  }

  private calculateYesPrice(): number {
    console.log('tk yesshares', this.event.yesShares);
    console.log('tk noshares', this.event.noShares);
    console.log('tk liq', this.event.liquidityParameter);
    return (
      100 *
      (Math.exp(this.event.yesShares / this.event.liquidityParameter) /
        (Math.exp(this.event.yesShares / this.event.liquidityParameter) +
          Math.exp(this.event.noShares / this.event.liquidityParameter)))
    );
  }
}

export default LmsrCalculator;
