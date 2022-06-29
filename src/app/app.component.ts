import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';


interface assetNode{
  name: string;
  children? : assetNode[]
}

const treeData : assetNode[] = [
  {
    name : 'Asset 0',
    children : []
  },
  {
    name : 'Asset 1',
    children : [
      {name : 'Asset 2',children: []},
      {name:'Asset 3',children : [
        {name : 'Asset 4', children : []}
      ]}
    ]
  }

]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showFiller = true;
  title = 'data-charts';

  treeControl = new NestedTreeControl<assetNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<assetNode>();

  constructor(){
    this.dataSource.data = treeData
  }

  hasChild = (_:number, node: assetNode)=> !!node.children && node.children.length>0;
}

