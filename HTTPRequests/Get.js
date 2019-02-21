const http = require('http');
const settings = require('../config')

const host = settings.endPoint;
const resource = '/yourResource';

//Get method
exports.get = (resource,templateParams, queryParams) => {
    return new Promise((res, rej) => {
        http.get({
            host: host,
            path: _constructQueryString(resource,templateParams,queryParams)
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
exports.post = (jsonBody) => {
    return new Promise((res, rej) => {
        let dataEncoded = JSON.stringify(jsonBody);
        let req = http.request(
            {
                host: host,
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


function _constructQueryString(resource, templateParams, queryParams) {
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


