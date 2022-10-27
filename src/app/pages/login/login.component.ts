import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.generateForm();
  }
  public onLogin() {
    this.authService.loginUser(this.loginForm.value).subscribe(
      (data) => {
        this.router.navigateByUrl('/home');
      },
      (err) => {
        this.openSnackBar(
          'El correo eléctronico o el password son incorrectos',
          'Aceptar'
        );
        console.log(err.error.error_description);
      }
    );
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1.2 * 1000,
    });
  }

  private generateForm(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
