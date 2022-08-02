import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, concatMap } from "rxjs";
import { GetAssetDataService } from "src/app/assets/get-asset-data.service";
import { appActionTypes, ActionTypes, assetsLoaded } from "./asset-state.actions";
@Injectable()
export class Effects {

    constructor(private httpService : GetAssetDataService, private actions$: Actions){}

    loadAssets$ = createEffect(()=>
        this.actions$.pipe(
            ofType(appActionTypes.loadAllAssets),
            concatMap(() => this.httpService.getAssets()),
            // map(assets => new assetsLoaded({ assets }))
        )
    )

    loadMeasurements$ = createEffect(()=>
    this.actions$.pipe(
        ofType(appActionTypes.loadAllMeasurements),
        concatMap(() => this.httpService.getData()),
        // map(measurements => appActionTypes.measurementsLoaded({measurements}))
        )
    )

    // createTreeView$ = createEffect(()=>
    // this.actions$.pipe(
    //     ofType(appActionTypes.assetsLoaded),
    //     switchMap((asset)=> this.httpService.getTreeView(asset))
    //     // create tree view if assets are loaded ?
    // )
    
    // )
}