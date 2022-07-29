<script>
import Footer from './footer.svelte';
import {
    base
} from '$app/paths';
</script>

<nav class="navMenu">
    <a href="/">Metamask</a>
    <a href="{base}/modal">Web3Modal</a>
    <a href="{base}/buy">BuyMeCoffe</a>
</nav>

<div class="logo">
    <img src="./assets/img/MetaMask_small.png" width="50px;" style="vertical-align:middle;" alt="Coffee">MyWallet
</div>
<div class="welcome-text">
    <p>Welcome to MyWallet demo environment.</p><br />
    <p>Connect with your wallet to see the supported functions in the MyWallet</p><br />
    <p>Made thanks:</p>
    <a href="https://kit.svelte.dev/" target="_blank"> Svelte Kit Technology </a>
    <a href="https://docs.metamask.io/guide/" target="_blank"> Metamask </a>
    <a href="https://docs.ethers.io/v5/" target="_blank"> Ethers.js </a>
    <a href="https://ethereum.org/en/" target="_blank"> Ethereum </a>
    <a href="https://docs.soliditylang.org/" target="_blank"> Solidity </a>
</div>
<Footer />

<slot></slot>
