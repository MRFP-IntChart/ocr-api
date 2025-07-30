import * as chai from 'chai'
import chaiHttp, {request} from 'chai-http'
import 'mocha'

import api from '../src/api.js'
import {authHeaderProperty} from '../src/middleware/authenticate.js'
import config from '../config/index.js'

chai.use(chaiHttp)

const expect = chai.expect

describe('controller', () => {
  describe('pdfToText', () => {
    describe('auth', () => {
      it('should error without auth field', async () => {
        const res = await request.execute(api).post('/pdf_to_text').send({})
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
          .send({})
        expect(res.status).to.equal(200)
      })
    })
  })
})
