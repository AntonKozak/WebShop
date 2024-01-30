import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:[ './register.component.scss']
})
export class RegisterComponent implements OnInit{
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] = [];

  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit(): void {
    this.intitializeForm();
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['',  Validators.email],
      city: [''],
      country: [''],
      password: ['', [Validators.required,
        Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.get(matchTo)?.value ? null : { isMatching: true }
  }
}
  register() {
    this.accountService.register(this.registerForm.value).subscribe( {
      next: () => {
      this.router.navigateByUrl('/users');
    },
    error: error => {
      this.validationErrors = error;
    }
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
