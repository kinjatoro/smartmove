import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const CLASES = [
  'CEO','Legales', 'Mudanzas', 'Propietario', 'Empleado', 'Inquilino'
];



const NOMBRES =[
  ''
];

const DURACION = sample([])

const posts = [...Array(6)].map((_, index) => ({
  id: index+1,
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: CLASES[index],
  createdAt: faker.date.past(),
  view: sample([""]),
  stars: sample([""]),
  price: sample([
    ''
  ]),
  genero: sample(['']),
  share: sample([""]),
  favorite: faker.datatype.number(),
  author: {
    name: sample([
      "",
  ]),
  
    avatarUrl: ``,
  },
}));

export default posts;
