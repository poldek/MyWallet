<script>
import {
    createForm
} from "svelte-forms-lib";
import CONTRACT_JSON from "../contract/BuyMeCoffee.json";
import {
    ethers
} from 'ethers';

const CONTRACT_ADDRESS = "0xC249FbA613d6F3118Cf1D14BE9B9d7FbD1Afa156";
let msg = "";
let transactionPending = false;
let errorTransaction = false;

const {
    form,
    errors,
    handleChange,
    handleSubmit
} = createForm({
    initialValues: {
        matic: "2",
        name: "",
        message: ""
    },
    validate: values => {
        let errs = {};
        if (values.name === "") {
            errs["name"] = "Name is required";
        }
        if (values.message === "") {
            errs["message"] = "Message is required";
        }
        return errs;
    },
    onSubmit: values => {
        onSubmitbuyMeCoffe(values.matic, values.name, values.message);
    }
});

const onSubmitbuyMeCoffe = async (matic, name, message) => {
    transactionPending = true;
    msg = "";
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contractABI = CONTRACT_JSON.abi;
        const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider.getSigner());

        let trans = await contract.buyMeCoffee(name, message, {
            gasLimit: 400000,
            value: ethers.utils.parseEther(`${matic}` + ".0") // Polygon Matic
        });
        await trans.wait();
        console.log(trans);
        msg = trans
        transactionPending = false;

    } catch (error) {
        if (error.code === 4001) {
            errorTransaction = true;
            msg = error['message'];
        }
        console.log(error['code']);
        transactionPending = false;
    }
}
</script>

{#if transactionPending}
    <p>Pending transaction .... please wait</p>
{/if}

{#if errorTransaction}
    <p>{msg}</p>
{/if}
    
{#if msg.hash }
    <h2 class="text-success">Success</h2>
    <p>look at: <a href="https://mumbai.polygonscan.com/tx/{msg.hash}" target="_blank">https://mumbai.polygonscan.com</a></p>
    <p>From: {msg.from}</p>
    <p>To: {msg.to}</p>
{:else}
<div class="buy-form">
    <form on:submit={handleSubmit}>
        <label for="matic">Matic</label>
        <select id="matic" name="matic" style="width: 300px;"
            on:change={handleChange}
            bind:value={$form.title}>
            <option value="2">Send me 2 MATIC</option>
            <option value="5">Send me 5 MATIC</option>
            <option value="10">Send me 10 MATIC</option>
        </select>
        <label for="name">Name</label>
        <input id="name" name="name" placeholder="Your name" on:change={handleChange} bind:value={$form.name}/>
            {#if $errors.name}
                <small>{$errors.name}</small>
            {/if}
        <label for="message">Message</label>
        <textarea placeholder="Message" id="message" name="message"
            on:change={handleChange} bind:value={$form.message} rows="4" cols="40"></textarea>
            {#if $errors.message}
                <small>{$errors.message}</small>
            {/if}
        <br>
        <button type="submit" id="submit">BuyMeCoffee</button>
    </form>
</div>
{/if}
<div class="empty"></div>
