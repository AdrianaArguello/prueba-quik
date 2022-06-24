import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private angularFirestore: AngularFirestore) { }

  addPerson(person: Person): Promise<any> {
    return this.angularFirestore.collection('person').add(person);
  }

  getPerson(): Observable<any>{
    return this.angularFirestore.collection('person').snapshotChanges();
  }

  deletePerson(id: string): Promise<any>{
    return this.angularFirestore.collection('person').doc(id).delete();
  }

  updatePerson(id: string, data:any): Promise<any>{
    return this.angularFirestore.collection('person').doc(id).update(data);
  }
}
