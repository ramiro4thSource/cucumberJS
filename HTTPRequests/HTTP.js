const http = require('http');



module.exports= class httpRequest {
    constructor(host, resource, env) {
        this.host = host;
        this.resource = resource;
        this.env = env;
    }
    //Get 
    get = (resource) => {
        resource=resource|| this.resource;
        return new Promise((res, rej) => {
            http.get({
                host: this.host,
                path: resource
            }, (response) => {
                var body = '';
                response.on('data', (d) => {
                    body += d;
                });
                response.on('end', () => {
                    res(body);
                });
            }).on('error', (error) => {
                rej(error);
            })
        })
    }

    //Post 
    post = (jsonBody, resource) => {
    resource = resource || this.resource;
        return new Promise((res, rej) => {
            let dataEncoded = JSON.stringify(jsonBody);
            let req = http.request(
                {
                    host: this.host,
                    path: resource,                
                    method: 'POST',
                    headers: {
                        'Content-Length': Buffer.byteLength(dataEncoded),
                        'Content-Type': 'application/json',
                    },
                },
                res => {
                    let buffers = [];
                    res.on('error', reject);
                    res.on('data', buffer => buffers.push(buffer));
                    res.on(
                        'end',
                        () =>
                            res.statusCode === 200
                                ? resolve(Buffer.concat(buffers))
                                : reject(Buffer.concat(buffers))
                    );
                }
            );
            req.write(dataEncoded);
            req.end();
        })
    }

    static _constructQueryString(resource, templateParams, queryParams) {
        templateParams = templateParams || null;
        queryParams = queryParams || null;
        var resourceRequest = resource;
        if (templateParams) {
            for (var key in templateParams) {
                if (!templateParams.hasOwnProperty(key)) rej(`${key} param was not found`);
                else {
                    resourceRequest += `/${templateParams[key]}`;
                }
            }
        }
        if (queryParams) {
            var count = 0;
            for (var key in queryParams) {
                if (!queryParams.hasOwnProperty(key)) rej(`${key} param was not found`);
                else {
                    if (count == 0) {
                        resourceRequest += `?${key}=${queryParams[key]}`;
                    }
                    else {
                        resourceRequest += `&${key}=${queryParams[key]}`;
                    }
                    count++;
                }
            }
        }
        return resourceRequest;
    }
}





