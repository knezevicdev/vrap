import { buildUrl} from "./dealValidator";


describe('Deal Validator', ()=> {

    it('Build Checkout URL ', () => {
        const url = buildUrl('JTDKARFU6K3085481', 'registration');

        expect(url).toBe("/checkout/JTDKARFU6K3085481/registration")

    });

});