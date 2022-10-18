import { user, users } from '../../models/User';

describe('testing User Model', () => {
  const user: user = {
    username: 'WekelAhmed',
    firstname: 'elwekel',
    lastname: 'Ahmed',
    password: '123',
  };
  type newUser = {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    password: string;
  };
  const User = new users();
  let newUser: newUser;

  it('expects to create user ', async () => {
    newUser = await User.create(user);

    expect(newUser.username).toEqual(user.username);
  });
  it('expects to delete user ', async () => {
    await User.deleteOne(newUser.id);
  });
});
