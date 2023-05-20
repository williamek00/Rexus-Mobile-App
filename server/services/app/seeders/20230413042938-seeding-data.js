'use strict';
const { default: slugify } = require('slugify');
const {hashedPassword} = require('../helpers/bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const usersData = require('../db.json').users
    usersData.map((el)=> {
      el.createdAt = el.updatedAt = new Date()
      el.password = hashedPassword(el.password)
      delete el.id
      return el
    })
    const categoriesData = require('../db.json').categories
    categoriesData.map((el)=> {
      el.createdAt = el.updatedAt = new Date()
      delete el.id
      return el
    })
    const productsData = require('../db.json').products
    productsData.map((el)=> {
      el.createdAt = el.updatedAt = new Date()
      el.slug = slugify(el.name).toLowerCase()
      delete el.id
      return el
    })
    const imagesData = require('../db.json').images
    imagesData.map((el)=> {
      el.createdAt = el.updatedAt = new Date()
      delete el.id
      return el
    })

    
    await queryInterface.bulkInsert("Users",usersData)
    await queryInterface.bulkInsert("Categories",categoriesData)
    await queryInterface.bulkInsert("Products",productsData)
    await queryInterface.bulkInsert("Images",imagesData)
    

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images');
    await queryInterface.bulkDelete('Products');
    await queryInterface.bulkDelete('Categories');
    await queryInterface.bulkDelete('Users');
  },

};
