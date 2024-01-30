/**
 * ===================
 * PARAMETER INTERFACE
 * ===================
 */

export interface IRequest {
    url?: string;
    originalUrl?: string;
    method?: string;
    query?: string;
    route?: {
        path?: string;
    };
}
