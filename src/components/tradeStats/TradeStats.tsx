import css from "./tradeStates.module.scss";

const TradeStats: React.FC = () => {
  const trade = {
    total: 120,
    volume: 1000,
  };

  return (
    <div className={css.tradeContainer}>
      <div className={css.totalTrades}>
        <p className={css.title}>Total Trades</p>
        <p className={css.value}>{trade.total}</p>
      </div>
      <div className={css.volume}>
        <p className={css.title}>Volume</p>
        <p className={css.value}>₦{trade.volume}</p>
      </div>
    </div>
  );
};
export default TradeStats;
