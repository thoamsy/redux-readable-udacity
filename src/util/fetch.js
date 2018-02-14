const methods = [
  'get',
  'head',
  'post',
  'put',
  'delete',
  'option',
  'connect',
  'trace',
  'patch',
].map(method => method.toUpperCase());

const myFetch = (url, { method = 'get', headers = {}, body } = {}) => {
  method = method.toUpperCase();
  if (methods.indexOf(method) === -1) {
    throw TypeError('不存在的 HTTP 方法：' + method);
  }
  const h = {
    Authorization: 'What do your meaning?',
    mode: 'cors',
    ...headers,
  };
  const options = {
    method
  };

  if (body === undefined) {
    if (typeof body === 'object') {
      options.body = JSON.stringify(body);
      h['Content-Type'] = 'application/json';
    } else {
      options.body = body;
    }
  }

  options.headers = h;

  return fetch(url, options).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw Error(res.statusText);
  });
};

export default myFetch;
