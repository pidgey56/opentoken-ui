import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { Observable, from } from 'rxjs';
import {HttpClient} from '@angular/common/http';

const contractAbi = require('../assets/HelloWorld.json');

export interface IBalance {
  address: string;
  balance: string;
}

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  private readonly instance: Web3;
  private contractAddr = '0xCfEB869F69431e42cdB54A4F4f105C19C080A601';

  constructor(private http: HttpClient) {
    this.instance = new Web3('ws://localhost:8545');
  }

  getDumbValue(): Observable<string> {
    const contract = new this.instance.eth.Contract(contractAbi.abi, this.contractAddr);
    return contract.methods.getDumbValue().call();
  }

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
