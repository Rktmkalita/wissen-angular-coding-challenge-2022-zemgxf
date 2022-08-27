/**
 * Modify this file to fetch and display the login details
 */
import { Component, HostListener, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { GetAllUserService } from "../services/getalluser.service";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
  // user; // type this variable using user.type.ts file
  isEmpty = true;
  listUserDetails: any;
  userdata: any;
  username: string;
  
  constructor(private getalluserservice: GetAllUserService, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.username = this.authenticationService.loginUserName();
    this.getalluserservice.listUserDetails().subscribe((data) => {
      this.listUserDetails = data;
      this.userdata = this.listUserDetails.data;
      console.log(this.listUserDetails);
      if (
        this.listUserDetails != undefined ||
        this.listUserDetails != null
      ) {
        this.isEmpty = false;
      }
    });
  }
  ngOnDestroy() {}
}
