import { Web3Service, IBalance} from './web3.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'openToken';
  addresses$: Observable<Array<string>>; 
  balances$: Observable<Array<IBalance>>;

  constructor(private web3Service: Web3Service) {}

  ngOnInit() {
    this.addresses$ = this.web3Service.getAddresses();
    this.balances$ = this.web3Service.getBalances();
  }

}
