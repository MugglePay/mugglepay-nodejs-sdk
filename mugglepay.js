/*
 * @Author: ruofei xu
 * @Date: 2021-03-01 18:10:45
 * @LastEditTime: 2021-03-02 10:47:03
 * @LastEditors: Please set LastEditors
 * @Description: mugglepay sdk for payment
 * @FilePath: /mugglepay-nodejs-sdk/mugglepay.js
 */

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

const request = require('request')


class MugglepayClient {
    constructor(api_key,api_url="https://api.mugglepay.com/v1"){
        this.api_key = api_key
        this.api_url = api_url
    }
    
    // create mugglepay order
    create_order(
        order,
        next
        ){
        if (order['merchant_order_id'] == ''){
            throw 'merchant order id is not valid';
        }
        const url = `${this.api_url}/orders`
        const options = {
            method: 'POST',
            url: url,
            headers: {
                'token': this.api_key,
                'content-type': 'application/json'
            },
            body: order,
            json: true
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            next(body)
        });
    }
    // get mugglepay order
    get_order(order_id, next) {
        if (order_id == ""){
            throw 'order id is not valid'
        }
        const url = `${this.api_url}/orders/${order_id}`
        const options = {
            method: 'GET',
            url: url,
            headers: {
                'token': this.api_key,
                'content-type': 'application/json'
            },
            json: true
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            next(body)
        });
    }
    // get mugglepay orders
    get_orders(status, limit, offset, next) {
        const url = `${this.api_url}/orders`
        const options = {
            method: 'GET',
            url: url,
            headers: {
                'token': this.api_key,
                'content-type': 'application/json'
            },
            qs: {
                'status': status,
                'limit': limit,
                'offset': offset
            },
            json: true
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            next(body)
        });
    }


    // checkout mugglepay order
    checkout_order(
        order_id,
        pay_currency,
        next
    ) {
        if (order_id == '') {
            throw 'order id is not valid';
        }
        const url = `${this.api_url}/orders/${this.order_id}/checkout`
        const options = {
            method: 'POST',
            url: url,
            headers: {
                'token': this.api_key,
                'content-type': 'application/json'
            },
            body: {
                'pay_currency': pay_currency,
            },
            json: true
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            next(body)
        });
    }
}

module.exports = {
    MugglepayClient: MugglepayClient
}
