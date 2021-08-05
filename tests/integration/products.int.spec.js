/*
* 실제로 DB에 연결하여 테스트. 무슨 의미가있지? 직접 데이터를 확인하지 않아도 된다는거?
* ->1. 서버를 실행시키지 않아도 된다. 어째서??
*   2. TDD 기법을 사용하기 위해서. subscribe(when) => it(do)
*
*   쉽게 정리하자면, 테스트 코드에 설명을 쓰고 그대로 만들면 됨.
*   이런 Data가 들어오면 이런 ErrorMessage를 보내줄거야. 정해놓고, 테스트하고, 빨간불 보고, 수정함
*/ 

const request = require('supertest');
const app = require('../../index.js');
const newProductData = require('../unit/new-product.json');

it('POST api/product', async () => {
    const response = await request(app)
    .post('/api/product')
    .send({...newProductData,name:'효민!!'});
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('효민!!');
})

it('should return 500', async () => {
    const response = await request(app)
    .post('/api/product')
    .send({name:'김효민'});
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual('Product validation failed: description: Path `description` is required.');
})