import { Component } from '@angular/core'; // Import Angular's core module for components.
import Web3 from 'web3'; // Import the Web3.js library for interacting with the Ethereum blockchain.
import WebSocket from 'ws'; // Import WebSocket for potential real-time communication (if needed).

@Component({
  selector: 'app-connect-wallet', // Defines the component's selector for use in HTML templates.
  templateUrl: './connect-wallet.component.html', // Path to the HTML template for this component.
  styleUrls: ['./connect-wallet.component.css'] // Path to the CSS styles for this component.
})
export class ConnectWalletComponent {
  web3: Web3 | undefined; // Store the Web3.js instance after initialization.
  account: string | undefined; // Store the connected Ethereum account address.

  constructor() {}

  /**
   * Connects the user's Ethereum wallet using MetaMask.
   * Checks if MetaMask is installed and requests access to accounts.
   */
  connectWallet() {
    // Check if MetaMask (or a compatible Ethereum provider) is available in the browser.
    if (typeof window.ethereum !== 'undefined') {
      this.web3 = new Web3(window.ethereum); // Initialize Web3 with MetaMask's provider.

      // Request access to the user's Ethereum accounts.
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts: string[]) => {
          this.account = accounts[0]; // Use the first account in the returned list.
          console.log('Connected account:', this.account);

          // Fetch and log additional details for the connected account.
          this.getAccountDetails();
        })
        .catch((error: any) => {
          console.error('Error connecting to MetaMask:', error); // Log errors from MetaMask connection.
          alert('Please install MetaMask or enable it!'); // Notify user if there's an issue.
        });
    } else {
      // If MetaMask is not installed, alert the user.
      alert('MetaMask not installed!');
    }
  }

  /**
   * Fetches and logs the connected account's details such as balance.
   */
  getAccountDetails() {
    // Ensure Web3 and account are initialized before fetching details.
    if (this.web3 && this.account) {
      // Get the account's balance in Wei and convert it to Ether.
      this.web3.eth.getBalance(this.account)
        .then((balance: bigint) => { // Use bigint for balance as it is a large number.
          const balanceInEther = this.web3?.utils.fromWei(balance.toString(), 'ether'); // Convert Wei to Ether.
          console.log('Account balance:', balanceInEther, 'ETH'); // Log the balance in Ether.
        })
        .catch((error: any) => {
          console.error('Error fetching account balance:', error); // Log any errors during balance fetch.
        });
    }
  }
}
