import { AnimateTimings } from '@angular/animations';
import { NestedTreeControl } from '@angular/cdk/tree';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Store } from '@ngrx/store';
import { BaseChartDirective } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { loadAssets, loadAsstesSuccess, selectAsset } from '../app-state/asset-state/asset-state.actions';
import { selectAssetEntities } from '../app-state/asset-state/asset-state.reducer';
import { selectCurrentAsset, selectCurrentAssetId } from '../app-state/asset-state/asset-state.selectors';
// import { loadAssetData, loadAssetDataSuccess, loadSelectedAsset } from '../app-state/asset-state/asset-state.actions';
// import { selectedAssetData } from '../app-state/asset-state/asset-state.selectors';

import { GetAssetDataService } from './get-asset-data.service';

// import { Color, Label } from 'ng2-charts';

interface assetNode{
  name: string;
  id: number,
  children? : assetNode[]
}

const treeData : assetNode[] = [
  {
    name : 'Asset 0',
    id: 0,
    children : []
  },
  {
    name : 'Asset 1',
    id: 1,
    children : [
      {name : 'Asset 2',id:2,children: []},
      {name:'Asset 3',id:3,children : [
        {name : 'Asset 4', id:4,children : []}
      ]}
    ]
  }

]
@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {

  showFiller = true;
  selectedAsset = 5;
  activeNode = '';
  title = 'Front End Assignment';

  results : any;
  dates : any[] = [];
  dataSet : any;

  chartData: any;
  chartLabels : any;
  chartOptions : any;


  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective; 

  treeControl = new NestedTreeControl<assetNode>(node => {
    return node.children;
  });
  dataSource = new MatTreeNestedDataSource<assetNode>();

  constructor(private dataService : GetAssetDataService,
    private store : Store,
    private datePipe : DatePipe){
    this.dataSource.data = treeData

    //  const assetData$ = this.store.select(loadAssetData)
  }


  ngOnInit(): void {

    // this.store.select(selectCurrentAsset).subscribe((asset)=>{
    //     console.log(asset)
    // })  
    // this.store.dispatch(loadSelectedAsset({selectedAsset : this.selectedAsset}))
    // this.store.dispatch(loadAssetDataSuccess());
    this.dataService.getData().subscribe(res=>{
        this.results = {
          data : res
        };
 
      this.dataSet = Object.entries(this.results.data).map((val:any)=>{ return val[1].measurements})
       Object.keys(this.dataSet[1]).forEach((element :any) => {
           this.dates.push(this.datePipe.transform(element, 'MMM yy'))
      });

       this.chartData = [
        {
          data : Object.values(this.dataSet[1]),// measurement values
          label : 'Asset 4', //selected asset 
          fill : false,
          tension: 0,
          borderColor: '#4588d4'
        }
      ]; 
    
      this.chartLabels = this.dates // measurements keys
    
      this.chartOptions = {
        responsive: true
      };
    })

  }

  hasChild = (_:number, node: assetNode)=> !!node.children && node.children.length>0;
 
  selectedNode(node: any){
    console.log(node)
    this.selectedAsset = node.id
    }

  }
  


