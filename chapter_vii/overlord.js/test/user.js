const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const colors = require('colors')

const app = require('../src/app')

chai.use(chaiHttp)
const username = 'user_test_mocha'
const email = 'user_test_mocha@mestizos.dev'
let userId = 0
const urlBase = '/overlord/v1/'

describe('User'.bgBlue, () => {
  describe('POST user'.cyan, () => {
    it('It should rejedt POST user, because bad user and bad email', (done) => {
      const user = {
        username: 'a',
        email: 'a.com'
      }

      chai.request(app)
        .post(`${urlBase}user`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(422)
          console.log('Reject user:'.blue.bold, res.body)
          done()
        })
    })
  })

  describe('POST user'.cyan, () => {
    it('It should POST a user', (done) => {
      const user = { username, email }

      chai.request(app)
        .post(`${urlBase}user`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          userId = res.body.id
          console.log('Create user:'.blue.bold, res.body)
          done()
        })
    })
  })

  describe('POST duplicate user'.cyan, () => {
    it('It should reject POST user', (done) => {
      const user = { username, email }

      chai.request(app)
        .post(`${urlBase}user`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(404)
          console.log('Reject user:'.blue.bold, res.body)
          done()
        })
    })
  })

  describe('POST duplicate email user'.cyan, () => {
    it('It should reject POST user because email is duplicate', (done) => {
      const user = { username: 'other_extra_user', email }

      chai.request(app)
        .post(`${urlBase}user`)
        .send(user)
        .end((err, res) => {
          res.should.have.status(404)
          console.log('Reject user:'.blue.bold, res.body)
          done()
        })
    })
  })
  
  describe('PUT user'.cyan, () => {
    it('it should reject PUT a user when other user exist for example (system)', (done) => {
      const user = {
        username: 'system',
        email,
        password: '1234567890',
        status: false
      }

      chai.request(app)
        .put(`${urlBase}user/` + userId)
        .send(user)
        .end((err, res) => {
          res.should.have.status(404)
          console.log('Reject user:'.blue.bold, res.body)
          done()
        })
    })
  })
  
  describe('PUT user'.cyan, () => {
    it('it should PUT a user', (done) => {
      const user = {
        username: 'other_user_test',
        email: 'other_user_test@mestizos.dev',
        password: '1234567890',
        status: false
      }

      chai.request(app)
        .put(`${urlBase}user/` + userId)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          console.log('Update user:'.blue.bold, res.body)
          done()
        })
    })
  })
  
  describe('GET user'.cyan, () => {
    it('it should GET a user', (done) => {
      chai.request(app)
        .get(`${urlBase}user/` + userId)
        .end((err, res) => {
          res.should.have.status(200)
          console.log('Get user:'.blue.bold, res.body)
          done()
        })
    })
  })

  describe('DELETE user'.cyan, () => {
    it('It should DELETE a user', (done) => {
      chai.request(app)
        .delete(`${urlBase}user/` + userId)
        .end((err, res) => {
          res.should.have.status(200)
          console.log('Delete user:'.blue.bold, res.body)
          done()
        })
    })
  })
})
