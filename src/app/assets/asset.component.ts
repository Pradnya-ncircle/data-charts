  import { CdkTreeNode, NestedTreeControl } from '@angular/cdk/tree';
  import { DatePipe } from '@angular/common';
  import { Component, OnInit, ViewChild } from '@angular/core';
  import { MatTreeNestedDataSource } from '@angular/material/tree';
  import { emptyProps, Store } from '@ngrx/store';
 
  import { Asset } from './asset-data.model';
  import { GetAssetDataService } from './get-asset-data.service';
  import { Measurement } from './measurement.model';
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

    showFiller = true;
    selectedAssetId = 5;
    title = 'Front End Assignment';
    assets : Asset [] = [];
    availableAsset : any;
    measurementData : Measurement [] = [];
    dates : any[] = [];
    measurements: any[] =[];

    chartData: any;
    chartLabels : any;
    chartOptions : any;

    treeControl = new NestedTreeControl<assetNode>(node => {
      return node.children;
    });

    dataSource = new MatTreeNestedDataSource<assetNode>();
    constructor(private dataService : GetAssetDataService, private datePipe : DatePipe){}

    ngOnInit(): void { 

      this.dataService.getAssets().subscribe(res=>{
        this.assets = res
        this.dataSource.data = this.createTreeView(this.assets)
      })

      this.dataService.getData().subscribe(res=>{
        this.measurementData = res;
      })
    
    }

    hasChild = (_:number, node: assetNode)=> !!node.children && node.children.length>0;
  
    createTreeView(dataset:any): assetNode[]{
      
      const map :any = {};
      dataset.forEach((aData:any) => map[aData.id] = aData);
      const dataTree: any[] = [];
    
      dataset.forEach((d:any) => {
        d['children'] = [];
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

              if(treeNode.children?.length === 0){
                  const results = this.measurementData.find((ele:any)=> ele.id == treeNode.id)
             
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
                              data : dataset,
                              label : 'Asset '+ selected, 
                              fill : false,
                              tension: 0,
                              borderColor: '#4588d4' 
                          }
                    ]
                  
      this.chartOptions = {
        responsive : true
      }
    }

    selectedNode(node: any){
      this.selectedAssetId = node.id;
      this.availableAsset = this.measurementData.find((data : any)=> this.selectedAssetId === data.id ? data : undefined)
      let data = this.iterateTree(node,this.selectedAssetId)
      let labels = this.dates
      this.getChartData(labels, data, this.selectedAssetId)
    
      }
    }