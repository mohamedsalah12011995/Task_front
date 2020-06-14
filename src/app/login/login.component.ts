import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FullScreenService } from '../Sheard/fullscreen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string='/home';

  login = {
    userName:'',
    password:'',
  }
  constructor(private router: Router , private fullScrean : FullScreenService) {

   }

  ngOnInit(): void {
    //this.fullScrean.openFullscreen();

  }

  submitLogin(){
    if (this.login.userName=='' || this.login.password ==''){
      this.submitted = true;
      return;
    }
    else {
      this.fullScrean.openFullscreen();
      this.router.navigate([this.returnUrl]);

    }
  }
}
