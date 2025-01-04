import { Component } from '@angular/core';
import { keygen } from '@analog-labs/timegraph-js'; // Import key generation module from Analog SDK
import { web3FromAddress } from '@polkadot/extension-dapp'; // Polkadot extension for accessing wallet
import { TimegraphClient } from '@analog-labs/timegraph-js'; // Client to interact with Analog's Timegraph service
import { Router } from '@angular/router'; // Import Router for navigation between components/pages

@Component({
    selector: 'app-sign-up-sign-in',
    templateUrl: './sign-up-sign-in.component.html',
    styleUrls: ['./sign-up-sign-in.component.css']
})
export class SignUpSignInComponent {
    formData = {
        email: '', // Stores user input for email
        password: '' // Stores user input for password
    };
    walletAddress: string = ''; // To store the connected wallet address
    sessionKey: string = ''; // To store the generated session key
    timeGraphClient: TimegraphClient | null = null; // Analog Timegraph client instance

    constructor(private router: Router) {} // Inject Router to enable navigation

    /**
     * Handles the sign-in process. Generates session key and API key,
     * authenticates the user, and initializes TimegraphClient.
     */
    async onSubmit() {
        console.log('Sign In:', this.formData);

        try {
            // Generate session key and API key using the connected wallet address
            const { signer } = await web3FromAddress(this.walletAddress);
            const _keygen = new keygen({ signer: signer.signRaw, address: this.walletAddress });

            // Generate API key and session key for the user
            const apiKey = await _keygen.createApiKey();
            const generatedSessionKey = await _keygen.createSessionkey();

            // Ensure the session key is valid
            if (!generatedSessionKey || typeof generatedSessionKey !== 'string') {
                throw new Error('Session key generation failed or is not a valid string');
            }

            this.sessionKey = generatedSessionKey; // Save the session key

            // Initialize the Timegraph client with the session key
            this.timeGraphClient = new TimegraphClient({
                url: 'https://timegraph.testnet.analog.one/graphql', // Analog's testnet URL
                sessionKey: this.sessionKey,
            });

            // Create a new user in Analog's Timegraph service
            const response = await this.timeGraphClient.user.create({ address: this.walletAddress });
            console.log('User Created:', response);
            // Handle successful authentication
        } catch (error) {
            console.error('Error signing in:', error);
        }
    }

    /**
     * Redirects the user to the registration page.
     */
    register() {
        console.log('Redirect to Registration');
    }

    /**
     * Connects the user's MetaMask wallet and retrieves the wallet address.
     * Also sets up Analog services for further actions.
     */
    async connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request the user's MetaMask account
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    this.walletAddress = accounts[0]; // Save the first wallet address
                    console.log('Wallet connected:', this.walletAddress);

                    // Setup Analog services after wallet connection
                    await this.setupAnalogServices();

                    // Navigate to the next page (e.g., 'connect-wallet') after successful connection
                    this.router.navigate(['/connect-wallet']);
                } else {
                    console.log('No accounts found');
                }
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            console.error('MetaMask is not installed or available');
        }
    }

    /**
     * Sets up Analog services by generating session key and API key
     * using the connected wallet address.
     */
    async setupAnalogServices() {
        try {
            // Ensure wallet address is available
            if (!this.walletAddress) {
                throw new Error('No wallet address found');
            }

            // Generate session key and API key for the user
            const { signer } = await web3FromAddress(this.walletAddress);
            const _keygen = new keygen({ signer: signer.signRaw, address: this.walletAddress });

            const apiKey = await _keygen.createApiKey();
            const generatedSessionKey = await _keygen.createSessionkey();

            // Validate the generated session key
            if (!generatedSessionKey || typeof generatedSessionKey !== 'string') {
                throw new Error('Session key generation failed or is not a valid string');
            }

            this.sessionKey = generatedSessionKey; // Store session key

            // Initialize the Timegraph client with the session key
            this.timeGraphClient = new TimegraphClient({
                url: 'https://timegraph.testnet.analog.one/graphql', // Analog testnet URL
                sessionKey: this.sessionKey,
            });

            // Create or authenticate the user in Analog's Timegraph
            const response = await this.timeGraphClient.user.create({ address: this.walletAddress });
            console.log('User Created:', response);
            // Handle successful user setup
        } catch (error) {
            console.error('Error setting up Analog services:', error);
        }
    }
}
