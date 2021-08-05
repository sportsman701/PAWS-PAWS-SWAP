import "@ethersproject/shims"
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { getContractObj } from ".";


export async function getPAWSDepositeAmount(provider, account) {
    const swapContract = getContractObj('SWAP_LaunchPad', process.env.REACT_APP_NETWORK_ID, provider);
    const PAWSContract = getContractObj('PAWS_Token', process.env.REACT_APP_NETWORK_ID, provider);
    try {
        const [PAWSAmount, PAWSDecimals] = await Promise.all([
            swapContract._Mapping_PAWS_Deposite(account),
            PAWSContract.decimals()
        ]);
        return parseFloat(ethers.utils.formatUnits(PAWSAmount, PAWSDecimals)).toFixed(4);
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export async function getPAWSTotalDepositeAmount(provider) {
    const swapContract = getContractObj('SWAP_LaunchPad', process.env.REACT_APP_NETWORK_ID, provider);
    const PAWSContract = getContractObj('PAWS_Token', process.env.REACT_APP_NETWORK_ID, provider);
    try {
        const [PAWSTotalAmount, PAWSDecimals] = await Promise.all([
            PAWSContract.balanceOf(swapContract.address),
            PAWSContract.decimals()
        ]);
        return parseFloat(ethers.utils.formatUnits(PAWSTotalAmount, PAWSDecimals)).toFixed(4);
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export async function getPAWSAmount(provider, account) {
    const PAWSContract = getContractObj('PAWS_Token', process.env.REACT_APP_NETWORK_ID, provider);
    try {
        const [PAWSTotalAmount, PAWSDecimals] = await Promise.all([
            PAWSContract.balanceOf(account),
            PAWSContract.decimals()
        ]);
        return parseFloat(ethers.utils.formatUnits(PAWSTotalAmount, PAWSDecimals)).toFixed(4);
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export async function getPAWZAmount(provider, account) {
    const PAWZContract = getContractObj('PAWZ_Token', process.env.REACT_APP_NETWORK_ID, provider);
    try {
        const [PAWZTotalAmount, PAWZDecimals] = await Promise.all([
            PAWZContract.balanceOf(account),
            PAWZContract.decimals()
        ]);
        return parseFloat(ethers.utils.formatUnits(PAWZTotalAmount, PAWZDecimals)).toFixed(4);
    }
    catch (e) {
        console.log(e);
        return null;
    }
}

export async function isClaimEnabled(provider) {
    const swapContract = getContractObj('SWAP_LaunchPad', process.env.REACT_APP_NETWORK_ID, provider);
    try {
        const [claimEnabled] = await Promise.all([swapContract._ClaimEnabled()]);
        return claimEnabled;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

export async function validateOwner(provider, account) {
    const swapContract = getContractObj('SWAP_LaunchPad', process.env.REACT_APP_NETWORK_ID, provider);
    try {
        const [owner] = await Promise.all([swapContract.owner()]);
        if (owner == account) return true;
        return false
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function depositePAWS(provider) {
    const swapContract = getContractObj('SWAP_LaunchPad', process.env.REACT_APP_NETWORK_ID, provider);
    const PAWSContract = getContractObj('PAWS_Token', process.env.REACT_APP_NETWORK_ID, provider);
    try {
        var tx = await PAWSContract.approve(swapContract.address, ethers.constants.MaxUint256);
        await tx.wait(1);

        tx = await swapContract.depositePAWS();
        await tx.wait(1);

        return true;
    } catch (e) {
        toast.error(e.message);
        console.log(e);
        return false;
    }
}

export async function claimPAWZ(provider) {
    const swapContract = getContractObj('SWAP_LaunchPad', process.env.REACT_APP_NETWORK_ID, provider);
    try {
        var tx = await swapContract.claimPAWZ();
        await tx.wait(1);

        return true;
    } catch (e) {
        toast.error(e.message);
        console.log(e);
        return false;
    }
}
