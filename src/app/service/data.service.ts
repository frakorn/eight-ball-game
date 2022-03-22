import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getConfig(){
    return this.http.get<any>('assets/data/config.json');
  }

  getMatch(){
    return this.http.get<any>('assets/data/match.json');
  }

  getTimestamps(){
    return this.http.get<any>('assets/data/timestamps.json');
  }

}
