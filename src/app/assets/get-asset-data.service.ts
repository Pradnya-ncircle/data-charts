import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAssetDataService {

  constructor(private http : HttpClient) { }

  getData():Observable<any>{
    return this.http.get('assets/data/measurements.json')
  }

  getAssets():Observable<any>{
    return this.http.get('assets/data/assets.json')
  }

  getTreeView(asset:any){console.log(asset)}

}
