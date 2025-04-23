export class RedirectHelper {
  static redirect(res, path = '/') {
    if (!res || !path) {
      throw new Error('Response object and path are required');
    }
    res.redirect(path);
  }

  static redirectWithStatus(res, path = '/', statusCode = 302) {
    if (!res || !path || !statusCode) {
      throw new Error('Response object, path, and status code are required');
    }
    res.status(statusCode).redirect(path);
  }

  static redirectWithMessage(res, path = '/', message = '', statusCode = 302) {
    if (!res || !path || !message || !statusCode) {
      throw new Error('Response object, path, message, and status code are required');
    }
    res.status(statusCode).redirect(path);
  }
  static redirectWithError(res, path = '/', error = '', statusCode = 302) {
    if (!res || !path || !error || !statusCode) {
      throw new Error('Response object, path, error, and status code are required');
    }
    res.status(statusCode).redirect(path);
  }

  static redirectbBack(res, path = '/') {
    if (!res || !path) {
      throw new Error('Response object and path are required');
    }
    res.redirect('back');
  }
}