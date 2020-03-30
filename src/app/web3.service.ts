import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import { AbiItem } from 'web3-utils';
declare let require: any;
const Web3 = require('web3');
const contract = require('@truffle/contract');

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private web3: any;
  private accounts: string[];
  public ready = false;
  private contractAddr = '0xCfEB869F69431e42cdB54A4F4f105C19C080A601';

  public accountsObservable = new Subject<string[]>();

  constructor() {
    window.addEventListener('load', (event) => {
      this.bootstrapWeb3();
    });
  }

  public bootstrapWeb3() {
    console.log('init')
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.ethereum !== 'undefined') {
      // Use Mist/MetaMask's provider
      window.ethereum.enable().then(() => {
        this.web3 = new Web3(window.ethereum);
      });
    } else {
      console.log('No web3? You should consider trying MetaMask!');

      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    // setInterval(() => this.refreshAccounts(), 100);
  }

  public async artifactsToContract(artifacts) {
    if (!this.web3) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.artifactsToContract(artifacts);
    }

    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    return contractAbstraction;

}

  public async artifToContract(artif): Promise<any> {
    if (!this.web3) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.artifToContract(artif);
    }
    const b: AbiItem = artif.abi;
    return new this.web3.eth.Contract(b, this.contractAddr);
  }

  private async refreshAccounts() {
    const accs = await this.web3.eth.getAccounts();
    console.log('Refreshing accounts');

    // Get the initial account balance so it can be displayed.
    if (accs.length === 0) {
      console.warn('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.');
      return;
    }

    if (!this.accounts || this.accounts.length !== accs.length || this.accounts[0] !== accs[0]) {
      console.log('Observed new accounts');

      this.accountsObservable.next(accs);
      this.accounts = accs;
    }

    this.ready = true;
  }
}
