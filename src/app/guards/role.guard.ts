
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private userStore: UserStoreService,
    private toastr: ToastrService
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.userStore.getRoleFromStore().pipe(
      map((roleFromStore) => {
        const roleFromToken = this.auth.getRoleFromToken();
        const role = roleFromStore || roleFromToken;

        if (role === 'admin') {
          return true;
        } else {
          this.toastr.error("You do not have permission to view this page");
          return false;
        }
      })
    );
  }
}












// import { Injectable } from '@angular/core';
// import { CanActivate } from '@angular/router';

// import { AuthService } from 'src/app/services/auth.service';
// import { UserStoreService } from 'src/app/services/user-store.service';


// @Injectable({
//   providedIn:'root'
// })



// export class RoleGuard implements CanActivate{

//   role: any
//   constructor(
//     public auth: AuthService,
//     private userStore: UserStoreService,
//     ){}

//   canActivate(){
//     this.userStore.getRoleFromStore().subscribe((val) => {
//       const roleFromToken = this.auth.getRoleFromToken();
//       this.role = val || roleFromToken;
//     });
  
//    if(this.role == "admin"){
//     return true;
//    }else{
//     this.toast.error({detail:"ERROR", summary:"You dont't have admin rights"});
//     //alert ("You dont't have admin rights")
//     return false;
 
//    }
 
//   }
 
// };
