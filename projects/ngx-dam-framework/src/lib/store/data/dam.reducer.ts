import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { emptyRepository, ICollections, IDamResource } from '../../models/data/repository';
import { emptyDataModel, IDamDataModel } from '../../models/data/state';
import { emptyWorkspace } from '../../models/data/workspace';
import { DamActions, DamActionTypes } from './dam.actions';

export const initialState: IDamDataModel = emptyDataModel;
export const repositoryAdapter = createEntityAdapter<IDamResource>();

// tslint:disable-next-line: cognitive-complexity  no-big-function
export function reducer(state = initialState, action: DamActions): IDamDataModel {
  const current: ICollections = state.repository.collections;
  switch (action.type) {

    case DamActionTypes.InitWidgetId:
      return {
        ...state,
        setup: {
          widgetId: action.id,
          bootstrapped: false,
        },
      };

    case DamActionTypes.CloseAndClearState:
      return {
        ...initialState,
      };

    case DamActionTypes.ClearWidgetId:
      return {
        ...state,
        setup: {
          widgetId: undefined,
          bootstrapped: false,
        },
      };

    case DamActionTypes.CleanStateData:
      return {
        ...initialState,
        setup: state.setup,
        ui: state.ui,
      };

    case DamActionTypes.CleanWorkspace:
      return {
        ...state,
        values: {},
        repository: emptyRepository,
        workspace: emptyWorkspace,
      };

    case DamActionTypes.BootstrapWidget:
      return {
        ...state,
        setup: {
          ...state.setup,
          bootstrapped: true,
        },
      };

    case DamActionTypes.LoadPayloadData:
      return {
        ...state,
        payload: {
          data: action.payload,
          timestamp: new Date(),
        },
      };

    case DamActionTypes.OpenEditor:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          active: {
            display: {
              ...action.payload.display,
            },
            editor: action.payload.editor,
          },
          initial: {
            ...action.payload.initial,
          },
          current: {
            ...action.payload.initial,
          },
          changeTime: new Date(),
          flags: {
            changed: false,
            valid: true,
          },
        },
      };

    case DamActionTypes.EditorChange:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          current: {
            ...action.payload.data,
          },
          changeTime: action.payload.date,
          flags: {
            changed: true,
            valid: action.payload.valid,
          },
        },
      };

    case DamActionTypes.EditorReset:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          changeTime: new Date(),
          current: {
            ...state.workspace.initial,
          },
          flags: {
            ...state.workspace.flags,
            changed: false,
            valid: true,
          },
        },
      };

    case DamActionTypes.EditorSaveSuccess:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          current: {
            ...(action.current ? action.current : state.workspace.current),
          },
          initial: {
            ...(action.current ? action.current : state.workspace.current),
          },
          flags: {
            ...state.workspace.flags,
            changed: false,
          },
        },
      };

    case DamActionTypes.EditorUpdate:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          changeTime: action.payload.updateDate ? new Date() : state.workspace.changeTime,
          current: {
            ...(action.payload.value ? action.payload.value : state.workspace.current),
          },
          initial: {
            ...(action.payload.value ? action.payload.value : state.workspace.current),
          },
        },
      };

    case DamActionTypes.UpdateActiveResource:
      return {
        ...state,
        workspace: {
          ...state.workspace,
          active: {
            ...state.workspace.active,
            display: {
              ...action.payload,
            },
          },
        },
      };

    case DamActionTypes.SetValue:
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };

    case DamActionTypes.LoadResourcesInRepository:
      const loaded: ICollections = {};
      action.payload.collections.forEach((value) => {
        loaded[value.key] = repositoryAdapter.setAll(value.values, repositoryAdapter.getInitialState());
      });

      return {
        ...state,
        repository: {
          collections: {
            ...state.repository.collections,
            ...loaded,
          },
        },
      };

    case DamActionTypes.InsertResourcesInRepository:
      const inserted: ICollections = {};
      action.payload.collections.forEach((value) => {
        inserted[value.key] = repositoryAdapter.upsertMany(
          value.values,
          current[value.key] ? current[value.key] : repositoryAdapter.getInitialState(),
        );
      });

      return {
        ...state,
        repository: {
          collections: {
            ...state.repository.collections,
            ...inserted,
          },
        },
      };

    case DamActionTypes.InsertResourcesInCollection:
      const insertedSingle: EntityState<IDamResource> = repositoryAdapter.upsertMany(
        action.payload.values,
        current[action.payload.key] ? current[action.payload.key] : repositoryAdapter.getInitialState());


      return {
        ...state,
        repository: {
          collections: {
            ...state.repository.collections,
            [action.payload.key]: insertedSingle,
          },
        },
      };


    case DamActionTypes.DeleteResourcesFromRepository:
      const deleted: ICollections = {};
      action.payload.collections.forEach((value) => {
        deleted[value.key] = repositoryAdapter.removeMany(value.values, current[value.key]);
      });

      return {
        ...state,
        repository: {
          collections: {
            ...state.repository.collections,
            ...deleted,
          },
        },
      };

    case DamActionTypes.DeleteResourcesFromCollection:
      const deletedCollection: EntityState<IDamResource> = repositoryAdapter.removeMany(
        action.payload.values,
        current[action.payload.key],
      );

      return {
        ...state,
        repository: {
          collections: {
            ...state.repository.collections,
            [action.payload.key]: deletedCollection,
          },
        },
      };

    case DamActionTypes.LoadForRouteSuccess:
      const repository: ICollections = state.repository.collections;
      repository[action.payload.collection] = repositoryAdapter.upsertOne(
        action.payload.resource,
        repository[action.payload.collection] || repositoryAdapter.getInitialState(),
      );
      return {
        ...state,
        repository: {
          collections: repository,
        },
      };

    case DamActionTypes.ClearRepository:
      return {
        ...state,
        repository: {
          collections: {},
        },
      };

    case DamActionTypes.CollapseSideBar:
      return {
        ...state,
        ui: {
          ...state.ui,
          sideBarCollapsed: true,
        },
      };

    case DamActionTypes.ToggleFullScreen:
      return {
        ...state,
        ...state,
        ui: {
          ...state.ui,
          fullscreen: !state.ui.fullscreen,
        },
      };

    case DamActionTypes.ExpandSideBar:
      return {
        ...state,
        ui: {
          ...state.ui,
          sideBarCollapsed: false,
        },
      };
    default:
      return state;
  }
}
