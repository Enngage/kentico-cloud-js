import { Elements } from '../../../lib';

describe('NumberElement', () => {

    it(`Checks number element for valid number`, () => {
        const element = new Elements.NumberElement({
            contentItemSystem: {} as any,
            rawElement: {
                name: 'name',
                type: '',
                value: 9
            },
            propertyName: ''
        });

        expect(element.value).toEqual(9);
        expect(element.name).toEqual('name');
    });

      it(`Checks number element with null number`, () => {
        const element = new Elements.NumberElement({
            contentItemSystem: {} as any,
            rawElement: {
                name: 'name',
                type: '',
                value: null
            },
            propertyName: ''
        });

        expect(element.value).toBeNull();
    });

});

