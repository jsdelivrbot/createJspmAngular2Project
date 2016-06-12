import { Component, Injectable} from 'angular2/core';

import { Http} from 'angular2/http';

import { Myfirebase} from './myfirebase';


@Component({
  selector: 'myapp-test',
  template: `<p>hello world angular2</p>
  <hr/>
  <p>from http</p>
  <button (click)="showAll();">show User</button>
  <ul>
    <li *ngFor="#item of users">{{item.url}}</li>
  </ul>
  <hr/>
  <p>from firebase</p>
  <button (click)="showFb()">show fb</button>
  <ul>
    <li *ngFor="#tt of uu">{{tt.name}}</li>
  </ul>
  `,
  providers: [Myfirebase]
  })

@Injectable()
export class Myapp {
    constructor(_http: Http, fb: Myfirebase) {
      this._http = _http;
      this.fb = fb;
    }
    users = [];
    showAll() {
      this._http.get('https://api.github.com/users').subscribe(res => this.users = res.json());
    }
    uu = [];
    showFb() {
      this.fb.getFbData().subscribe(
        user => this.uu = JSON.stringify(user),
        error => console.log(error)
      )
    }
  }
