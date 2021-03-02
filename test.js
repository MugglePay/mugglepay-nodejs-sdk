/*
 * @Author: your name
 * @Date: 2021-03-02 09:35:02
 * @LastEditTime: 2021-03-02 12:13:17
 * @LastEditors: Please set LastEditors
 * @Description: test case
 * @FilePath: /mugglepay-nodejs-sdk/test.js
 */

const mugglepay = require('./mugglepay');
const MugglepayClient = mugglepay.MugglepayClient;

const apiKey = 'your_api_key'
const mgp = new MugglepayClient(apiKey);
newOrder = {
    'merchant_order_id': 'test_order_id',
    'title': 'Monthly Program x 2',
    'description': 'test python',
    'price_amount': 0.01,
    'price_currency': 'USD',
    'pay_currency': 'CNY',
    'callback_url': 'https://{your_host}/mugglepay_callback_api', // replace { your_host } with your own host where you deployed callback server, example your_host：http://123.123.123.12:2340
    'cancel_url': 'https://{your_host}/mugglepay?status=cancel',
    'success_url': 'https://{your_host}/mugglepay?status=cancel',
    'mobile': false,
    'fast': false,
    'token': 'test12345'
}
res = mgp.create_order(
    newOrder,
    function (body) {
        console.log(body)
        order = body['order']
        console.log(order)
        orderId = order['order_id']
        console.log(orderId)
        mgp.get_order(orderId, function (body) {
            console.log(body)
        })
        mgp.get_orders('NEW', 10, 0, function (body) {
            console.log(body)
        })
        mgp.checkout_order(orderId, 'USD', function (body) {
            console.log(body)
        })
    }
);