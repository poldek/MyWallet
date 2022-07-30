<script>
import {
    ethers
} from "ethers";

let address;
let mnemonic;
let privateKey;

//function gerate randpom account
async function handleCreateWallet() {
    const wallet = ethers.Wallet.createRandom();
    address = wallet.address;
    mnemonic = wallet.mnemonic.phrase;
    privateKey = wallet.privateKey;
}
</script>
<h2>With the ethers.js library, you can generate Ethereum wallet</h2>
<div class="btnCustom">
    <button  on:click={handleCreateWallet}>Create wallet</button>
</div>
<br/>
{#if address}
<p class="text-success">Address: {address}</p><br /><br >
<p class="text-success">Mnemonic: {mnemonic}</p> <br /><br >
<p class="text-success">Private key: {privateKey}</p> <br /><br >
{/if}
