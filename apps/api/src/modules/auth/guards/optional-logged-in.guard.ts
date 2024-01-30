import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalLoggedInGuard extends AuthGuard('jwt') {
    handleRequest(err, user) {
        if (!user) {
            return true;
        } else if (err) {
            throw err;
        }

        return user;
    }
}
