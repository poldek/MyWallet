<script>
import {
    ethers
} from "ethers";

import {
    onMount
} from 'svelte';

import FormBuy from "./buy_form.svelte";
let provider;

onMount(async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    checkConnection();
})

let account;
let chainId;

function checkConnection() {
    window.ethereum.request({
        method: 'eth_accounts'
    }).then(handleAccountsChanged).catch(console.error);

    window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts !== "") {
            account = null;
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
        account = isConnectionAccount[0];
        let network = await provider.getNetwork();
        console.log(network);
        chainId = network.chainId;
    }
};
</script>
<h2>If you find this demo is helpful, it would be greatly appreciated if you could buy me coffee. Thank you!</h2>
<p>As there is a demo version, the free MATIC is enough</p>
<p>Address: <a href="https://mumbai.polygonscan.com/tx/0x6d44edca9eae07551d4308a5c8011ae080382ab6628517c681c86d16b319b41f" target="_blank">0xC249FbA613d6F3118Cf1D14BE9B9d7FbD1Afa156</a></p>
<p><a href="https://mumbai.polygonscan.com/address/0xC249FbA613d6F3118Cf1D14BE9B9d7FbD1Afa156#code" target="_blank">Successfully verified contract BuyMeCoffee on Etherscan.</p>
{#if account }
        <p class="text-success">Wallet: {account}</p>
    {#if chainId == 80001}
        <FormBuy />
    {:else}
         Please switch to Mumbai TestNet Network.
    {/if}
{:else}
    <p>You are not connected to the wallet but that's not a <a href="/modal">problem :)</a></p>
{/if}
