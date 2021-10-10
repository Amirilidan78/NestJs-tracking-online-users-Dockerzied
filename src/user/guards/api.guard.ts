import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class ApiGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>
  {
    try {
      const request = context.switchToHttp().getRequest()

      return request.headers['api-token'] === process.env.USER_API_TOKEN  ;
    }
    catch ( err )
    {
      return false ;
    }
  }

}