// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// // import {
// // loadAssetData,
// //     loadAssetDataSuccess,
// // loadSelectedAsset,
// // loadSelectedAssetChartData
// // } from './asset-state.actions';
// import { GetAssetDataService } from '../../assets/get-asset-data.service';
// import { of, from, Observable } from 'rxjs';
// import { switchMap, map, catchError, withLatestFrom, switchAll, mergeMap } from 'rxjs/operators';
// import { Store } from '@ngrx/store';
// import { AppState } from '../app.state';
// import { assetReducer } from './asset-state.reducer';
// import { loadAssets, selectAsset,loadAsstesSuccess,loadSelectedAssetChartData } from './asset-state.actions'
// import { selectAllAssets, selectCurrentAsset } from './asset-state.selectors';

// @Injectable()
// export class AssetEffects {
//   constructor(
//     private actions$: Actions,
//     private store: Store<AppState>,
//     private dataService: GetAssetDataService
//   ) {}

// loadAssetData$ = createEffect(()=> 
//      this.actions$.pipe(
//         ofType(loadAssets),
//         withLatestFrom(this.store.select(selectAllAssets)),
//         switchMap(() => from(this.dataService.getData()).pipe(
//             // map((asset) => loadAsstesSuccess({ assets: asset })),
//           map((asset)=> ({type : '[asset api] success', payload : asset}))
//         )
    
//      ),)
// );

// // getchartData$ = createEffect(()=>
// //     this.actions$.pipe(
// //         ofType(loadSelectedAssetChartData),
// //         withLatestFrom(this.store.select(selectCurrentAsset)),
// //          switchMap(()=> from())
// //     )
// // )

// }
