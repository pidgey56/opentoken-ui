import { Web3Service } from './web3.service';
import { Component, OnInit } from '@angular/core';

import { Contract } from 'web3-eth-contract';
declare let require: any;
const helloWorldArtifacts = require('../assets/HelloWorld.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'openToken';
  HelloWorld: Contract;

  account: string;
  value: string;

  constructor(private web3Service: Web3Service) {}

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.account = accounts[0];
    });
  }

  sendTx() {
    this.HelloWorld.methods.setDumbValue('Helloo')
      .send({ from: this.account })
      .then(() => this.refreshDumbValue());
  }

  refreshDumbValue(): void {
    this.HelloWorld.methods
      .getDumbValue()
      .call()
      .then(dumb => {
        this.value = dumb;
      });

  }

  ngOnInit() {
    this.watchAccount();
    this.web3Service.artifactToContract(helloWorldArtifacts)
      .then(cc => {
        this.HelloWorld = cc;
        return this.HelloWorld.methods.getDumbValue().call();
      }).then(dumb => {
      this.value = dumb;
    });
  }






}
