<script>
import {
    ethers
} from "ethers";

import {
    onMount
} from 'svelte';

import NetworkInfo from './network.svelte';
import SignInformation from './sign.svelte';
import AccountInfo from './account.svelte';
import MetaMask from '../store/metamask'
const [stausMetamask] = MetaMask();

let provider;
let account = "";
let balance = 0.0;
let name = "";
let chainId = "";
let authenticated = false;
let decodeMessage = "";
let signature = "";
let metamaskInformation = true;

onMount(async () => {
    if(!$stausMetamask) {
        metamaskInformation = false;
    }
    provider = new ethers.providers.Web3Provider(window.ethereum)
    checkConnection();
})

function checkConnection() {
    //if connected get accounts handle
    window.ethereum.request({
        method: 'eth_accounts'
    }).then(handleAccountsChanged).catch(console.error);

    //get balance if change accounts
    window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
            console.log("Change:" + accounts)
            account = accounts;
            getBalance(accounts);
        } else {
            console.log("Connect to Metamask....");
            account = "";
            balance = "";
        }
    });

    //reload window if change chain
    window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
    });
};

//handle change of account
async function handleAccountsChanged(isConnectionAccount) {
    if (isConnectionAccount.length > 0) {
        console.log(isConnectionAccount[0]);
        account = isConnectionAccount[0];
        getBalance(isConnectionAccount);

        let network = await provider.getNetwork();
        name = network.name;
        chainId = network.chainId;
    }
};

//connect wallet
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        console.log("Metamask installed");
        //connect metamask wallet
        await provider.send("eth_requestAccounts", []);
        //get information about network
        let network = await provider.getNetwork();
        name = network.name;
        chainId = network.chainId;

    } else {
        console.log("Meatamask not installed");
    }
}

//get balance
async function getBalance(account) {

    let hexBalance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [
            account[0],
            'latest'
        ]
    }).catch((err) => {
        console.log(err.code);
    });

    balance = ethers.utils.formatEther(hexBalance);

}
</script>

{#if account}
    <AccountInfo {account} {balance}/>
    <NetworkInfo {name} {chainId}/>
    <SignInformation {authenticated} {decodeMessage} {signature} {account} {provider}/>
{:else}
    {#if metamaskInformation}
        <div class="btnCustom">
            <button on:click={connectWallet}>Connect With My Wallet</button>
        </div>
    {:else}
    <h2>Install MetaMask Wallet</h2>
        <div class="text-info">
            <p>The MetaMask crypto wallet is either a browser extension or a mobile app for Ethereum or ETH-based tokens. </p>
            <p>Go to https://metamask.io and <a href="https://metamask.io/download/" target="_blank">click</a> on the button to download and install</p>
            <p>the Metamask extension, which is compatible with Google Chrome (and Opera), Firefox, MS Edge and Brave browsers.</p>
        </div>
    {/if}
{/if}
