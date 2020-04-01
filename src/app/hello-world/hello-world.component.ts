import { Component, OnInit } from "@angular/core";
import { Web3Service } from "../services/web3Service/web3.service";
import { Contract } from "web3-eth-contract";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {MatSnackBar} from '@angular/material';

declare let require: any;
const helloWorldArtifacts = require("../../assets/abi/HelloWorld.json");

@Component({
  selector: "app-hello-world",
  templateUrl: "./hello-world.component.html",
  styleUrls: ["./hello-world.component.scss"]
})
export class HelloWorldComponent implements OnInit {
  HelloWorldInstance: Contract;
  dumbValue: string;
  account: string;
  form: FormGroup;

  constructor(private web3Service: Web3Service, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.watchAccount();
    this.web3Service
      .artifactToContract(helloWorldArtifacts)
      .then(instance => {
        this.HelloWorldInstance = instance;
        return this.HelloWorldInstance.methods.getDumbValue().call();
      })
      .then(dumb => {
        this.dumbValue = dumb;
      });

    this.form = new FormGroup({
      newValue: new FormControl("", Validators.required)
    });
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe(accounts => {
      this.account = accounts[0];
    });
  }

  sendTx() {
    this.HelloWorldInstance.methods
      .setDumbValue(this.form.getRawValue().newValue)
      .send({ from: this.account, gas: 4500000 })
      .then(() => {
        this.snackBar.open("Success ! :D", "X")
        this.form.reset();
        this.refreshDumbValue();
      })
      .catch(err => {
        this.snackBar.open("Something went wrong ! :(", "X");
      });
  }

  refreshDumbValue(): void {
    this.HelloWorldInstance.methods
      .getDumbValue()
      .call()
      .then(dumb => {
        this.dumbValue = dumb;
      });
  }
}
