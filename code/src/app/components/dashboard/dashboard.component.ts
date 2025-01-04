import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, get } from 'firebase/database'; // Firebase Realtime Database imports.
import { initializeApp } from 'firebase/app'; // Firebase initialization import.
import Web3 from 'web3'; // Web3.js for Ethereum blockchain interaction.

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html', // Dashboard HTML template.
  styleUrls: ['./dashboard.component.css'], // Dashboard component styles.
})
export class DashboardComponent implements OnInit {
  selectedPlan: any = null; // Holds the selected plan fetched from Firebase.
  investor: any = null; // Holds the selected investor details.
  blockchainInvestments: any[] = []; // Stores investments fetched from the blockchain.
  private web3: Web3 | undefined; // Web3.js instance for interacting with Ethereum.
  private contract: any; // Smart contract instance.

  // Firebase configuration (replace placeholders with actual values).
  private firebaseConfig = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  };

  // Ethereum smart contract configuration.
  private contractAddress = '<DEPLOYED_CONTRACT_ADDRESS>'; // Replace with deployed contract address.
  private contractABI = [
    {
      "inputs": [
        { "internalType": "string", "name": "planName", "type": "string" },
        { "internalType": "uint256", "name": "amount", "type": "uint256" },
        { "internalType": "uint256", "name": "returns", "type": "uint256" },
      ],
      "name": "addInvestment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function",
    },
    {
      "inputs": [{ "internalType": "address", "name": "investor", "type": "address" }],
      "name": "getInvestments",
      "outputs": [
        {
          "components": [
            { "internalType": "string", "name": "planName", "type": "string" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" },
            { "internalType": "uint256", "name": "returns", "type": "uint256" },
          ],
          "internalType": "struct InvestmentContract.Investment[]",
          "name": "",
          "type": "tuple[]",
        },
      ],
      "stateMutability": "view",
      "type": "function",
    },
  ];

  constructor() {}

  // Initialize the component.
  async ngOnInit(): Promise<void> {
    // Initialize Firebase app.
    const app = initializeApp(this.firebaseConfig);
    const db = getDatabase(app);

    const userId = ''; // Replace with actual user ID or session ID.

    // Fetch selected plan from Firebase.
    const selectedPlanRef = ref(db, `users/${userId}/selectedPlan`);
    get(selectedPlanRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.selectedPlan = snapshot.val();
          console.log('Fetched selected plan:', this.selectedPlan);
        } else {
          console.log('No selected plan found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching selected plan:', error);
      });

    // Fetch selected investor from Firebase.
    const selectedInvestorRef = ref(db, `users/${userId}/selectedInvestor`);
    get(selectedInvestorRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.investor = snapshot.val();
          console.log('Fetched selected investor:', this.investor);
        } else {
          console.log('No selected investor found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching selected investor:', error);
      });

    // Initialize Web3 and load blockchain investments.
    await this.setupWeb3();
    await this.loadBlockchainInvestments();
  }

  // Setup Web3.js for blockchain interaction.
  private async setupWeb3(): Promise<void> {
    if ((window as any).ethereum) {
      this.web3 = new Web3((window as any).ethereum); // Use MetaMask's provider.
      await (window as any).ethereum.enable(); // Request account access.
      this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress); // Initialize contract instance.
    } else {
      console.error('Ethereum wallet not detected!');
    }
  }

  // Load investments from the blockchain.
  private async loadBlockchainInvestments(): Promise<void> {
    if (!this.web3 || !this.contract) return;

    try {
      const accounts = await this.web3.eth.getAccounts(); // Get user accounts.
      const investments = await this.contract.methods.getInvestments(accounts[0]).call(); // Fetch investments.

      // Map blockchain investments to a usable format.
      this.blockchainInvestments = investments.map((investment: any) => ({
        planName: investment.planName,
        amount: this.web3?.utils.fromWei(investment.amount.toString(), 'ether'), // Convert Wei to Ether.
        returns: this.web3?.utils.fromWei(investment.returns.toString(), 'ether'), // Convert Wei to Ether.
      }));

      console.log('Blockchain investments:', this.blockchainInvestments);
    } catch (error) {
      /*where error loading the investment made by the person*/
      console.error('Error loading blockchain investments:', error);
    }
  }
}
