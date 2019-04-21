import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { routerNgProbeToken } from "@angular/router/src/router_module";
import { Product } from "../Models/product";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  selectedProduct: Product;
  private itemDoc: AngularFirestoreDocument<Product>;

  constructor(private route: ActivatedRoute, private afs: AngularFirestore) {}

  /*
  this.afs
        .collection("Products", ref =>
          ref.where("uid", "==", "tXMFim0YcGpZX2mjgSkT")
        )
        .valueChanges()
        .subscribe(queriedItems => {
          console.log(queriedItems);
        });
  */
  ProductId: string;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ProductId = params["ProductId"];
      this.itemDoc = this.afs.doc<Product>("Products/" + this.ProductId);
      this.itemDoc.valueChanges().subscribe(pro => {
        this.selectedProduct = pro;
      });
    });
  }
}
