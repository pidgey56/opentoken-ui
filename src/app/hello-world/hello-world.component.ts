import { Component, OnInit } from "@angular/core";
import { Web3Service } from "../web3.service";
import { Contract } from "web3-eth-contract";
import { FormControl, FormGroup, Validators } from "@angular/forms";

const helloWorldArtifacts = require("../../assets/HelloWorld.json");

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

  constructor(private web3Service: Web3Service) {}

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
      .send({ from: this.account })
      .then(() => {
        this.form.reset();
        this.refreshDumbValue();
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
