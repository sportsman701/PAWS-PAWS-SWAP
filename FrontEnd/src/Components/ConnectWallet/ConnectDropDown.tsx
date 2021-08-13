import React from "react";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { ReactComponent as WalletConnect2 } from "../../assets/icons/WalletConnect.svg";
import WalletConnect from "../../assets/icons/WalletConnect.png";
import coin98 from "../../assets/icons/coin98.png";
import "./ConnectWallet.css";
import useAuth from 'hooks/useAuth'

interface IProps {
  handleClose?: any;
}
const ConnectDropDown: React.FC<IProps> = ({ handleClose }) => {
  const { login } = useAuth();
  const connectMetamask = () => {
    login(1);
  }

  const connectWalletConnect = () => {
    login(2);
  }

  return (
    <div className="connect-drop-down">
      <div className="drop-header">
        <span>Connect Wallet</span>
        <CloseIcon onClick={handleClose} />
      </div>
      <div className="different-wallets">
        <div onClick={connectMetamask}>
          <img
            src="https://mining-bios.eu/wp-content/uploads/2018/09/metamask-logo.png"
            alt=""
          />
          <span>Metamask</span>
        </div>
        <div onClick={connectWalletConnect}>
          <WalletConnect2 style={{ height: "35px", marginBottom: "2vh" }} />
          {/* <img src={WalletConnect} alt="" /> */}
          <span>WalletConnect</span>
        </div>
        {/* <div>
          <img
            src="https://assets.coingecko.com/coins/images/11085/large/Trust.png?1588062702"
            alt=""
          />
          <span>Trust Wallet</span>
        </div> */}
        {/* <div>
          <img
            src="http://medishares.oss-cn-hongkong.aliyuncs.com/logo/math/Logo_Icon_black.png"
            alt=""
          />
          <span>MathWallet</span>
        </div>
        <div>
          <img
            src="https://s2.coinmarketcap.com/static/img/coins/200x200/5947.png"
            alt=""
          />
          <span>TokenPocket</span>
        </div> */}
        {/* <div>
          <img
            src="https://chainstack.com/wp-content/uploads/2021/06/bsc-icon-logo-1-1.png"
            alt=""
          />
          <span>Binance Chain</span>
        </div> */}
        {/* <div>
          <img src="https://logotyp.us/files/png/safepal.png" alt="" />
          <span>SafePal</span>
        </div>
        <div>
          <img style={{ width: "60px" }} src={coin98} alt="" />
          <span>Coin98</span>
        </div> */}
      </div>
      {/* <div className="drop-footer">
        <span>Haven't got a crypto wallet yet?</span>
        <button className="how-to-connect">Learn How to Connect</button>
      </div> */}
    </div>
  );
};

export default ConnectDropDown;
