<script>
import CONTRACT from "../contract/BuyMeCoffee.json";
import {
    ethers
} from 'ethers';

const CONTRACT_ADDRESS = "0xC249FbA613d6F3118Cf1D14BE9B9d7FbD1Afa156";
const CONTRACT_ABI = CONTRACT.abi;

let owner = "Please wait ...";

const URL_ALCHEMY_PROVIDER =  import.meta.env.VITE_ALCHEMY_ID;

let details = [];
//show list
async function buyCoffeeList() {
    let provider = new ethers.providers.JsonRpcProvider(URL_ALCHEMY_PROVIDER);
    let contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    owner = await contract.owner();
    try {
        details = await contract.getAllCoffee();
        if (!details) {
            return;
        }
        return details;

    } catch (error) {
        console.log(error);
    }
}

$: promise = buyCoffeeList();
</script>
<p class="text-success">@Owner wallet: {owner}</p>
<h3>Honorable donor list</h3>
{#await promise}
    <p class="text-success">Load data ...</p>
{:then data }
<table class="table">

    <thead>
        <tr>
            <th class="text-success">Title</th>
            <th class="text-success">Measse</th>
            <th class="text-success">Matic</th>
            <th class="text-success">Address</th>
        </tr>
    </thead>
    <tbody>
        {#each [...data].reverse() as item }
        <tr>
            <td>{item[0]}</td>
            <td>{item[1]}</td>
            <td>{item[3]}</td>
            <td><a href="https://mumbai.polygonscan.com/address/{item[2]}" target="_blank">{item[2]}</a></td>
        </tr>
        {/each}
    </tbody>

</table>
{/await}
