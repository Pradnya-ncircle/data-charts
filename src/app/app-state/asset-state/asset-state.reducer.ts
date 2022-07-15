import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Asset, ChartData } from "src/app/assets/asset-data.model";
import { Measurement } from "src/app/assets/measurement.model";
import { DataActionTypes } from "./asset-state.actions";

export interface AssetState extends EntityState<Asset>{
    assetsLoaded : boolean;
    selectedAssetId : number
}

export interface MeasurementState extends EntityState<Measurement>{
   measurementsLoaded : boolean;
}

export interface ChartState extends EntityAdapter<ChartData>{
    chartDataLoaded : boolean;
}

export interface AppState {
    asstes : AssetState,
    measurements : MeasurementState,
    chart : ChartState
}


export const assetAdapter: EntityAdapter<Asset> = createEntityAdapter<Asset>();
export const measurementAdapter: EntityAdapter<Measurement> = createEntityAdapter<Measurement>();
export const chartAdapter: EntityAdapter<ChartData> = createEntityAdapter<ChartData>();


export const assetInitialState = assetAdapter.getInitialState({ assetsLoaded : false}) 
export const measurementInitialState = measurementAdapter.getInitialState({ measurementsLoaded : false}) 
export const chartInitialState = chartAdapter.getInitialState({ chartDataLoaded : false}) 

export const initialState = {
    assets : assetInitialState,
    measurements : measurementInitialState,
    chartData : chartInitialState
}

export const Reducer = createReducer(
    initialState,
    
    on(DataActionTypes.assetsLoaded, (state, action)=>({
        ...state,
        assetsLoaded : true,
        assets : assetAdapter.setAll(action.assets, state.assets)
    })),
     
    on(DataActionTypes.measurementsLoaded, (state, action)=>({
        ...state,
        measurementsLoaded : true,
        measurements : measurementAdapter.setAll(action.measurements, state.measurements)
    })),

    on(DataActionTypes.currentAsset, (state, action)=>({
        ...state,
        selectedAssetId : action.assetId, 
    })),

    on(DataActionTypes.setChartData, (state,action)=>({
        ...state,
        chartData : chartAdapter.setAll(action.chartData, state.chartData)
    }))

)