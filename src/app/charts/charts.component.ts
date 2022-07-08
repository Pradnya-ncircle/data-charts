import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {


  @Input('selectedAsset') asset : Object | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
