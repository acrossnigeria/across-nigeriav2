import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Chuka',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Uche',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Dangote cement',
      brand: 'Dangote',
      category: 'cement',
      price: 10.99,
      image: '/images/dangote.png',
      slug: 'dangote-cement',
      countInStock: 20,
      description: 'cement',
    },
    {
      name: 'BUA cement',
      brand: 'Bua',
      category: 'cement',
      price: 9.99,
      image: '/images/bua.png',
      slug: 'bua-cement',
      countInStock: 20,
      description: 'cement',
    },

    {
      name: '6 inches blocks',
      brand: '',
      category: 'blocks',
      price: 5.99,
      image: '/images/6-inches.jpg',
      slug: '6-inches-block',
      countInStock: 20,
      description: 'block',
    },
    {
      name: '9 inches blocks',
      category: 'blocks',
      brand: '',
      price: 8.99,
      image: '/images/9-inches.jpg',
      slug: '9-inches-block',
      countInStock: 20,
      description: 'block',
    },

    {
      name: 'Gravel (1 inch)',
      category: 'Stone Products',
      brand: '',
      price: 15.99,
      image: '/images/stone-base.jpg',
      slug: 'type-1-stone',
      countInStock: 20,
      description: 'gravel',
    },
    {
      name: '3/4 Crushed stone',
      category: 'Stone Products',
      brand: '',
      price: 12.99,
      image: '/images/34-stone.png',
      slug: 'type-2-stone',
      countInStock: 20,
      description: 'stone',
    },
    {
      name: 'Stone Dust',
      category: 'Stone Products',
      brand: '',
      price: 14.99,
      image: '/images/stone-dust.jpg',
      slug: 'type-3-stone',
      description: 'dust',
      countInStock: null,
    },
  ],
};

export default data;
