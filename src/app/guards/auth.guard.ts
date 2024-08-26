
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService // Inject ToastrService
  ) { }

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.toastr.error("Please Login First!"); // Show error message using ToastrService
      this.router.navigate(['login']);
      return false;
    }
  }

}






// import { Injectable } from '@angular/core';
// import { CanActivate, Router} from '@angular/router';

// import { AuthService } from 'src/app/services/auth.service';

// @Injectable({
//   providedIn:'root'
// })

// export class AuthGuard implements CanActivate{

//   constructor(private auth : AuthService, private router: Router, 
//   ){

//   }

//   canActivate():boolean{
//     if(this.auth.isLoggedIn()){
//       return true
//     }else{
//        alert("Please Login First!")
//       this.toastr.error({detail:"ERROR", summary:"Please Login First!"});
//       this.router.navigate(['login'])
//       return false
//     }

//   }
  
// };
