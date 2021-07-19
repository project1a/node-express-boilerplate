const { User } = require('../../models');
const { roles } = require('../../config/roles');

module.exports = async () => {
  const jane = await User.create({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'fake@example.com',
    role: roles[1],
    password: await User.generatePasswordHash('password1'),
  });
  jane.update({ lastName: 'Jn Doe' });

  await User.create({
    firstName: 'Anna',
    lastName: 'Doe',
    email: 'ana@example.com',
    password: await User.generatePasswordHash('1111'),
  });

  await User.update(
    { lastName: 'Doee', password: await User.generatePasswordHash('password3333') },
    {
      where: {
        email: 'ana@example.com',
      },
    }
  );
};
