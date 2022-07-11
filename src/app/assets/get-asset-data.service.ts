import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAssetDataService {

  constructor(private http : HttpClient) { }

   baseUrl = "http://localhost:3000/measurement"

  getData():Observable<any>{
    return this.http.get(this.baseUrl)
  }

  getDataById(id:number):Observable<any>{
    return this.http.get(this.baseUrl + '/' + id)
  }

}
