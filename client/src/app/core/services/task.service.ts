import { HttpClient } from "@angular/common/http";
import { Http, Headers } from '@angular/http';
import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Task } from "../models/task.model";
import { BaseService } from "./base.service";

@Injectable({ providedIn: 'root' })
export class TaskService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.BASE_URL}/api/tasks`, task);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete(`${this.BASE_URL}/api/tasks/${task.id}`)
      .pipe(
        switchMap(() => of(task))
      );
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.BASE_URL}/api/tasks/${id}`);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.BASE_URL}/api/tasks`);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.BASE_URL}/api/tasks/${task.id}`, task);
  }

}
