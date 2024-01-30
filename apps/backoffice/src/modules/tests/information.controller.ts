import { Controller, Get, Request } from '@nestjs/common';
import { Request as RequestExpress, Router } from 'express';

// TODO: Cari cara get all router backend by test saja (file: information-routers.spec.ts)
@Controller('informations')
export class InformationController {
    @Get('get-all-routers')
    async getAllRouters(@Request() req: RequestExpress): Promise<string[]> {
        const router = req.app._router as Router;
        const routers = router.stack
            .map((layer) => {
                if (layer.route) return layer.route?.path;
            })
            .filter((item) => item !== undefined);

        return routers;
    }
}
