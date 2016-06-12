import { Injectable} from 'angular2/core';
import { Http} from 'angular2/http';

import 'rxjs/Rx';

@Injectable()
export class Myfirebase {
  constructor(_http: Http) {
    this._http = _http;
  }
  url = 'https://ng2-hello.firebaseio.com/';
  setFbData(uf: String, ul: String) {
    this._http.put(this.url, JSON.stringify({
      firstName: uf,
      lastName: ul
    })).map(res => res.json());
  }


  getFbData() {
    return this._http.get(this.url).map(res => res.json(), console.log('here'));

  }
}
