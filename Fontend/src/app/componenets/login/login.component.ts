import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SpaceValidator} from "../../model/space-validator";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/security/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
 // @ts-ignore
  checkoutParentGroup: FormGroup;
  ngOnInit(): void {
    this.myFormLogin()
  }


  constructor(private formChildGroup: FormBuilder,private router: Router, private auth :AuthenticationService) {
  }

  myFormLogin(){
    this.checkoutParentGroup = this.formChildGroup.group({
      user:this.formChildGroup.group({
        email: new FormControl('',[
          Validators.required,
          SpaceValidator.onlyContainSpace,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        ]),
        password: new FormControl('',[
          Validators.required
        ])
      })
    })
  }

  login() {
    this.auth.executeAuthentication(this.checkoutParentGroup.controls['user'].value.email
      ,this.checkoutParentGroup.controls['user'].value.password).subscribe(
      {
        next: response=>{
          this.router.navigateByUrl("/orders")

        },
        error:err =>{
          alert("invalid email or password")

        }
      }
    )


   // alert(this.checkoutParentGroup.controls['user'].value.email)
   // alert(this.checkoutParentGroup.controls['user'].value.password)

  }
  //validation
  get email(){
    return this.checkoutParentGroup.get('user.email')
  }
  get password(){
    return this.checkoutParentGroup.get('user.password')
  }
}
