const http = require("http");
const fs = require("fs");

function validateRegistration(users, data) {
    if (data.name.length < 3){
        return false;
    }
    if (data.password < 3){
        return false;
    }
    for (user in users){
        if (users[user].name === data.name){
            return false;
        }
    }
    return data.hasOwnProperty("email");
}

function signIn(users,data) {
    for (user in users){
        if (users[user].name === data.name & users[user].password === data.password){
            return true;
        }
    }
    return false;
}

function validateProduct(products,data) {
    for (product in products){
        if (products[product].name === data.product){
            return false;
        }
    }
    if (data.description.length < 15){
        return false;
    }
    if (isNaN(data.price)){
        return false;
    }
    return true;
}

function validateOrder(products,data) {
    let result = false;
    for (product in products){
        if (products[product].name === data.product){
            data.price = products[product].price;
            data.seller = products[product].seller;
            result = true;
        }
    }
    if (!data.hasOwnProperty("email")) {
        return false;
    }
    if (!data.hasOwnProperty("description")) {
        return false;
    }
    return result;
}

function createOrder(products,data){
    for (product in products){
        if (products[product].name === data.product){
            data.price = products[product].price;
            data.seller = products[product].seller;
        }
    }
    return { email: data.email, seller: data.seller, description: data.description, price: data.price, product: data.product};
}

function listOrders(orders,user){
    let result = [];
    for (order in orders){
        if (orders[order].seller === user.name){
            result.push(orders[order]);
        }
    }
    return result;
}

http.createServer(function (request, response) {
    console.log(`Request url: ${request.url}`);
    console.log(`Request method: ${request.method}`);
    let route;
    if (request.url === "/" || request.url === "/products") {
        fs.createReadStream("index.html").pipe(response);
    }
    else if (request.url === "/sign-up") {
        fs.createReadStream("sign-up.html").pipe(response);
    }
    else if (request.url === "/sign-in") {
        fs.createReadStream("sign-in.html").pipe(response);
    }
    else if (request.url === "/add-product") {
        fs.createReadStream("add-product.html").pipe(response);
    }
    else if (request.url.slice(0,8) === "/product"){
        fs.createReadStream("order.html").pipe(response);
    }
    else if (request.url == "/orders") {
        fs.createReadStream("orders.html").pipe(response);
    }
    else if (request.url.match(/\/api\//) != null) {
        route = request.url.slice(5);
        if (request.method === 'POST'){
            let data;
            let users;
            let products;
            let orders;
            if (route === "sign-up"){
                data = '';
                request.on('data',chunk => {
                    data += chunk.toString();
                })
                request.on('end', () => {
                    data = JSON.parse(data);
                    users = fs.readFileSync("data/users.json");
                    users = JSON.parse(users);
                    if (validateRegistration(users,data)){
                        data = {
                            name: data.name,
                            password: data.password,
                            email: data.email
                        }
                        users.push(data);
                        users = JSON.stringify(users);
                        fs.writeFileSync("data/users.json",users);
                        response.statusCode = 201;
                        response.end("Created");
                    }
                    else {
                        response.statusCode = 400;
                        response.end("Wrong data");
                    }
                })
            }
            else if (route === "sign-in"){
                data = '';
                request.on('data',chunk => {
                    data += chunk.toString();
                })
                request.on('end', () => {
                    data = JSON.parse(data);
                    users = fs.readFileSync("data/users.json");
                    users = JSON.parse(users);
                    if (signIn(users,data)){
                        response.statusCode = 200;
                        response.end("Authorized");
                    }
                    else {
                        response.statusCode = 400;
                        response.end("Wrong data");
                    }
                })
            }
            else if (route === "add-product"){
                data = '';
                request.on('data',chunk => {
                    data += chunk.toString();
                })
                request.on('end', () => {
                    data = JSON.parse(data);
                    users = fs.readFileSync("data/users.json");
                    users = JSON.parse(users);
                    products = fs.readFileSync("data/products.json");
                    products = JSON.parse(products);
                    if (signIn(users,data)){
                        if (validateProduct(products,data)){
                            data = {
                                name: data.product,
                                description: data.description,
                                price: data.price,
                                seller: data.name
                            }
                            products.push(data);
                            products = JSON.stringify(products);
                            fs.writeFileSync("data/products.json",products);
                            response.statusCode = 201;
                            response.end("Created");
                        }
                        else {
                            response.statusCode = 400;
                            response.end("Wrong data");
                        }
                    }
                    else {
                        response.statusCode = 400;
                        response.end("Unauthorized");
                    }
                })
            }
            else if (route === "order") {
                data = '';
                request.on('data',chunk => {
                    data += chunk.toString();
                })
                request.on('end', () => {
                    data = JSON.parse(data);
                    products = fs.readFileSync("data/products.json");
                    products = JSON.parse(products);
                    if (validateOrder(products,data)){
                        orders = fs.readFileSync("data/orders.json");
                        orders = JSON.parse(orders);
                        orders.push(createOrder(products,data));
                        orders = JSON.stringify(orders);
                        fs.writeFileSync("data/orders.json",orders);
                        response.statusCode = 201;
                        response.end("Created");
                    }
                    else {
                        response.statusCode = 400;
                        response.end("Wrong data");
                    }
                })
            }
            else if (route === "orders") {
                data = '';
                request.on('data',chunk => {
                    data += chunk.toString();
                })
                request.on('end', () => {
                    data = JSON.parse(data);
                    users = fs.readFileSync("data/users.json");
                    users = JSON.parse(users);
                    if (signIn(users,data)){
                        orders = fs.readFileSync("data/orders.json");
                        orders = JSON.parse(orders);
                        data = listOrders(orders,data);
                        data = JSON.stringify(data);
                        response.statusCode = 200;
                        response.end(data);
                    }
                    else {
                        response.statusCode = 400;
                        response.end("Unauthorized");
                    }
                })
            }
        }
        else if (request.method === 'GET'){
            if (route === "products") {
                products = fs.readFileSync("data/products.json");
                products = JSON.parse(products);
                products = JSON.stringify(products);
                response.statusCode = 200;
                response.end(products);
            }
            else if (route.match(/product\//) != null){
                let i = Number(route.slice(8));
                products = fs.readFileSync("data/products.json");
                products = JSON.parse(products);
                if (i < products.length & i >= 0){
                    data = JSON.stringify(products[i]);
                    response.statusCode = 200;
                    response.end(data);
                }
                else {
                    response.statusCode = 404;
                    response.end("Product not found!");
                }
            }
        }
    }
    else if (request.url.match(/\/public\//) != null) {
        const resourcePath = request.url.substr(1);
        fs.access(resourcePath, fs.constants.R_OK, err => {
            if (err) {
                response.statusCode = 404;
                response.end("Resourse not found!");
            }
            else {
                fs.createReadStream(resourcePath).pipe(response);
            }
        });
    }
    else if (request.url.match(/\/src\//) != null) {
        const resourcePath = request.url.substr(1);
        fs.access(resourcePath, fs.constants.R_OK, err => {
            if (err) {
                response.statusCode = 404;
                response.end("Resourse not found!");
            }
            else {
                response.setHeader("Content-Type", "application/javascript");
                fs.createReadStream(resourcePath).pipe(response);
            }
        });
    }
    else {
        response.statusCode = 404;
        response.end("Resourse not found!");
    }
}).listen(3000, function () {
    console.log("Server started at 3000");
});