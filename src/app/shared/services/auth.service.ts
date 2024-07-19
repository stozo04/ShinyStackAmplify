import { Injectable } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import config from '../../../amplifyconfiguration.json';
import { Amplify } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private authenticator: AuthenticatorService) {
    Amplify.configure(config);
  };

  public isUserAuthenticated(): boolean {
    return !!this.authenticator.user
  }

  public getUserName(): string {
    return this.authenticator.user.username
  }
}
