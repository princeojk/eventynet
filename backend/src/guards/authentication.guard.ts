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
      console.error('Token has expired.', err);
      switch (err.code) {
        case 'auth/id-token-expired':
          console.error('Token has expired.');
          break;
        case 'auth/invalid-id-token':
          console.error('Invalid ID token provided.');
          break;
        default:
          console.error('Error verifying token:', err);
      }

      return false;
    }
  }
}
