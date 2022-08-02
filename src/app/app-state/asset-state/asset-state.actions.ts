import { Action, createAction, props } from "@ngrx/store";
import { Asset, ChartData } from "src/app/assets/asset-data.model";
import { Measurement } from "src/app/assets/measurement.model";


export enum appActionTypes {
    loadAllAssets = '[Assets] Load all assets via service',
    assetsLoaded = '[Assets Effect] Assets loaded successfully',
    loadAllMeasurements = '[Measurements] Load all measurements via service',
    measurementsLoaded = '[Measurements Effect] Measurements loaded successfully',
    currentAsset =  '[Assets] Get currently selected asset',
    setChartData =  '[charts] Get chart data for current asset',
}

export class loadAllAssets implements Action {
    public readonly type = appActionTypes.loadAllAssets
    // constructor(public payload : Asset[]){}
}

export class assetsLoaded implements Action {
    public readonly type = appActionTypes.assetsLoaded
    constructor(public payload : Asset[]){}
}

export class loadAllMeasurements implements Action {
    public readonly type = appActionTypes.loadAllMeasurements
    // constructor(public payload : Measurements[]){}
}


export class measurementsLoaded implements Action {
    public readonly type = appActionTypes.measurementsLoaded
    constructor(public payload : Measurement[]){}
}

// export class currentAsset implements Action {
//     public readonly type = appActionTypes.currentAsset
//     constructor(public assetId : number){}
// }

// export class setChartData implements Action {
//     public readonly type = appActionTypes.setChartData
//     constructor(public payload : ChartData[]){}
// }

export type ActionTypes = loadAllAssets | assetsLoaded | loadAllMeasurements | measurementsLoaded  


