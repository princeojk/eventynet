import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    if (!request.headers.authorization) {
      return false;
    }

    const [bearer, token] = request.headers.authorization.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return false;
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      request['userUid'] = decodedToken.uid;
      return true;
    } catch (error) {
      const err = error as { code?: string };
      console.error('AuthGuard: Token verification failed:', err);
      switch (err.code) {
        case 'auth/id-token-expired':
          console.error('AuthGuard: Token has expired.');
          break;
        case 'auth/invalid-id-token':
          console.error('AuthGuard: Invalid ID token provided.');
          break;
        default:
          console.error('AuthGuard: Error verifying token:', err);
      }

      return false;
    }
  }
}
