import { Injectable } from '@angular/core';
import { getCurrentUser } from 'aws-amplify/auth';
import { BehaviorSubject } from 'rxjs';


export interface AuthState {
  isLoggedIn: boolean; // Note: Value is the user's email
  userId?: string;
  userName?: string;
  loginId?: string;
  firstName?: string;
  lastName?: string;
  //cognitoUserSession: CognitoUserSession; // Note: Look into if I need this
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user: BehaviorSubject<AuthState> = new BehaviorSubject(null);

  constructor() {
    // AWS Cognito synchronization
    const checkCurrentUser = async () => {
      try {
        const userData = await getCurrentUser();
        // Confirm all data exist on User Object.
        if (userData.signInDetails.loginId && userData.userId && userData.username) {
          this.setUser({
            isLoggedIn: true,
            userId: userData.userId,
            userName: userData.username,
            loginId: userData.signInDetails.loginId // Assuming loginId is the email
          });
        }
      } catch (error) {
        console.log('Error getting current authenticated user:', error);
        if (this.user.value && this.user.value.isLoggedIn) {
          alert("Error Authenticating User. Loggin User Out.")
          this.setUser({
            isLoggedIn: false,
            userId: null,
            userName: null,
            loginId: null
          });
        }
      }
    };

    checkCurrentUser();
  }

  private setUser(user: AuthState) {
    const updatedUser: AuthState = {
      isLoggedIn: user.isLoggedIn,
      userId: user.userId,
      userName: user.userName,
      loginId: user.loginId
      // email: user.attributes.email,
      // firstName: user.attributes.given_name,
      // lastName: user.attributes.family_name
    };

    this.user.next(updatedUser);
  }

  public isUserLoggedIn(): boolean {
    return (this.user.value && this.user.value.isLoggedIn)
  }

  public getUserEmail(): string {
    return this.user.value.loginId;
  }
}
