import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Task } from "../../../core/models/task.model";
import {
  ADD_TASK_DIALOG_CLOSE,
  ADD_TASK_DIALOG_OPEN,
  ADD_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  LOAD_TASK_SUCCESS,
  LOAD_TASKS,
  LOAD_TASKS_SUCCESS,
  TasksAction,
  SELECT_TASK,
  UPDATE_TASK_SUCCESS
} from "../actions/tasks";

export interface State extends EntityState<Task> {
  addDialogShow: boolean;
  selectedTaskId: string | null;
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (task: Task) => task.id,
  sortComparer: false,
});

const initialState: State = adapter.getInitialState({
  addDialogShow: false,
  selectedTaskId: null
});

export function reducer(state: State = initialState, action: TasksAction) {
  switch (action.type) {
    case ADD_TASK_DIALOG_CLOSE:
      return { ...state, addDialogShow: false };
    case ADD_TASK_DIALOG_OPEN:
      return { ...state, addDialogShow: true };
    case ADD_TASK_SUCCESS:
      return adapter.addOne(action.payload, state);
    case DELETE_TASK_SUCCESS:
      return adapter.removeOne(action.payload.id, state);
    case LOAD_TASK_SUCCESS:
      return adapter.addOne(action.payload, state);
    case LOAD_TASKS_SUCCESS:
      return adapter.addAll(action.payload, { ...state, selectedTaskId: state.selectedTaskId });
    case SELECT_TASK:
      return { ...state, selectedTaskId: action.payload._id };
    case UPDATE_TASK_SUCCESS:
      return adapter.updateOne(
        {
          id: action.payload.id,
          changes: action.payload
        },
        state
      );
    default:
      return state;
  }
}

export const getSelectedTaskId = (state: State) => state.selectedTaskId;
