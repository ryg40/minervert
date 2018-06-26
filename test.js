const users = [
  { id: 1, name: 'John', age: 22, gender: 'm' },
  { id: 2, name: 'Ellis', age: 46, gender: 'f' },
  { id: 3, name: 'Sara', age: 30, gender: 'f' }
];

const newUsers = users.map(
  user => (user.id === 1 ? { ...user, age: 23 } : user)
);

const femaleUsers = users.filter(user => user.gender === 'f');

const keyedUsers = users.reduce((usersObject, user) => {
  return {
    ...usersObject,
    [user.id]: user
  };
}, {});

console.log(keyedUsers);
