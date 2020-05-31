import { Injectable } from '@angular/core';
import{
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import {Post} from './post';
import { map } from "rxjs/operators";
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class PostService {
  postsCollection: AngularFirestoreCollection<Post>
  constructor(private afs: AngularFirestore) {
    this.postsCollection = this.afs.collection('Posts', ref => ref.orderBy('publishd','desc'));
   }

   getPosts() {
     return this.postsCollection.snapshotChanges().map(actions => {
       return actions.map(a => {
         const data = a.payload.doc.data() as Post
         const id = a.payload.doc.id
         return {id,...data}
       })
     })
   }
}
