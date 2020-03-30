import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Observable, from } from 'rxjs';
import { Contract } from 'web3-eth-contract';

const contractAbi = require('../assets/HelloWorld.json');

declare let window: any;

export interface IBalance {
  address: string;
  balance: string;
}

@Injectable({
  providedIn: 'root'
})
export class Web3Service2 {
  private instance: Web3;
  private contractAddr = '0xCfEB869F69431e42cdB54A4F4f105C19C080A601';
  private contract: Contract;

  constructor() {
    if(typeof window.ethereum !== 'undefined') {
      console.log(0)
      window.ethereum.enable().then(() => {
        this.instance = new Web3(window.ethereum);
      });
    } else {
      console.log(1)
      this.instance = new Web3(new Web3.providers.HttpProvider('ws://localhost:8545'));

    }
    this.contract = new this.instance.eth.Contract(contractAbi.abi, this.contractAddr);
  }

  getDumbValue(): Observable<string> {
    return this.contract.methods.getDumbValue().call();
  }

  // setDumbValue(newValue: string): Observable<boolean> {
  //   this.contract.methods.setDumbValue().sendTransaction(newValue);
  // }

  getAddresses(): Observable<Array<string>> {
    return from(this.instance.eth.getAccounts());
  }

  getBalances(): Observable<Array<IBalance>> {
    return from(
      this.instance.eth.getAccounts().then(accounts => {
        const balances: Array<IBalance> = [];
        for (const account of accounts) {
          this.instance.eth.getBalance(account).then(balance => {
            const b: IBalance = {
              address: account,
              balance
            };
            balances.push(b);
          });
        }
        return balances;
      })
    );
  }
}
