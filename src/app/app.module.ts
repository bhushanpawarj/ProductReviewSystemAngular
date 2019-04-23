import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { MaterialModule } from "./material/material.module";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { ProductListComponent } from "./product-list/product-list.component";

import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AddProductComponent } from "./add-product/add-product.component";

import { ReactiveFormsModule } from "@angular/forms";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

export const firebaseConfig = {
  apiKey: "AIzaSyDJxzSvzWHJCywVbHWnxl20JcSa2iiM_qw",
  authDomain: "angularfirebaseauthproject.firebaseapp.com",
  databaseURL: "https://angularfirebaseauthproject.firebaseio.com",
  projectId: "angularfirebaseauthproject",
  storageBucket: "angularfirebaseauthproject.appspot.com",
  messagingSenderId: "142997162845"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProductListComponent,
    AddProductComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
