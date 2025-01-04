import { Component, OnInit } from '@angular/core'; // Import Angular core module for components.
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute to access route parameters.
import { getDatabase, ref, get, set } from 'firebase/database'; // Firebase database methods for fetching and saving data.
import { initializeApp } from 'firebase/app'; // Firebase app initialization method.

@Component({
  selector: 'app-confirmation', // Defines the component's selector for use in templates.
  templateUrl: './confirmation.component.html', // Path to the component's HTML template.
  styleUrls: ['./confirmation.component.css'], // Path to the component's CSS styles.
})
export class ConfirmationComponent implements OnInit {
  selectedPlan: any = null; // Stores the user's selected investment plan fetched from Firebase.
  investor: any = null; // Stores the user's selected investor details fetched from Firebase.

  // Firebase configuration object. Replace placeholder values with actual credentials.
  private firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

  router: any; // Router object placeholder. Should be properly initialized or injected in the constructor.
  ethPrice: any; // Placeholder for Ethereum price or related data, if needed.

  constructor(private route: ActivatedRoute) {}

  /**
   * Lifecycle hook: Called after the component is initialized.
   * Fetches the selected plan and investor details from Firebase.
   */
  ngOnInit(): void {
    const app = initializeApp(this.firebaseConfig); // Initialize Firebase app.
    const db = getDatabase(app); // Get reference to the Firebase database.

    const userId = ''; // Replace with the actual user ID from authentication or session.

    // Fetch selected plan details from Firebase.
    const selectedPlanRef = ref(db, `users/${userId}/selectedPlan`);
    get(selectedPlanRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.selectedPlan = snapshot.val(); // Store fetched plan details.
          console.log('Fetched selected plan:', this.selectedPlan);
        } else {
          console.log('No selected plan found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching selected plan:', error); // Log any errors.
      });

    // Fetch selected investor details from Firebase.
    const selectedInvestorRef = ref(db, `users/${userId}/selectedInvestor`);
    get(selectedInvestorRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          this.investor = snapshot.val(); // Store fetched investor details.
          console.log('Fetched selected investor:', this.investor);
        } else {
          console.log('No selected investor found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching selected investor:', error); // Log any errors.
      });
  }

  /**
   * Saves the selected plan and investor details back to Firebase.
   */
  saveDataToFirebase() {
    const app = initializeApp(this.firebaseConfig); // Initialize Firebase app.
    const db = getDatabase(app); // Get reference to the Firebase database.

    const userId = ''; // Replace with the actual user ID from authentication or session.

    // Save the selected plan and investor details to Firebase.
    set(ref(db, 'users/' + userId), {
      selectedPlan: this.selectedPlan, // Selected investment plan.
      selectedInvestor: this.investor, // Selected investor details.
    })
      .then(() => {
        console.log('Data saved to Firebase'); // Log success message.

        // Redirect to another page after successful save. Ensure `this.router` is properly initialized.
        this.router.navigate(['/another-page']);
      })
      .catch((error) => {
        console.error('Error saving data to Firebase:', error); // Log any errors that occur.
      });
  }
}
