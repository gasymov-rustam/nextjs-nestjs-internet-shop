import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer<T> extends PassportSerializer {
  serializeUser = (user: T, done: (err: Error, user: T) => void) => {
    done(null, user);
  };

  deserializeUser = (
    payload: any,
    done: (err: Error, payload: string) => void,
  ) => {
    done(null, payload);
  };
}
