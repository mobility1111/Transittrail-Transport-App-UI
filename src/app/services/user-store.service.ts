import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
private fullName$ = new BehaviorSubject<string>("");
private role$ = new BehaviorSubject<string>("");

  constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
    //console.log('getRolefromstore',this.role$)
  }

  public setRoleForStore(role:string){
    this.role$.next(role);
    console.log('RoleforStore',role)
  }

  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(fullname:string){
    this.fullName$.next(fullname)
    console.log('Fullnamefromstore', fullname)
  }
}
