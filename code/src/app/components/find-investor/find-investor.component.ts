import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database'; // Firebase Realtime Database functions.

@Component({
  selector: 'app-find-investor',
  templateUrl: './find-investor.component.html',
  styleUrls: ['./find-investor.component.css'],
})
export class FindInvestorComponent {
  // Sample investors data
  investors = [
    { name: 'Investor A', interestRate: 1, amount: 0.29 },
    { name: 'Investor B', interestRate: 1.5, amount: 0.43 },
    { name: 'Investor C', interestRate: 2, amount: 0.58 },
  ];

  selectedInvestor: any = null; // To store the currently selected investor.

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

  constructor(private router: Router) {
    // Initialize Firebase if not already initialized.
    initializeApp(this.firebaseConfig);
  }

  // Handler for selecting an investor.
  onSelectInvestor(investor: any) {
    this.selectedInvestor = investor; // Set the selected investor.
    console.log('Selected Investor:', investor);
  }

  // Save selected investor to Firebase Realtime Database.
  saveSelection() {
    if (this.selectedInvestor) {
      const app = initializeApp(this.firebaseConfig); // Initialize Firebase App.
      const db = getDatabase(app); // Get Firebase Realtime Database instance.

      const userId = ''; // Replace with the actual user ID or session.
      const investorRef = ref(db, `users/${userId}/selectedInvestor`);

      set(investorRef, this.selectedInvestor)
        .then(() => {
          console.log('Investor saved:', this.selectedInvestor);
          // Navigate to the confirmation page.
          this.router.navigate(['/confirmation']);
        })
        .catch((error) => {
          console.error('Error saving investor to database:', error);
        });
    } else {
      alert('Please select an investor first.');
    }
  }

  // Navigate to confirmation page with selected investor details.
  proceed() {
    if (this.selectedInvestor) {
      this.router.navigate(['/confirmation'], {
        queryParams: {
          investorName: this.selectedInvestor.name,
          investorInterestRate: this.selectedInvestor.interestRate,
          investorAmount: this.selectedInvestor.amount,
        },
      });
    } else {
      alert('Please select an investor before proceeding.');
    }
  }
}
