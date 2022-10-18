import { order, orders } from '../../models/Order';
import { user, users } from '../../models/User';
import { product, products } from '../../models/Product';

describe('testing Order Model ', () => {
  const Order = new orders();
  const User = new users();
  const Product = new products();
  let userId: number, productId: number, orderId: number;

  beforeAll(async () => {
    const user: user = {
      username: 'WekelAhmed',
      firstname: 'elwekel',
      lastname: 'Ahmed',
      password: '123',
    };
    const newUser = await User.create(user);
    console.log(newUser);

    userId = newUser.id;

    const product: product = {
      name: 'samsung s8+',
      category: 'electric',
      price: '200$',
    };
    const newProduct = await Product.create(product);
    console.log(newProduct);
    productId = newProduct.id;

    //  order={
    //     productId:productId,
    //     quantity:1,
    //     status:'active',
    //     userId:userId

    // }
  });
  afterAll(async () => {
    await User.deleteOne(userId);
    await Product.deleteOne(productId);
  });

  it('expects to create order', async () => {
    const newOrder = await Order.create({
      products:[{product_id:productId,quantity:1}],
      status: 'active',
      user_id: userId,
    });

    expect(newOrder.products[0].product_id).toEqual(productId);
    expect(newOrder.products[0].quantity).toEqual(1)
    expect(newOrder.user_id).toEqual(userId);
    expect(newOrder.status).toEqual('active');

    orderId = newOrder.order_id as number;
  });

  it('expects to delete order ', async () => {
    await Order.deleteOne(orderId);
  });
});
