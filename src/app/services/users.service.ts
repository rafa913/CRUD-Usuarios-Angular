import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: User = {
  name:'Rafael Batista',
  email:'rafael@mail.com',
  sector:'Tecnologia',
  role:'Desenvolvedor Front-End Sênior'

  }

  constructor(private dataBaseStore: AngularFirestore) { }

  getAllUsers(){
    return this.dataBaseStore.collection('users', user => user.orderBy('name')).valueChanges({idField: 'firebaseId'}) as Observable<any[]>
  }

  addUser(user: User) {

    return this.dataBaseStore.collection('users').add(user)
  }

  upDate(userId: string, user:User){
    return this.dataBaseStore.collection('users').doc(userId).update(user)
  }

  deleteUser(userId: string){
   
  return this.dataBaseStore.collection('users').doc(userId).delete();
  }

}
