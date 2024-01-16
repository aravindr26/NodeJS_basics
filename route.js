const fs = require('fs');


const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/') {
        res.write('<html>');
        res.write('<head><title>Node JS handson</title></head>');
        res.write('<body>Greetings from Node.JS</body>');
        res.write("<form action='/create-user' name='create-user' method='POST'>");
        res.write("<input type='text' name='user-name'/><button type='submit'> Create User</button>")
        res.write('</form>');
        res.write('</html>');
        return res.end();
    } else if(url === '/users') {
        res.write('<html>');
        res.write('<head><title>Node JS handson</title></head>');
        res.write('<body>Greetings from Node.JS</body>');
        res.write('<ul>');
        res.write('<li>Sabna Aravind</li>');
        res.write('<li>Aravind</li>');
        res.write('</ul>');
        res.write('</html>')
        return res.end();
    } else if(url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log('chunk',chunk);
            body.push(chunk);
        });

        req.on('end', ()=> {
            console.log('body',body);
            const bufferData = Buffer.concat(body).toString();
            const data = bufferData.split('=')[1];
            console.log('request data', data);
            fs.writeFile('data-file.txt', data, ()=>{
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })
    } else {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

}

module.exports = requestHandler;