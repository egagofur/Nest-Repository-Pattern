import { Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
    Strategy,
    Client,
    UserinfoResponse,
    TokenSet,
    Issuer,
} from 'openid-client';
import { config } from 'apps/backoffice/src/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/iam/user.entity';
import { Repository } from 'typeorm';
import { ROLE_ADMIN, Role } from 'entities/iam/role.entity';
export const buildOpenIdClient = async () => {
    const TrustIssuer = await Issuer.discover(
        `${config.auth.sso.oidc.wellKnownConfigurationUrl}`,
    );
    const client = new TrustIssuer.Client({
        client_id: config.auth.sso.oidc.clientId,
        client_secret: config.auth.sso.oidc.clientSecret,
    });
    return client;
};

export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
    client: Client;
    logger = new Logger(OidcStrategy.name);

    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        client: Client,
    ) {
        super({
            client,
            params: {
                redirect_uri: config.auth.sso.oidc.redirectUri,
                scope: config.auth.sso.oidc.scopes,
            },
            passReqToCallback: false,
            usePKCE: false,
        });

        this.client = client;
    }

    async validate(tokenset: TokenSet): Promise<any> {
        const userInfo: UserinfoResponse = await this.client.userinfo(tokenset);

        try {
            const isUserExists = await this.userRepository.findOneBy({
                email: userInfo.email,
            });

            if (isUserExists) {
                return isUserExists;
            }

            const newUser = this.userRepository.create({
                email: userInfo.email,
                fullname: userInfo.given_name,
                password: '',
                identityNumber: userInfo.sub,
                phoneNumber: userInfo.phone_number || '',
            });

            newUser.roles = await this.roleRepository.findBy({
                key: ROLE_ADMIN,
            });

            await this.userRepository.save(newUser);
        } catch (err) {
            this.logger.error('[Error Strategy]', err);
            throw new UnauthorizedException();
        }
    }
}
