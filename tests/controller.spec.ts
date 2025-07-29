import * as chai from 'chai'
import chaiHttp, {request} from 'chai-http'
import 'mocha'

import api from '../src/api.js'

chai.use(chaiHttp)

const expect = chai.expect

describe('controller', () => {
  describe('pdfToText', () => {
    describe('auth', () => {
      it('should error without auth field', async () => {
        const res = await request.execute(api).post('/pdf_to_text').send({})
        expect(res.status).to.equal(401)
      })
    })
  })
})
