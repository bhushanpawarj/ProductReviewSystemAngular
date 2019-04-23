import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "ProductReviewSystem";
  onButtonClick() {
    this.title = "Hello from Kendo UI!";
  }
  public items: any[] = [
    { title: "Flower", url: "https://bit.ly/2cJjYuB" },
    { title: "Mountain", url: "https://bit.ly/2cTBNaL" },
    { title: "Sky", url: "https://bit.ly/2cJl3Cx" }
  ];
  public width = "100%";
  public height = "500px";
}
