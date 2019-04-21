import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  error: any;

  constructor(public af: AngularFireAuth, private router: Router) {}
  logout() {
    this.af.auth.signOut().then(
      (success) => {
        this.router.navigateByUrl('/home')
      }
    ).catch(
      (error) => {
        this.error = error;
      }
    );
  }
  ngOnInit() {}
}
