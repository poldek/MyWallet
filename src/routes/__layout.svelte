<script>
import Footer from './footer.svelte';
import {
    base
} from '$app/paths';
</script>

<nav class="navMenu">
    <a href="/">Metamask</a>
    <a href="{base}/modal">Web3Modal</a>
    <a href="{base}/ethereum_wallet">Etherum wallet</a>
    <a href="{base}/buy">BuyMeCoffe</a>

</nav>

<div class="logo">
    <img src="./assets/img/MetaMask_small.png" width="50px;" style="vertical-align:middle;" alt="Coffee">MyWallet
</div>
<div class="welcome-text">
    <p>Welcome to MyWallet demo environment.</p><br />
    <p>Connect with your wallet to see the supported functions in the MyWallet</p><br />
</div>
<Footer />

<slot></slot>
