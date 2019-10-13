import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { AccountServiceService } from 'src/app/Services/account-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;  
  successmsg: any;  
  errmsg: any;  
  constructor(private Userservice :AccountServiceService,private router:Router) { }  
  ngOnInit() {  
    this.form = new FormGroup({  
      username: new FormControl('', [Validators.required]),   
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),  
      grant_type: new FormControl('password'),  
     });  
    }  
  
  
onSubmit()  
  {     
      this.Userservice.postData(this.form.value).subscribe(res => {    
                       if (res.status === 200) { 
                        this.errmsg = '';
                        this.successmsg = 'token - ' + res.body.access_token;
                                              
                        localStorage.setItem('access_token', res.body.access_token);
                        console.log(localStorage.getItem('access_token'))  ;
                        localStorage.setItem('UserName', (this.form.get('username').value).toString());
                        localStorage.setItem('Role', res.body.Role);
                        console.log(localStorage.getItem('UserName'));
                        console.log(localStorage.getItem('Role'));
                        this.router.navigate(['/Admin']);
                        } else {  
                          this.successmsg = '';
                          this.errmsg = res.status + ' - ' + res.statusText;  
                          }  
                         },  
                       err => {                                 
                        if (err.status === 401  ) {  
                          this.successmsg = '';
                          this.errmsg = 'Invalid username or password.';  
                           }   
                          else if (err.status === 400  ) { 
                            this.successmsg = ''; 
                           this.errmsg = 'Invalid username or password.';  
                          }   
                          else {  
                            this.successmsg = '';
                          this.errmsg ="Invalid username or password";  
                           }  
                        });  
        }   

}
