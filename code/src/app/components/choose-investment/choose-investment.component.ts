import { Component } from '@angular/core'; // Import Angular core functionality for creating components.
import { Router } from '@angular/router'; // Import Router for navigation between pages.
import { getDatabase, ref, set } from 'firebase/database'; // Import Firebase database utilities.
import { initializeApp } from 'firebase/app'; // Import Firebase app initialization function.

@Component({
  selector: 'app-choose-investment', // Defines the selector used to include this component in templates.
  templateUrl: './choose-investment.component.html', // Path to the component's HTML template.
  styleUrls: ['./choose-investment.component.css'], // Path to the component's CSS styles.
})
export class ChooseInvestmentComponent {
  // List of available investment plans with their details.
  investmentPlans = [
    { name: 'Bronze', description: '3% return at $200', returnPercentage: 3 },
    { name: 'Gold', description: '5% return at $500', returnPercentage: 5 },
    { name: 'Diamond', description: '8% return at $700', returnPercentage: 8 },
  ];

  selectedPlan: any = null; // Stores the currently selected investment plan.

  // Firebase configuration details. Replace placeholder values with actual Firebase project credentials.
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

  constructor(private router: Router) {
    // Initialize Firebase only if it hasn't already been initialized.
    if (!initializeApp.length) {
      initializeApp(this.firebaseConfig);
    }
  }

  /**
   * Selects an investment plan.
   * @param plan - The selected investment plan object.
   */
  selectPlan(plan: any) {
    this.selectedPlan = plan; // Store the selected plan.
    console.log('Selected Plan:', this.selectedPlan); // Log the selected plan to the console for debugging.
  }

  /**
   * Saves the selected plan to Firebase and navigates to the next page.
   */
  saveAndProceed() {
    if (this.selectedPlan) {
      // Initialize the Firebase app using the provided configuration.
      const app = initializeApp(this.firebaseConfig);
      const db = getDatabase(app); // Get a reference to the Firebase database.

      const userId = ''; // Replace with the actual user ID. This should be dynamic based on the logged-in user.
      const selectedPlanRef = ref(db, `users/${userId}/selectedPlan`); // Reference to the user's selected plan in the database.

      // Save the selected plan to Firebase.
      set(selectedPlanRef, this.selectedPlan)
        .then(() => {
          console.log('Selected plan saved to Firebase'); // Log success to the console.

          // Navigate to the "Find Investor" page, passing selected plan details as query parameters.
          this.router.navigate(['/find-investor'], {
            queryParams: {
              planName: this.selectedPlan.name,/*initialized with selected plan name*/
              planDescription: this.selectedPlan.description,/*initialized with plan description*/
              returnPercentage: this.selectedPlan.returnPercentage,/*initialized with return percentage*/ 
            },
          });
        })
        .catch((error) => {
          // Handle any errors that occur while saving the data to Firebase.
          console.error('Error saving selected plan:', error);
        });
    } else {
      // Prompt the user to select a plan if none is selected.
      alert('Please select an investment plan.');
    }
  }
}
