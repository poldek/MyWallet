<script>
import {
    ethers
} from "ethers";
import {
    onMount
} from 'svelte';

import Web3Modal from "web3modal";
import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js';

let providerWeb3;
let account = "";
let shortAccout;

onMount(async () => {

    checkConnection();
})
//check connetion
function checkConnection() {
    window.ethereum.request({
        method: 'eth_accounts'
    }).then(handleAccountsChanged).catch(console.error);

    window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts !== "") {
            account = "";
            shortAccout = "";
        }
    });
};

//handle change of account
async function handleAccountsChanged(isConnectionAccount) {
    if (isConnectionAccount.length > 0) {
        account = isConnectionAccount[0];
        let shortAccountS = account.slice(0, 3);
        let shortAccountE = account.slice(-3);
        shortAccout = shortAccountS + "..." + shortAccountE;
    }
};

// infura id required
let infuraId = import.meta.env.VITE_INFURA_ID; 

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId // required
        },
    }
};

//show modal wallet
async function handleWeb3Modal() {

    let web3Modal = new Web3Modal({
        theme: "dark",
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
    });
    web3Modal.clearCachedProvider();
    const instance = await web3Modal.connect();
    providerWeb3 = new ethers.providers.Web3Provider(instance);
    const signer = providerWeb3.getSigner();
    window.location.reload();

}
</script>
{#if !account}
    <div class="btnCustom">
        <button  on:click={handleWeb3Modal}>Web3Modal</button>
    </div>
{:else}
    <p class="text-success">Your wallet: {shortAccout}</p>
{/if}
