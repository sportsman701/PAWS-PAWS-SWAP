import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { useEagerConnect } from 'hooks/useEagerConnect';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { claimPAWZ, depositePAWS, getPAWSAmount, getPAWSDepositeAmount, getPAWSTotalDepositeAmount, getPAWZAmount, isClaimEnabled } from 'utils/contracts';
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment';
import { getContractInfo } from 'utils';

function App() {
  useEagerConnect();

  const [loginStatus, setLoginStatus] = useState(false);
  const [claimEnabled, setClaimEnabled] = useState(false);
  let [PAWSDepositeAmount, setPAWSDepositeAmount] = useState('0.0000');
  let [PAWSDepositeTotalAmount, setPAWSDepositeTotalAmount] = useState('0.0000');
  let [PAWSBalance, setPAWSBalance] = useState('0.0000');
  let [PAWZBalance, setPAWZBalance] = useState('0.0000');

  const context = useWeb3React<Web3Provider>();
  const { connector, library, chainId, account, active } = context;

  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    setLoginStatus(isLoggedin);

    isClaimEnabled(library).then((_enabled) => {
      setClaimEnabled(_enabled);
    });

    getPAWSAmount(library, account).then((_amount) => {
      setPAWSBalance(_amount);
    });

    getPAWZAmount(library, account).then((_amount) => {
      setPAWZBalance(_amount);
    });

    getPAWSTotalDepositeAmount(library).then((_amount) => {
      setPAWSDepositeTotalAmount(_amount);
    });

    getPAWSDepositeAmount(library, account).then((_amount) => {
      setPAWSDepositeAmount(_amount);
    });
  }, [connector, library, account, active, chainId]);


  const tryDepositePAWS = async () => {
    const load_toast_id = toast.loading('Please wait...');

    try {
      const txhash = await depositePAWS(library.getSigner());
      if (txhash !== false) {
        toast.success('PAWS Deposited Successful!');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.error('PAWS Deposited Failed.');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss(load_toast_id);
    }
  }
  const tryClaimPAWZ = async () => {
    const load_toast_id = toast.loading('Please wait...');

    try {
      const txhash = await claimPAWZ(library.getSigner());
      if (txhash !== false) {
        toast.success('PAWZ Claimed Successful!');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.error('PAWZ Claimed Failed.');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss(load_toast_id);
    }
  }

  const SWAPContractAddress = getContractInfo("SWAP_LaunchPad").address;
  const PAWSTokenAddress = getContractInfo("PAWS_Token").address;
  const PAWZTokenAddress = getContractInfo("PAWZ_Token").address;

  return (
    <>
      <Toaster position="top-center" toastOptions={{ success: { duration: 4000 }, error: { duration: 4000 } }} />
      {/* <img className="logo" src="https://uploads-ssl.webflow.com/60cd35da0768833e006845d3/60cfdc34d0238c4e35424d09_white-bsc-logo.png"></img> */}
      <div className="funding-box first-box">
        <img className="boge-flag" src="/img/logo.png"></img>
        <div className="right-header">
          <h3>PAWS / PAWZ SWAP IDO</h3>

          <p>1 Million PAWS TO 1 PAWZ</p>
          {/* <p><a target="_blank" rel="noreferrer" href="https://bscgems.com/launch">Learn more</a></p> */}
          <p className="audited">Audited by <a href="https://github.com/lemoncrypto" target="_blank">LemonCrypto</a></p>
        </div>

      </div>
      <div className="funding-box">
        <div className="left-half">

          {loginStatus ? (
            <>
              <p className="info-box">Chain ID : {chainId}</p>
              <p className="info-box">Wallet : {account}</p>
              <p className="info-box">PAWS Balance : {PAWSBalance} PAWS</p>
              <p className="info-box">PAWZ Balance : {PAWZBalance} PAWZ</p>
            </>) : (
            <>
              {/* <p className="warning-box">Invalid Network!</p> */}
              <p className="warning-box">Please connect to BSC Network and refresh!</p>
            </>)
          }
          <img className="token-logo" src="/img/logo.png" />
          <h2 className="token-name">PAWS / PAWZ IDO Presale</h2>
          <p className="description">
            $PAWZ is a next generation of $PAWS, community-focused, decentralized cryptocurrency with instant rewards thanks to active users! Join the moon mission.
          </p>

          <p className="text-center"><a className="pink-text" href={`https://bscscan.com/address/${SWAPContractAddress}`} target="_blank">View Smart Contract</a></p>

          <p>Total Raised: <span className="raised">{PAWSDepositeTotalAmount} PAWS</span></p>
          <p>My Contribution: <span className="raised">{PAWSDepositeAmount} PAWS</span></p>
          <p>PAWZ Token : <a href={`https://bscscan.com/token/${PAWZTokenAddress}`} target="_blank">{PAWZTokenAddress}</a></p>

          <div className="claim">
            <p className="description">Deposite your PAWS tokens</p>
            <button onClick={tryDepositePAWS}>Deposite PAWS</button>
          </div>
          {
            claimEnabled &&
            <div className="claim">
              <p className="description">Claim PAWZ tokens</p>
              <button onClick={tryClaimPAWZ}>Claim PAWZ</button>
            </div>
          }

          <div>
            <div className="how-many">
              <h4>How many PAWZ tokens will I get?</h4>
              <p>The amount of tokens you will receive will be 1 PAWZ Token per 1 Million PAWS Token.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
