import { NgModule } from '@angular/core'; // Import NgModule to define an Angular module
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule and Routes for routing functionality
import { HeroComponent } from './components/hero/hero.component'; // Import the HeroComponent (main page)
import { FindInvestorComponent } from './components/find-investor/find-investor.component'; // Import FindInvestorComponent
import { SignUpSignInComponent } from './components/sign-up-sign-in/sign-up-sign-in.component'; // Import SignUpSignInComponent
import { ConfirmationComponent } from './components/confirmation/confirmation.component'; // Import ConfirmationComponent
import { PaymentComponent } from './components/payment/payment.component'; // Import PaymentComponent
import { TransactionComponent } from './components/transaction/transaction.component'; // Import TransactionComponent
import { DashboardComponent } from './components/dashboard/dashboard.component'; // Import DashboardComponent
import { ConnectWalletComponent } from './components/connect-wallet/connect-wallet.component'; // Import ConnectWalletComponent
import { ChooseInvestmentComponent } from './components/choose-investment/choose-investment.component'; // Import ChooseInvestmentComponent
import { AboutComponent } from './about/about.component'; // Import AboutComponent

// Define an array of routes for the application
const routes: Routes = [
  { path: 'hero', component: HeroComponent }, // Main page route
  { path: 'connect-wallet', component: ConnectWalletComponent }, // Route to connect wallet
  { path: 'sign-up-sign-in', component: SignUpSignInComponent }, // Route for signup/sign-in page
  { path: 'find-investor', component: FindInvestorComponent }, // Route for finding an investor
  { path: 'confirmation', component: ConfirmationComponent }, // Route for confirmation page
  { path: 'payment', component: PaymentComponent }, // Route for the payment page
  { path: 'transaction', component: TransactionComponent }, // Route for transaction details page
  { path: 'dashboard', component: DashboardComponent }, // Route for dashboard page
  { path: 'about', component: AboutComponent }, // Route for about page
  { path: 'choose-investment', component: ChooseInvestmentComponent }, // Route for choosing investment page
  { path: '', redirectTo: '/hero', pathMatch: 'full' }, // Default route, redirects to the main page ('/hero')
  { path: '**', redirectTo: '/hero' } // Wildcard route for any undefined paths, redirects to main page
];

// NgModule that configures the routing module
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configure routing to use the specified routes
  exports: [RouterModule] // Export RouterModule to make it available throughout the app
})
export class AppRoutingModule {} // AppRoutingModule class to handle routing
