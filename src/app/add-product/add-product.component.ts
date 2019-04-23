import {
  AngularFireStorageModule,
  AngularFireStorage
} from "@angular/fire/storage";
import { Product } from "./../Models/product";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import * as firebase from "firebase";
import { Observable } from "rxjs";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  product: Product;
  profileUrl: Observable<string | null>;

  //contactType = ContactType;
  @ViewChild("fform") productFormDirective;

  constructor(
    private fb: FormBuilder,
    private fireStorage: AngularFireStorage,
    private afs: AngularFirestore,
    private router: Router,
    private location: Location
  ) {
    this.createForm();
  }
  private basePath: string = "/uploads";

  formErrors = {
    ProductName: "",
    Description: "",
    Price: "",
    DetailDescription: ""
  };

  validationMessages = {
    ProductName: {
      required: "Product Name is required."
    },
    Description: {
      required: "Description   is required."
    },
    Price: {
      required: "Price   is required."
    },
    DetailDescription: {
      required: "Detailed Description  is required.",
      minlength: "Detailed Description  must be at least 2 characters long.",
      maxlength: "Detailed Description  cannot be more than 25 characters long."
    }
  };
  private itemDoc: AngularFirestoreCollection<Product>;
  item: Product;

  createForm(): any {
    this.productForm = this.fb.group({
      ProductName: [
        "",
        [Validators.required, Validators.minLength(2), Validators.maxLength(25)]
      ],
      DetailDescription: [
        "",
        [Validators.required, Validators.minLength(2), Validators.maxLength(25)]
      ],
      Price: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      ProductURL: null
    });
    this.productForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.productForm) {
      return;
    }
    const form = this.productForm;
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
  onSubmit() {
    this.product = this.productForm.value;
    console.log(this.product);
    this.uploadImage();
    console.log("Upload image function completed");
    this.addProduct(this.product);

    this.productForm = this.fb.group({
      ProductName: [
        "",
        [Validators.required, Validators.minLength(2), Validators.maxLength(25)]
      ],
      DetailDescription: [
        "",
        [Validators.required, Validators.minLength(2), Validators.maxLength(25)]
      ],
      Price: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      ProductURL: null
    });
    this.productFormDirective.resetForm();
  }
  fileUpoad(event) {
    let image = event.target.files[0];
    const ref = this.fireStorage.ref("/uploads/" + image.name);
    let uploadTask = ref.put(image).then(
      snapshot => {
        console.log("snapshot = " + snapshot);
        snapshot.ref.getDownloadURL().then(
          url => {
            this.productForm.value["ProductURL"] = url;
            console.log("url is : " + url);
          },

          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  }
  uploadImage() {
    //this.afs.list(`${this.basePath}/`).push(imgToUpload);
    //this.fireStorage.upload("/uploads/", imgToUpload);
  }
  addProduct(item: Product) {
    this.itemDoc = this.afs.collection<Product>("Products");
    this.itemDoc.add(item);
    this.router.navigateByUrl("/productlist");
  }
  goBack() {
    this.location.back();
  }
  ngOnInit() {
    this.product = this.productForm.value;
  }
}
