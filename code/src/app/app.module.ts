import { NgModule } from '@angular/core'; // Import NgModule from Angular core
import { BrowserModule } from '@angular/platform-browser'; // Import BrowserModule for browser-based applications
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Import AngularFirestoreModule to work with Firebase Firestore

import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule for routing configuration
import { AppComponent } from './app.component'; // Import the root app component
import { SignUpSignInComponent } from './components/sign-up-sign-in/sign-up-sign-in.component'; // Import SignUpSignInComponent
import { ConnectWalletComponent } from './components/connect-wallet/connect-wallet.component'; // Import ConnectWalletComponent
import { ChooseInvestmentComponent } from './components/choose-investment/choose-investment.component'; // Import ChooseInvestmentComponent
import { FindInvestorComponent } from './components/find-investor/find-investor.component'; // Import FindInvestorComponent
import { ConfirmationComponent } from './components/confirmation/confirmation.component'; // Import ConfirmationComponent
import { PaymentComponent } from './components/payment/payment.component'; // Import PaymentComponent
import { TransactionComponent } from './components/transaction/transaction.component'; // Import TransactionComponent
import { DashboardComponent } from './components/dashboard/dashboard.component'; // Import DashboardComponent
import { HeroComponent } from './components/hero/hero.component'; // Import HeroComponent
import { FormsModule } from '@angular/forms'; // Import FormsModule to handle forms and two-way data binding
import { AboutComponent } from './about/about.component'; // Import AboutComponent for about page

@NgModule({
  declarations: [
    // Declare all components in this module
    AppComponent,
    SignUpSignInComponent,
    ConnectWalletComponent,
    ChooseInvestmentComponent,
    FindInvestorComponent,
    ConfirmationComponent,
    PaymentComponent,
    TransactionComponent,
    DashboardComponent,
    HeroComponent,
    AboutComponent,
  ],
  imports: [
    // Import other necessary modules for the app
    BrowserModule, // Required for any web application
    AppRoutingModule, // Contains routing configuration
    FormsModule, // To use forms and two-way data binding
    AngularFirestoreModule, // To work with Firebase Firestore
    AngularFirestoreModule.enablePersistence(), // Enables offline persistence for Firestore (keeping data local)
  ],
  providers: [], // Can be used to add services or global providers, if needed
  bootstrap: [AppComponent] // Bootstraps the root component of the app
})
export class AppModule { }
