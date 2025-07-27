import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}
  getUser(): string {
    return 'abdul malek sarkar';
  }
}
