const { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct } = require('./product');

beforeEach(() => {
    resetProducts();
});

describe('addProduct', () => {

    it('should add a product', () => {
        addProduct('Airpods',59.90);
        const products = getProducts();
        expect(products).toHaveLength(1);
        expect(products[0]).toMatchObject({id: 0,name: 'Airpods', price: 59.90})

    });

    it('should throw an error if name or price are not defined', () => {
        expect(() => addProduct()).toThrow('Name and price must be defined');
        expect(() => addProduct('Airpods')).toThrow('Name and price must be defined');
        expect(() => addProduct(undefined, 59.90)).toThrow('Name and price must be defined');
    });

    it('should throw an error if the product already exists', () => {
        addProduct('Airpods', 59.90);
        expect(() => addProduct('Airpods', 59.90)).toThrow('Product already exists');
    });

});

beforeEach(() => {
    resetProducts();
});

describe('removeProduct', () => {
    it('should delete the product', () => {
        addProduct('Manzana', 1);
        removeProduct(0);
        const products = getProducts();
        expect(products).toHaveLength(0);
    });

    it('Should throw an error if the product does not exist', () => {
        expect(() => removeProduct(0)).toThrow('Product not found');
    });
});

beforeEach(() => {
    resetProducts();
});


describe('getProduct', () => {
    it('should return a product for its id', () => {
        addProduct('Manzana', 1);
        const product = getProduct(0);
        expect(product).toMatchObject({ id: 0, name: 'Manzana', price: 1 });
    });

    it('Should throw an error if the product does not exist', () => {
        expect(() => getProduct(0)).toThrow('Product not found');
    });
});

beforeEach(() => {
    resetProducts();
});


describe('updateProduct', () => {
    test('should update a product', () => {
        addProduct('Pera', 1);
        updateProduct(0, 'Manzana', 2);
        const product = getProduct(0);
        expect(product).toMatchObject({ id: 0, name: 'Manzana', price: 2 });
    });

    test('should fail when updating a product that does not exist', () => {
        expect(() => updateProduct(0, 'Manzana', 2)).toThrow('Product not found');
    });

    test('should only update the price', () => {
        addProduct('Pera', 1);
        updateProduct(0, 'Pera',20);
        const product = getProduct(0);
        expect(product.name).toBe('Pera');
        expect(product.price).toBe(20);
    });

    test('should only update the name', () => {
        addProduct('Platanos', 10);
        updateProduct(0, undefined, 20);
        const product = getProduct(0);
        expect(product.name).toBe('Platanos');
        expect(product.price).toBe(20);
    });
});