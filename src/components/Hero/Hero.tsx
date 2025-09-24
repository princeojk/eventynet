import Button from "../Buttons/Button";
import winner from "../../assets/images/winner.jpg";
import css from "./Hero.module.scss"

function Hero() {
    return (
        <>
            <div className={css.heroContainer}>
                <div className={css.authButtons}>
                    <Button
                        size="small"
                        color="orange"
                    >
                        login
                    </Button>
                    <Button
                        size="small"
                        color="orange"
                    >
                        sign up
                    </Button>
                </div>
                <div className={css.mainText}>
                    <h1>Peer to Peer Betting Platform</h1>
                    <h2>Completely free!</h2>
                </div>
                <div className={css.mainButtons}>
                    <Button
                        size="large"
                        color="orange"
                    >
                        Create a Bet
                    </Button>
                    <Button
                        size="large"
                        color="orange"
                    >
                        Explore Bets
                    </Button>
                </div>
            </div>
            <div className={css.lowSection}>
                <div className={css.referralContent}>
                    <div className={css.referralText}>
                        <h2 className={css.referralTitle}>BRING A FRIEND</h2>
                        <h3 className={css.referralSubtitle}>GET PAID INSTANTLY</h3>
                        <div className={css.cashAmount}>$250</div>
                        <p className={css.referralDescription}>
                            Instant withdrawal • No waiting • Pure profit
                        </p>
                        <div className={css.referralCTA}>
                            <Button size="medium" color="orange">
                                Start Earning Now
                            </Button>
                        </div>
                    </div>
                </div>
                                    <img 
                        src={winner} 
                        alt="Hero" 
                        className={css.heroImage}
                    />
            </div>
        </>
    )
}

export default Hero;