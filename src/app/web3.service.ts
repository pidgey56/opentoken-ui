import { Injectable } from "@angular/core";
import Web3 from "web3";
import { Observable, from } from "rxjs";

export interface IBalance {
  address: string;
  balance: string;
}

@Injectable({
  providedIn: "root"
})
export class Web3Service {
  private instance: Web3;

  constructor() {
    this.instance = new Web3("ws://localhost:8545");
  }

  getInstance() {
    return this.instance;
  }

  getAddresses(): Observable<Array<string>> {
    return from(this.instance.eth.getAccounts());
  }

  getBalances(): Observable<Array<IBalance>> {
    return from(
      this.instance.eth.getAccounts().then(accounts => {
        let balances: Array<IBalance> = [];
        for (let account of accounts) {
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
