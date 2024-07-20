'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cursos', [
      {
        nome: 'Desenvolvimento Web',
        duracao: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Desenvolvimento Mobile',
        duracao: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Desenvolvimento de Sistemas',
        duracao: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Desenvolvimento de Games',
        duracao: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Desenvolvimento de Hardware',
        duracao: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cursos', null, {})
  }
};
