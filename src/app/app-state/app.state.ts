import {
    ActionReducer,
    ActionReducerMap,
    combineReducers,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromAppState from './asset-state/asset-state.reducer';

  
  export interface AppState {
    assets : fromAppState.AssetState,
    measurements : fromAppState.MeasurementState,
    charts: fromAppState.ChartState

  }
  
  // export const allReducers = combineReducers({
  //   assets : assetReducer,
  //   measurements :measurementReducer,
  //   charts: chartsReducer
  //   })

  // export const allReducers :  ActionReducerMap<AppState, any> = {
  //   assets : fromAppState.assetReducer,
  //   measurements :fromAppState.measurementReducer,
  //   charts: fromAppState.chartsReducer
  // }
  
  
  export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];