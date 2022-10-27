import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { AuthResponse, Login } from '@interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public logged = new EventEmitter<boolean>();
  constructor(
    private http: HttpClient,
    private readonly router: Router
  ) {}

  public logOut(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  public isLogged() {
    
    if(localStorage.getItem('session')!){
      const { access_token } = JSON.parse(localStorage.getItem('session')!);
      return access_token ? true : false;
    }

    return false;
    
  }

  public loginUser(login: Login): Observable<boolean> {
    let params = new HttpParams({
      fromObject: {
        username: login.username,
        password: login.password,
        client_id: 'legacy',
        grant_type: 'password',
        client_secret: 'd0008af3-fd38-42f9-8682-ba10bfa82e33',
      },
    });

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    return this.http
      .post<AuthResponse>(
        `${environment.KEYLOAK_URL}`,
        params.toString(),
        httpOptions
      )
      .pipe(
        map((res) => {
          localStorage.setItem('session', JSON.stringify(res));
          return true;
        })
      );
  }
}
