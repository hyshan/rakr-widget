import {Promise} from 'es6-promise';

export class HttpRequest {

  public static post(url: string, data: string): Promise<String> {
    return HttpRequest.execute('POST', url, data);
  }

  public static get(url: string): Promise<String> {
    return HttpRequest.execute('GET', url);
  }

  private static execute(method: string, url: string, data?: string): Promise<String> {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url, true);

      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.withCredentials = true;

      xhr.onreadystatechange = function (event) {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.responseText);

          } else {
            reject(xhr.statusText);
          }
        }
      };

      xhr.send(data);
    });
  }
}