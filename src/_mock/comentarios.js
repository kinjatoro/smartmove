import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

const comentarios = [...Array(5)].map((_, index) => ({
    id: index,
    title: sample([ 'Ezequiel', 'Agustín', 'Carlos', 'Manuel', 'Juan','Esteban','Lucas','Fernando','Nicolás']),
    description: sample([
      'No puedo expresar lo agradecido que estoy por el apoyo que he recibido de este servicio de clases particulares. Mi profesor ha demostrado una paciencia infinita al explicar conceptos difíciles y me ha dado la confianza necesaria para enfrentar mis exámenes con éxito. Las lecciones son personalizadas y adaptadas a mis necesidades específicas, lo cual ha marcado la diferencia en mi aprendizaje.',
      'Recomiendo este servicio a cualquiera que quiera aprender rápido.',
      'tipazo',
      'Primer comentario',
      'Segundo comentario!',
      'recomienzo 100%',
      'fue una experiencia fantástica. Explicó los conceptos de manera clara y siempre estuvo dispuesto a responder mis preguntas. Mi comprensión de las matemáticas mejoró significativamente gracias a él.',
      'Like si lo ves en 2023',
      'Si bien el profe tiene un profundo conocimiento de la historia, a veces las clases pueden volverse un poco demasiado densas. Sería útil si se proporcionaran resúmenes de las lecciones después de cada clase para ayudar en la retención de información.',
    ]),
    image:  `/assets/images/avatars/avatar_${index + 1}.jpg`,
    postedAt: faker.date.recent(),
}));
  
  export default comentarios;