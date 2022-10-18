import { product, products } from '../../models/Product';

describe('testing Product Mode', () => {
  const Product = new products();
  let productId: number;
  it('expects to create product ', async () => {
    const newProduct = await Product.create({
      name: 'samsung s8+',
      category: 'electric',
      price: '200$',
    });

    expect(newProduct.name).toEqual('samsung s8+');
    expect(newProduct.category).toEqual('electric');
    expect(newProduct.price).toEqual('200$');
    productId = newProduct.id;
  });

  it('expects to delete product', async () => {
    await Product.deleteOne(productId);
  });
});
