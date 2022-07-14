import { AnimateTimings } from '@angular/animations';
import { CdkTreeNode, NestedTreeControl } from '@angular/cdk/tree';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { emptyProps, Store } from '@ngrx/store';
import { arraysAreNotAllowedInProps } from '@ngrx/store/src/models';

import { BaseChartDirective } from 'ng2-charts';
import { TreeviewItem } from 'ngx-treeview';
import { map } from 'rxjs/operators';

// import { loadAssetData, loadAssetDataSuccess, loadSelectedAsset } from '../app-state/asset-state/asset-state.actions';
// import { selectedAssetData } from '../app-state/asset-state/asset-state.selectors';

import { GetAssetDataService } from './get-asset-data.service';
import { Measurement } from './measurement.model';

// import { Color, Label } from 'ng2-charts';

interface assetNode{
  name: string;
  id: number,
  parentId : any,
  children? : assetNode[]
}


@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
  treeData :any;
  showFiller = true;
  selectedAssetId = 5;
  selectedAsset! : Object
  activeNode = '';
  title = 'Front End Assignment';
  assets : any;

  results : any;
  dates : any[] = [];
  dataSet : any;

  chartData: any;
  chartLabels : any;
  chartOptions : any;

  datesVal: any[] = []
  measurements1 : any []= []
 
    
  mesData : Measurement [] = [];
  @ViewChild(BaseChartDirective)
  chart!: BaseChartDirective; 

  treeControl = new NestedTreeControl<assetNode>(node => {
    return node.children;
  });
  dataSource = new MatTreeNestedDataSource<assetNode>();
  measurements: any[] =[];

  constructor(private dataService : GetAssetDataService,
    private datePipe : DatePipe){

    this.dataService.getAsstes().subscribe(res=>{
      this.assets = res
      this.dataSource.data = this.createTreeView(this.assets)
    })
  
  }


  ngOnInit(): void { 

    this.dataService.getData().subscribe(res=>{
      this.mesData = res;
    })
  
   }



  hasChild = (_:number, node: assetNode)=> !!node.children && node.children.length>0;
 
  createTreeView(dataset:any): assetNode[]{
    
    const map :any = {};
    dataset.forEach((aData:any) => map[aData.id] = aData);
    const dataTree: any[] = [];
  
    dataset.forEach((d:any) => {
      d['children'] = [];
      console.log(dataset)
      if (d.parentId !== null) {
        map[d.parentId].children = map[d.parentId]?.children || [];
        map[d.parentId].children.push(map[d.id]);
      } else {
        dataTree.push(map[d.id]);
      }
    });
   
    return dataTree;
  };

  iterateTree(treeNode:any, selectedNode : any) {
    console.log(treeNode)
           if(treeNode.children?.length === 0){
      
              const results = this.mesData.find((ele:any)=> ele.id == treeNode.id)
          
             let tempDts :any [] = []
             let tempMs: any [] = []
            
                 Object.entries(results?.measurements).forEach(([keys,values])=>{
                   if(this.dates.length === 0){
                     tempDts.push(this.datePipe.transform(keys, 'MMM yy'))
                   }
                     tempMs.push(values)
                 });
                 if (tempDts.length != 0) {
                   this.dates = tempDts;
                 }
               
                 return tempMs;   
              }
              else{
                  let sum : any []= []
                  treeNode.children?.forEach((elem:any)=>{
                    const measurements :any = this.iterateTree(elem,selectedNode)
                    if(sum.length === 0){
                      sum = measurements
                    }
                    else{
                      measurements.map((val:any, idx:number)=>{
                        sum[idx] = sum[idx] + val
                      })
                    }
                  })

                  return sum;
              }
         

  }

  getChartData(labels:any, dataset:any, selected :any){
    this.chartLabels = labels
     
    this.chartData = [
                        {
                            data :dataset,// measurement values
                            label : 'Asset '+selected, //selected asset 
                            fill : false,
                            tension: 0,
                            borderColor: '#4588d4' 
                        }
                   ]
                   console.log(this.chartLabels)

    this.chartOptions = {
      responsive : true
    }
  }

  selectedNode(node: any){

  
    this.selectedAssetId = node.id;
    // this.iterateData(this.selectedAssetId)
   
    let data = this.iterateTree(node,this.selectedAssetId)
    let labels = this.dates
    this.getChartData(labels, data, this.selectedAssetId)
   
    }
  }