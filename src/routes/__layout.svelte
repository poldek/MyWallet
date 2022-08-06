<script>
import Footer from './footer.svelte';
</script>

<nav class="navMenu">
    <a href="/">Metamask || </a>
    <a href="/modal">Web3Modal || </a>
    <a href="/wallet_ethereum">Etherum wallet || </a>
    <a href="/buy">BuyMeCoffe || </a>
    <a href="/buy_list">Donor list || </a>
    <a href="/help">Help</a>

</nav>

<div class="logo">
    <img src="./assets/img/MetaMask_small.png" width="50px;" style="vertical-align:middle;" alt="Coffee">MyWallet
</div>
<div class="welcome-text">
    <p>Welcome to MyWallet demo environment.</p>
    <p>Connect with your wallet to see the supported functions in the MyWallet</p>
</div>
<Footer />

<slot></slot>
