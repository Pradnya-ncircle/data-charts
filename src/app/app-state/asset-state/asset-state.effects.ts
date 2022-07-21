import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, concatMap } from "rxjs";
import { GetAssetDataService } from "src/app/assets/get-asset-data.service";
import { DataActionTypes } from "./asset-state.actions";
@Injectable()
export class Effects {

    constructor(private httpService : GetAssetDataService, private actions$: Actions){}

    loadAssets$ = createEffect(()=>
        this.actions$.pipe(
            ofType(DataActionTypes.loadAllAssets),
            concatMap(() => this.httpService.getAssets()),
            map(assets => DataActionTypes.assetsLoaded({assets}))
        )
    )

    loadMeasurements$ = createEffect(()=>
    this.actions$.pipe(
        ofType(DataActionTypes.loadAllMeasurements),
        concatMap(() => this.httpService.getData()),
        map(measurements => DataActionTypes.measurementsLoaded({measurements}))
        )
    )

    createTreeView$ = createEffect(()=>
    this.actions$.pipe(
        ofType(DataActionTypes.assetsLoaded),
        // create tree view if assets are loaded ?
    )
    
    )
}