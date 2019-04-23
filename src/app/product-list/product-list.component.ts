import { Product } from "./../Models/product";
import { Component, OnInit } from "@angular/core";
import "rxjs/add/operator/map";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from "@angular/fire/firestore";

import { Observable } from "rxjs";
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Product>;
  //items: Observable<Product[]>;
  products: Product[];

  constructor(private afs: AngularFirestore) {
    /*  this.afs.collection('Products').valueChanges().subscribe((products)=>{
      this.products=products;
      
    })*/
    this.itemsCollection = this.afs.collection<Product>("Products");
    this.itemsCollection
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => ({
          ProductId: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      })
      .subscribe(products => {
        this.products = products;
      });
  }
  getProducts() {
    return this.products;
  }
  getAverageRating() {}

  ngOnInit() {}
}
