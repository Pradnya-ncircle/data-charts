// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    <T>(id: string): T;
    keys(): string[];
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().forEach(context);


//http://stackoverflow.com/questions/38824196/cascading-parent-child-select-boxes-from-dynamic-json-data

// var myApp = angular.module('myApp', []);

// myApp.filter('optionFilter', function() {
//   return function(items, parent, self) {
//     var result = [];
//     if (parent) {
//       for (var i = 0; i < items.length; i++) {
//         if (parent.selectedOption !== null && items[i].parentValue === parent.selectedOption.value) {
//           result.push(items[i]);
//         }
//       }
//       if (self.selectedOption === null) {
//         self.selectedOption = result[0];
//       }      
//       return result;
//     } else {
//       return items;
//     }
//   }
// });


// myApp.controller("MyCtrl", function($scope) {

//   this.update = function(item) {
//     console.log(item);
//     if (item.selectedOption === null) {
//       item.selectedOption = item.availableOptions[0];
//     }
//   };

//   this.data = {
//     Country: {
//       parent: "None",
//       availableOptions: [{
//         value: "United States",
//         parentValue: "None",
//         id: 1
//       }, {
//         value: "China",
//         parentValue: "None",
//         id: 2
//       }, {
//         value: "India",
//         parentValue: "None",
//         id: 3
//       }],
//       selectedOption: {
//         value: "United States",
//         parentValue: "None",
//         id: 1
//       }
//     },
//     State: {
//       parent: "Country",
//       availableOptions: [{
//         value: "California",
//         parentValue: "United States",
//         id: 1
//       }, {
//         value: "Shanghai",
//         parentValue: "China",
//         id: 2
//       }, {
//         value: "Delhi",
//         parentValue: "India",
//         id: 3
//       },
//       {
//         value: "New York",
//         parentValue: "United States",
//         id: 4
//       }, {
//         value: "Rajasthan",
//         parentValue: "India",
//         id: 5
//       }, {
//         value: "Guangdong",
//         parentValue: "China",
//         id: 6
//       }],
//       selectedOption: {
//         value: "California",
//         parentValue: "United States",
//         id: 1
//       }
//     },
//     City: {
//       parent: "State",
//       availableOptions: [{
//         value: "Greenfield",
//         parentValue: "California",
//         id: 1
//       }, {
//         value: "Shanghai",
//         parentValue: "Shanghai",
//         id: 2
//       }, {
//         value: "New Delhi",
//         parentValue: "Delhi",
//         id: 3
//       }, {
//         value: "Nevada City",
//         parentValue: "California",
//         id: 4
//       }, {
//         value: "Geneva",
//         parentValue: "New York",
//         id: 5
//       }, {
//         value: "Jaipur",
//         parentValue: "Rajasthan",
//         id: 6
//       }, {
//         value: "Udaipur",
//         parentValue: "Rajasthan",
//         id: 7
//       }, {
//         value: "Shenzhen",
//         parentValue: "Guangdong",
//         id: 8
//       }, {
//         value: "Shantou",
//         parentValue: "Guangdong",
//         id: 9
//       }],
//       selectedOption: {
//         value: "Greenfield",
//         parentValue: "California",
//         id: 1
//       }
//     }
//   };

// });