const productController = require('../../controller/product.js');
const productModel = require('../../models/Product.js')
const httpMocks = require('node-mocks-http');
const newProduct = require('./new-product.json');
const allProducts = require('../data/all-products.json');

/**
 * 이해 안가는 부분: create는 가짜다. 근데 controller에서 호출하는 create는 진짜다.
 * 실제 컨트롤러를의 함수를 호출하는데.. 가짜 데이터를 매개변수로 넣는다.
 * 가짜 req라고 해도 어쨌든 생성하는거 아닌가.
 * test.fn()이 하는 역할이 뭐여 도대체, return값을 정해줘야하는거 아닌가? 아 짜증나
 *
 */

let req,res,next;
productModel.create = jest.fn();
productModel.find = jest.fn();

beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe('create product', () => {

    beforeEach(()=>{
        req.body = newProduct;
    });

    it('should have a createProduct function', () => {
        expect(typeof productController.createProduct).toBe('function');
    });

    it('should call ProductModel.create', async () => {
        await productController.createProduct(req,res);
        
        // productModel.create(newProduct)인지 테스트
        expect(productModel.create).toBeCalledWith(newProduct);
    });

    it('should return 201 response code', async () => {
        await productController.createProduct(req,res);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        // 임의로 만든 정상적인 데이터를 넣어준다.
        productModel.create.mockReturnValue(newProduct);
        await productController.createProduct(req,res);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    })

    it('should handle error', async () => {
        const errorMessage = { message: 'description property missing'};
        // 임의로 에러를 만든다.
        const rejectedPromise = Promise.reject(errorMessage);
        // 만든 에러를 반환시키도록 한다.
        productModel.create.mockReturnValue(rejectedPromise);
        // 함수에 에러를 넣는다.
        await productController.createProduct(req,res,next);
        // 에러를 넣으면 이런 메시지가 나와야한다.
        // expect(next).toBeCalledWith(errorMessage);
        expect(res._getJSONData()).toBe(errorMessage.message);
    })

});

describe('get products', () => {

    it('should be function', () => {
        expect(typeof productController.getProducts).toBe('function');
    });

    //id를 넣어야한다는 테스트 작성법은?
    it('should call productModel.find', async () => {
        await productController.getProducts(req,res);
        expect(productModel.find).toHaveBeenCalledWith({});
    });

    it('should return 200 response', async () => {
        await productController.getProducts(req,res);
        expect(res.statusCode).toBe(200);
    });

    it('should return json', async () => {
        // 데이터를 넣고 빼는게 가능한지만 알면 되니까 임의의 데이터를 넣는다.
        productModel.find.mockReturnValue(allProducts);
        await productController.getProducts(req,res,next);
        // 데이터를 뱉어내는 로직이 없으면 실패한다.
        expect(res._getJSONData()).toStrictEqual(allProducts);
    })

    it('should handle errors', async () => {
        // 에러가 생겼을때 뱉어라, 현재 의문. 통합테스트가 더 명확함.
        const errorMessage = { message: "Error finding product data" };
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.find.mockReturnValue(rejectedPromise);
        await productController.getProducts(req, res, next);
        expect(res._getJSONData()).toBe('Error finding product data');
    })

});