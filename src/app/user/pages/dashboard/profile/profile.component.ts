import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectService } from 'src/app/user/services/connect/connect.service';
import { NoteService } from 'src/app/user/services/note/note.service';
import { ProfileService } from 'src/app/user/services/profile/profile.service';
import { UserService } from 'src/app/user/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  location = window.location.href;
  app : { name : string } = environment.app;
  constructor(private connectService : ConnectService, private route: ActivatedRoute, private userService: UserService, private router: Router, private noteService: NoteService, private profileService: ProfileService, private titleService: Title, private meta : Meta) { 
    
    this.meta.updateTag({ name: 'description', content: `Visit user account.` });
    this.meta.updateTag({ property: "og:url", content: `${this.location}` });
 
  }
  userData;
  publicChat;
  username;
  owneruser;
  ownerusername ;
  error;

  searchForm = new UntypedFormGroup({
    search: new UntypedFormControl('', [Validators.required]),
  });

  ngOnInit(): void {
      this.connectService.userRefresh.subscribe(res => {
        if (res) {
        // console.log("res",res);
        this.owneruser = res;
        this.ownerusername = this.owneruser.username;
      }
    }, err => {
      if (err) {
        // console.log("err", err);
      }
    });
    this.route.params.subscribe(routeParams => {
      this.error = undefined;
      this.publicChat = undefined;
      this.userData = undefined;
      // console.log(routeParams.username);
      this.titleService.setTitle(`${routeParams.username} | ${this.app.name}`);
      this.profileService.readProfile(routeParams.username).subscribe(res => {
        
        if (res) {
          // console.log("res",res);
          this.userData = res.data;
          this.username = this.userData.username;
        }
      }, err => {
        if (err) {
          // console.log("err", err);
          // this.router.navigate(["/error/page-not-found"]);
        }
      });
      this.noteService.readPublicNote(routeParams.username).subscribe(res => {
        if (res) {
          // console.log("res", res);
          this.publicChat = res.data;
        }
      }, err => {
        if (err) {
          // console.log("err", err);
          this.error = err;
          // this.router.navigate(["/error/page-not-found"]);
        }
      });
    });
  }

  searchUser(){
    if(this.searchForm.valid){
    // console.log(this.searchForm.value);
     this.router.navigate(["/"+ this.searchForm.value.search]);
     this.searchForm.reset();
    }
  }
}
