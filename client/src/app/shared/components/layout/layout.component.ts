import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { AuthService } from '../../../core/services/auth.service';
import { ObservableMedia } from '@angular/flex-layout';

import { isSpinnerShowing } from "./../../../state/shared/reducers/index";
import { AppState } from "../../../state/app.interfaces";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
  loading: Observable<boolean>;
  currentUser: any;

  @ViewChild("sidenav") sidenav: MatSidenav;

  constructor(
    private store: Store<AppState>,
    private media: ObservableMedia,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loading = this.store.pipe(select(isSpinnerShowing));

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser)
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  logout() {
    this.authService.logout();
  }
}
