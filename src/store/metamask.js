import { writable } from "svelte/store";
import { browser } from "$app/env";

export default function () {
  const statusMetamask = writable(false);
  async function metamaskIsExist() {
    if (browser) {
      if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
        statusMetamask.set(true);
      } else {
        console.log("MetaMask is Not installed!");
        statusMetamask.set(false);
      }
    }
  }

  metamaskIsExist();

  return [statusMetamask];
}
