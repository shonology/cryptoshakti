import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction', // The component selector to be used in templates
  templateUrl: './transaction.component.html', // Path to the component's HTML template
  styleUrls: ['./transaction.component.css'] // Path to the component's styles
})
export class TransactionComponent {
  transactionId: string | undefined; // Variable to store the generated transaction ID
  transactionDate: string | undefined; // Variable to store the generated transaction date and time

  constructor() {
    // Call methods to initialize transaction ID and date when the component is created
    this.generateTransactionId();
    this.setTransactionDate();
  }

  /**
   * Generates a unique transaction ID by combining a random hexadecimal string and the current date.
   */
  generateTransactionId() {
    // Generate a random hexadecimal ID by converting a random number to hexadecimal and trimming to 8 characters
    const randomHex = Math.random().toString(16).substr(2, 8).toUpperCase();  // Generates random hexadecimal
    // Get the current date in 'YYYY-MM-DD' format
    const date = new Date().toISOString().split('T')[0];  // Current date in YYYY-MM-DD format
    // Concatenate the random hex and date to create a unique transaction ID
    this.transactionId = `#${randomHex}${date}`;
  }

  /**
   * Sets the transaction date to the current local date and time.
   */
  setTransactionDate() {
    // Get the current date and time in the user's local format (e.g., "MM/DD/YYYY, HH:MM:SS AM/PM")
    this.transactionDate = new Date().toLocaleString();  // Displays date and time in local format
  }

  /**
   * Prints the current page (for generating a printable transaction report).
   */
  printReport() {
    // Trigger the print dialog for the current page
    window.print();
  }
}
