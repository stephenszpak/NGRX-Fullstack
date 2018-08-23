import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Observable,Subscription } from "rxjs";
import { filter, map, switchMap, withLatestFrom } from "rxjs/operators";
import {  } from 'rxjs';

import { Task } from "../../../core/models/task.model";
import { TaskService } from "../../../core/services/task.service";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"]
})
export class TaskComponent implements OnInit {
  actionsSubscription: Subscription;

  task: Observable<Task>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tasksService: TaskService
  ) {}

  ngOnInit() {
    this.task = this.activatedRoute.paramMap.pipe(
      switchMap(params => this.tasksService.getTask(String(params.get("id"))))
    );
  }
}
