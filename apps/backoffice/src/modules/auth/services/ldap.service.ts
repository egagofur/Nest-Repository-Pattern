import { AuthSchemaEnum } from 'apps/backoffice/src/common/enums/auth.enum';
import { config } from 'apps/backoffice/src/config';
import ldap from 'ldapjs';

export class LdapService {
    constructor(private readonly client: any) {
        this.client =
            config.auth.schema == AuthSchemaEnum.Ldap &&
            ldap.createClient({
                url: config.auth.ldap.url,
            });
    }

    async validate(username: string, password: string): Promise<boolean> {
        this.client.bind(username, password, function (err: any) {
            if (!err) {
                return true;
            }
        });
        return false;
    }
}
