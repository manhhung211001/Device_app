import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collectionData, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private fs:Firestore) {}

  getDatas(keyCollection: string){
      let notesCollection = collection(this.fs,keyCollection)
      return collectionData(notesCollection,{idField:'id'});
  }

  addData(data:any, keyCollection: string){
    let notesCollection = collection(this.fs,keyCollection)
    return addDoc(notesCollection,data);
}

deleteData(id:string, keyCollection: string){
    let docRef = doc(this.fs,keyCollection + '/' +id);
    return deleteDoc(docRef);

}

updateData(data:any,keyCollection: string){
    let docRef = doc(this.fs,keyCollection + '/' +data.id);
    return updateDoc(docRef,data);
  
}

getDataById(id:string, keyCollection: string){
    let docRef = doc(this.fs,keyCollection + '/' +id);
    return getDoc(docRef);   
}

 
}
