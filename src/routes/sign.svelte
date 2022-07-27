<script>
import {
    ethers
} from "ethers";
export let authenticated, decodeMessage, signature, account, provider;

async function handleSignedMessage() {
    let signer = provider.getSigner();

    let message =
        "MyWallet wants you to sign in with your Account: " + account +
        "By signing in you accept the Terms of Service URI: https://mywallet.pgmsoft.com Version: 1.0 ";

    signature = await signer.signMessage(message);
    decodeMessage = ethers.utils.verifyMessage(message, signature);

    if (decodeMessage.toUpperCase === account[0].toUpperCase) authenticated = true;

    console.log(account);
    console.log(decodeMessage);
    console.log(authenticated);
    console.log(signature);

}
</script>

<div class="show_box">
    <h3>Sign message - if you sign the message you will see additional information status, signed account and hash message </h3>
    <p>{authenticated}</p>
    <p>{decodeMessage}</p>
    <p>{signature}</p>
    {#if !authenticated}
    <div class="btnCustom">
        <button  on:click={handleSignedMessage}>SignMessage</button>
    </div>
    {/if}
</div>
