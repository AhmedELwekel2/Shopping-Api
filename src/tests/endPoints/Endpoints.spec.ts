import app from '../../index';
import supertest from 'supertest';
import { user, users } from '../../models/User';
import { products } from '../../models/Product';
import { orders } from '../../models/Order';

describe('testing users endPoint', () => {
  const User = new users();
  let token: string, id: number;
  const request = supertest(app);

  beforeAll(async () => {
    const res = await request.post('/users/sign-up').send({
      username: 'AhmedElwekel',
      firstname: 'Ahmed',
      lastname: 'elwekel',
      password: '123',
    });
    token = res.body.token;
    id = res.body.data.id;
  });
  afterAll(async () => {
    await User.deleteOne(id);
  });

  it('expects to get user', async () => {
    const res = await request
      .get(`/users/${id}`)
      .set('Authorization', 'Bearer ' + token);

    const newUser = res.body;

    expect(newUser.username).toEqual('AhmedElwekel');
    expect(newUser.firstname).toEqual('Ahmed');
    expect(newUser.lastname).toEqual('elwekel');
  });
});

describe('testing orders endPoint ', () => {
  let token: string, userId: number, productId: number, orderId: number;
  const request = supertest(app);
  const User = new users();
  const Product = new products();

  beforeAll(async () => {
    const res = await request.post('/users/sign-up').send({
      username: 'AhmedElwekel',
      firstname: 'Ahmed',
      lastname: 'elwekel',
      password: '123',
    });
    token = res.body.token;
    userId = res.body.data.id;

    const resP = await request
      .post('/products')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: 'iphone X',
        category: 'electric',
        price: '250$',
      });
    productId = resP.body.id;
  });
  afterAll(async () => {
    await User.deleteOne(userId);
    await Product.deleteOne(productId);
  });

  it('expects to create order', async () => {
    const res = await request
      .post('/orders')
      .set('Authorization', 'Bearer ' + token)
      .send({
        products:[{product_id:productId,quantity:3}],
        user_id:userId,
        status:"active"
      });
    orderId = res.body.order_id;

    expect(res.status).toEqual(300);
  });

  it('expects to delete order', async () => {
    const res = await request
      .delete(`/orders/${orderId}`)
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toEqual(300);
  });
});

describe('testing products endPoint', () => {
  const User = new users();
  let token: string, id: number, productId: number;
  const request = supertest(app);

  beforeAll(async () => {
    const res = await request.post('/users/sign-up').send({
      username: 'AhmedElwekel',
      firstname: 'Ahmed',
      lastname: 'elwekel',
      password: '123',
    });
    token = res.body.token;
    id = res.body.data.id;
  });
  afterAll(async () => {
    await User.deleteOne(id);
  });

  it('expects to create product ', async () => {
    const res = await request
      .post('/products')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: 'iphone X',
        category: 'electric',
        price: '250$',
      });

    expect(res.status).toEqual(300);
    productId = res.body.id;
  });

  it('expects to delete order ', async () => {
    const res = await request
      .delete(`/products/${productId}`)
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toEqual(300);
  });
});
