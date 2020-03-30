import { Web3Service } from './web3.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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

  constructor(private web3Service: Web3Service) {}

  ngOnInit() {
    /*this.web3Service.artifactsToContract(helloWorldArtifacts)
      .then(HelloWorldAbstraction => {
        this.HelloWorld = HelloWorldAbstraction;
        this.HelloWorld.deplo
      })*/
    let blap;
    this.web3Service.artifToContract(helloWorldArtifacts)
      .then(cc => {
        // return cc.methods.getDumbValue().call();
        // }).then(dumb => console.log(dumb));
        blap = cc;
               return cc.methods.setDumbValue('Hello')
          .send({from: '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1', gas: "210000"});
      }).then((f) => {
        console.log(1, f);
        return blap.methods.getDumbValue().call();
    })
      .then((res) => console.log(0, res))
      .catch(err => console.error(err.message));

    // this.HelloWorld.methods.getDumbValue().call()
      /*.then(db => {
        console.log('OK ', db);
      });*/
  }
}
