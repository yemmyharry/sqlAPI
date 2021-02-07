'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Categories', [{
         name: 'Node.js'
       },
       {
         name: 'Vue.js'
       },
       {
         name: 'React.js'
       },
       {
         name: 'ReactNative'
       }
      ]);


    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('Categories', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
