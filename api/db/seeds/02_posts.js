/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('post').del()
  await knex('post').insert([
    {
      title: 'Post 1',
      content: 'This is the first post',
      user_id: 1
    },
    {
      title: 'Post 2',
      content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a malesuada leo, vel vestibulum ipsum. Nullam a quam nec massa ullamcorper viverra vitae sed quam. Ut a dolor a orci rutrum placerat at nec felis. Pellentesque facilisis dolor a felis pharetra finibus. Nam eu dolor tortor. Donec elementum lectus sed sem lobortis iaculis. Vestibulum euismod molestie ultrices. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      
      Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut augue orci, semper non semper ac, lobortis eu nisi. Sed a nibh ac purus luctus posuere et ac eros. Quisque faucibus est arcu, et ultricies dui lobortis ut. Quisque dictum molestie elementum. Aliquam vel pellentesque lacus, eu suscipit leo. Etiam accumsan, dui sit amet mattis pretium, nunc eros viverra orci, at cursus ante purus eget felis. Fusce vel rhoncus erat. Phasellus vitae turpis sit amet turpis mollis tincidunt. Sed feugiat.
      `,
      user_id: 1
    },
    {
      title: 'Post 3',
      content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a malesuada leo, vel vestibulum ipsum. Nullam a quam nec massa ullamcorper viverra vitae sed quam. Ut a dolor a orci rutrum placerat at nec felis. Pellentesque facilisis dolor a felis pharetra finibus. Nam eu dolor tortor. Donec elementum lectus sed sem lobortis iaculis. Vestibulum euismod molestie ultrices. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      `,
      user_id: 1
    },
  ]);
};
