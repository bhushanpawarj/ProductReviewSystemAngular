import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "../Models/product";

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Comment } from "../Models/comment";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  selectedProduct: Product;
  selectedProductComments: Comment[];

  private itemCollection: AngularFirestoreCollection<Comment>;
  private itemDoc: AngularFirestoreDocument<Product>;
  commentForm: FormGroup;
  comment: Comment;
  CurrentUserName: string;
  currentUserId: string;
  @ViewChild("cform") commentFormDirective;
  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private fb: FormBuilder,
    public af: AngularFireAuth
  ) {
    this.createForm();
  }

  formErrors = {
    Comment: "",
    Rating: ""
  };

  validationMessages = {
    Comment: {
      required: "Comment  is required."
    },
    Rating: {
      required: "Rating  is required."
    }
  };

  createForm(): any {
    this.commentForm = this.fb.group({
      Comment: ["", [Validators.required]],
      Rating: ["", [Validators.required]],
      ProductId: [""]
    });
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + " ";
            }
          }
        }
      }
    }
  }

  ProductIdReceived: string;
  ngOnInit() {
    this.CurrentUserName = this.af.auth.currentUser.displayName;
    this.currentUserId = this.af.auth.currentUser.uid;
    this.route.params.subscribe(params => {
      this.ProductIdReceived = params["ProductId"];
      this.itemDoc = this.afs.doc<Product>(
        "Products/" + this.ProductIdReceived
      );
      this.itemDoc.valueChanges().subscribe(pro => {
        this.selectedProduct = pro;
      });
    });
    /* 
    this.afs
      .collection("Comments", ref =>
        ref.where("ProductId", "==", this.ProductIdReceived)
      )
      .valueChanges()
      .subscribe(comments => {
        this.selectedProductComments = comments;
        console.log("Logging all the comments data");
      });
*/
    this.afs
      .collection("Comments", ref =>
        ref.where("ProductId", "==", this.ProductIdReceived)
      )
      .get()
      .subscribe(
        querySnapshot => {
          this.selectedProductComments = [];
          querySnapshot.docs.forEach(doc => {
            var temp = doc.data();
            temp["$key"] = doc.id;
            this.selectedProductComments.push(temp);
            console.log(temp);
          });
        },
        error => console.log("error : " + error)
      );
  }
  sameUser(commentUserId) {
    return commentUserId == this.currentUserId;
  }
  deleteComment(comment) {
    this.afs
      .collection("Comments")
      .doc(comment)
      .delete()
      .then(
        success => console.log("Deleted Successfully"),
        error => console.log("Not able to delete the doc")
      );
  }
  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.ProductId = this.ProductIdReceived;
    this.comment.Author = this.CurrentUserName;
    this.comment.UserId = this.currentUserId;
    this.addComment(this.comment);

    this.commentForm = this.fb.group({
      ProductId: [""],
      Comment: ["", [Validators.required]],
      Rating: ["", [Validators.required]]
    });
    this.commentFormDirective.resetForm();
  }

  addComment(item: Comment) {
    this.itemCollection = this.afs.collection<Comment>("Comments");
    this.itemCollection.add(item);
  }
}
