// import { useAuth } from "../../auth/authContextHook";
import UserAvatar from "../userAvatar/UserAvatar";
import userImage from "../../assets/images/user.png";
import css from "./profile.module.scss";
import AccountBalance from "../AccountBalance/AccountBalance";
import { useState } from "react";
import DepositModal from "../../depositModal/DepositModal";
import TradeStats from "../tradeStats/TradeStats";
import OpenTrades from "../openTrades/OpenTrades";

const Profile: React.FC = () => {
  //   const { user } = useAuth();
  const [depostModal, setDepositModal] = useState(false);

  const user = {
    id: 1,
    userName: "hahah",
    firstName: "hele",
    lastName: "ss",
    email: "ss",
    imageUrl: userImage,
  };

  if (!user) {
    return null;
  }

  const handleOnOpenModal = () => {
    setDepositModal(true);
  };

  const handleOnClose = () => {
    setDepositModal(false);
  };

  return (
    <div className={css.profileContainer}>
      <UserAvatar user={user} />
      <AccountBalance onOpenModel={handleOnOpenModal} />
      <TradeStats />
      <OpenTrades />
      {depostModal && <DepositModal onClose={handleOnClose} />}
    </div>
  );
};

export default Profile;
