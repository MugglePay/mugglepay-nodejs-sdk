<!--
 * @Author: fay
 * @Date: 2021-03-01 18:09:00
 * @LastEditTime: 2021-03-02 12:14:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mugglepay-nodejs-sdk/README.md
-->
# mugglepay-nodejs-sdk

## API request
`npm install`
### Athorization
```
const mugglepay = require('./mugglepay')
const MugglepayClient = mugglepay.MugglepayClient
const apiKey = 'your_api_key'; # put your api key here
const mgp = new MugglepayClient(apiKey);
```

### Create Order
```
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
    }
);
```

### Get Order
```
mgp.get_order(orderId, function (body) {
    console.log(body)
})
```


### Get Orders
```
mgp.get_orders('NEW', 10, 0, function (body) {
    console.log(body)
})
```

### Checkout Orders
```
mgp.checkout_order(orderId, 'USD', function (body) {
    console.log(body)
})
```


## Run Callback server example
`node callback_server.js`
You need deploy this server online in order to get mugglepay official callback request. Make sure you put correct callback_url when you try to create an order.

## How to Register
 1. First click on the Sign Up address above
 2. Sign In[MugglePay Portal](https://merchants.mugglepay.com/user/register?ref=MP92D829A082DA)
 3. Choose"Developer Center"->“API”->“Use on backend server”，click“Add Key”，Get ur Key。
<img src="https://github.com/huangfengye/MugglepayForZfaka/blob/master/%E8%8E%B7%E5%8F%96%E5%BA%94%E7%94%A8%E5%AF%86%E9%92%A5.png" />

 4. replace `apiKey` in mugglepay.js with your key