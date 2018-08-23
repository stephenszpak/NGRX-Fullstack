import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../../app.interfaces";
import * as fromTasks from "./tasks";

export interface TasksState {
  tasks: fromTasks.State;
}

export interface State extends AppState {
  tasks: TasksState;
}

export const reducers = {
  tasks: fromTasks.reducer
};

export const getTasksState = createFeatureSelector<TasksState>("tasks");

export const getTasksEntityState = createSelector(
  getTasksState,
  state => state.tasks
);

export const {
  selectAll: getAllTasks,
  selectEntities: getTaskEntities,
  selectIds: getTaskIds,
  selectTotal: getTasksTotal
} = fromTasks.adapter.getSelectors(getTasksEntityState);

export const getSelectedTaskId = createSelector(
  getTasksEntityState,
  fromTasks.getSelectedTaskId
);

export const getSelectedTask = createSelector(
  getTaskEntities,
  getSelectedTaskId,
  (entities, selectedTaskId) => selectedTaskId && entities[selectedTaskId]
);
