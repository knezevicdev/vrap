import { buildUrl} from "./dealValidator";

jest.mock('next/config', () => () => ({ publicRuntimeConfig: { BASE_PATH: "checkout" } }));

describe('Deal Validator', ()=> {

    it('Build Checkout URL ', () => {
        const url = buildUrl('JTDKARFU6K3085481', 'registration');

        expect(url).toBe("/checkout/JTDKARFU6K3085481/registration")

    });

});