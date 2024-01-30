import { Route } from '../../../app/Common/Route/Route';
import dotenv from 'dotenv';
import request from 'supertest';

dotenv.config();

describe(__filename, () => {
    it('Matching all routers frontend to backend', async () => {
        const response = await request(process.env.HOST_BACKOFFICE).get(
            '/informations/get-all-routers',
        );

        const routersFrontend = Object.values(Route);
        const routersBackend = response.body as string[];

        const missingRoute = !!routersFrontend.find(
            (router) => !routersBackend.includes(router),
        );

        expect(missingRoute).toEqual(false);
    });
});
