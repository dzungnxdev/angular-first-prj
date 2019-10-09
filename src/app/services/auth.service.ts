import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  login(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
      err => reject(err));
    });
  }

  getAuth() {
    return this.afAuth.authState.pipe(auth => auth);
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

  register(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
      err => reject(err));
    });
  }

}
