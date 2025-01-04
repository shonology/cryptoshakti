import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, get } from 'firebase/database'; // Firebase modular import
import { initializeApp } from 'firebase/app';
import Web3 from 'web3'; // Import Web3 for interacting with MetaMask

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  selectedPlan: any; // To store the user's selected investment plan
  web3: Web3 | undefined; // Web3 instance for blockchain interaction
  paymentAmount: number = 0; // Payment amount entered by the user

  constructor() {}

  ngOnInit() {
    // Firebase configuration
    const firebaseConfig = {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: ''
    };

    // Initialize Firebase app
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    // Replace with authenticated user's ID
    const userId = 'user-123'; 
    const selectedPlanRef = ref(db, 'users/' + userId + '/selectedPlan');

    // Retrieve user's selected plan from Firebase
    get(selectedPlanRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.selectedPlan = snapshot.val();
          console.log('Retrieved selected plan:', this.selectedPlan);
        } else {
          console.log('No plan found for the user.');
        }
      })
      .catch((error) => {
        console.error('Error retrieving plan:', error);
      });
  }

  makePayment() {
    // Validate the payment amount and selected plan
    if (this.selectedPlan && this.paymentAmount > 0) {
      // Check if MetaMask is available
      if (typeof window.ethereum !== 'undefined') {
        this.web3 = new Web3(window.ethereum);
        
        // Request MetaMask account access
        window.ethereum
          .request({ method: 'eth_requestAccounts' })
          .then((accounts: string[]) => {
            const account = accounts[0];
            console.log('Connected account:', account);

            if (this.web3) {
              const paymentAmountInEther = this.paymentAmount; // User-entered amount

              // Validate the payment amount
              if (!isNaN(paymentAmountInEther) && paymentAmountInEther > 0) {
                const transactionData = {
                  from: account,
                  to: 'investment-plan-address', // Replace with actual investment address
                  value: this.web3.utils.toWei(paymentAmountInEther.toString(), 'ether'),
                };

                console.log('Transaction data:', transactionData); // Debug transaction data

                // Send the transaction
                this.web3.eth
                  .sendTransaction(transactionData)
                  .then((receipt) => {
                    console.log('Transaction successful:', receipt);
                    alert('Payment Successful!');
                  })
                  .catch((error) => {
                    console.error('Transaction failed:', error);
                    alert('Transaction failed! Please try again.');
                  });
              } else {
                alert('Please enter a valid payment amount!');
              }
            } else {
              console.error('Web3 is undefined');
            }
          })
          .catch((error: any) => {
            console.error('Error connecting to MetaMask:', error);
            alert('Please install MetaMask or enable it!');
          });
      } else {
        alert('MetaMask not installed!');
      }
    } else {
      alert('Please enter a valid payment amount!');
    }
  }
}
