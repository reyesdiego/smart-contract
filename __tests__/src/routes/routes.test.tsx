import routes from '../../../src/routes/routes';

describe('route_paths', () => {
    it('should contain WALLET path', () => {
        expect(routes.WALLET).toBe('/');
    });

    it('should contain TRANSFER path', () => {
        expect(routes.TRANSFER).toBe('/transfer');
    });

    it('should contain TRANSFER_SUCCESS path', () => {
        expect(routes.TRANSFER_SUCCESS).toBe('/transfer-success/:transaction/:funds');
    });

    it('should contain TRANSFER_FAILURE path', () => {
        expect(routes.TRANSFER_FAILURE).toBe('/transfer-failure');
    });

    it('should generate TRANSFER_SUCCESS url correctly', () => {
        const transactionId = '0xabc123';
        const funds = '100';
        const url = routes.TRANSFER_SUCCESS
            .replace(':transaction', transactionId)
            .replace(':funds', funds);

        expect(url).toBe(`/transfer-success/${transactionId}/${funds}`);
    });
});
