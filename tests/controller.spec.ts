import * as chai from 'chai'
import chaiHttp, {request} from 'chai-http'
import 'mocha'
import fs from 'node:fs'

import api from '../src/api.js'
import {authHeaderProperty} from '../src/middleware/authenticate.js'
import config from '../config/index.js'

chai.use(chaiHttp)

const expect = chai.expect

describe('controller', () => {
  describe('pdfToText', () => {
    describe('auth', () => {
      it('should error without auth field', async () => {
        const res = await request.execute(api).post('/pdf_to_text')
          .send({})
        expect(res.status).to.equal(401)
      })

      it('should error if auth string is not correct', async () => {
        const res = await request.execute(api).post('/pdf_to_text')
          .set(authHeaderProperty, 'randomstringofletters')
          .send({})
        expect(res.status).to.equal(401)
      })

      it('should succeed if auth string is correct', async () => {
        const res = await request.execute(api).post('/pdf_to_text')
          .set(authHeaderProperty, config.secret)
          .set('Content-Type', 'multipart/form-data')
          .attach('file', './tests/test_doc.pdf')
        expect(res.status).to.equal(200)
      })
    })

    describe('validation', () => {
      it('should fail if no file is sent', async () => {
        const res = await request.execute(api).post('/pdf_to_text')
          .set(authHeaderProperty, config.secret)
          .send({})
        expect(res.status).to.equal(500)
        expect(res.text).to.include('File could not be uploaded')
      })

      it('should fail if not a pdf', async () => {
        const res = await request.execute(api).post('/pdf_to_text')
          .set(authHeaderProperty, config.secret)
          .set('Content-Type', 'multipart/form-data')
          .attach('file', fs.readFileSync('./tests/test_image.png'), 'test_image.png')
        expect(res.status).to.equal(400)
        expect(res.text).to.include('Only PDF files are supported')
      })
    })

    it('should send text from file', async () => {
      const res = await request.execute(api).post('/pdf_to_text')
        .set(authHeaderProperty, config.secret)
        .set('Content-Type', 'multipart/form-data')
        .attach('file', './tests/test_doc.pdf')
      expect(res.status).to.equal(200)
      expect(res?.body?.text == null).to.be.false
      expect(res.body.text).to.include('This is a test PDF')
    })
  })
})
