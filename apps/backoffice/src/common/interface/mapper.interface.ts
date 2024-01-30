export interface IMapperResponse<I, R> {
    fromEntity(t: I): R;
}
