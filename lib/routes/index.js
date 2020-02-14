'use strict';

class RoutesManager {

  constructor() {
    this.routes = [];
  }

  all() {
    return this.routes;
  }

  importController(controllerName) {
    const controller = controllerName.replace(/\.?([A-Z]+)/g, (x,y) => '_' + y.toLowerCase()).replace(/^_/, '');

    return require('../controllers/' + controller);
  }

  generateConfig(httpMethod, path, controllerName, options) {
    httpMethod = httpMethod.toUpperCase();

    const config = {
      method: httpMethod,
      path: !path.startsWith('/') ? '/' + path : path,
      config: {
        auth: false,
        ...options,
      },
    };

    const controller = this.importController(controllerName);

    switch(httpMethod) {
      case 'GET':
        config.handler = controller.index;
        break;
      case 'POST':
        config.handler = controller.create;
        break;
      case 'PUT':
      case 'PATCH':
        config.handler = controller.update;
        break;
      case 'DELETE':
        config.handler = controller.destroy;
        break;
      default:
        config.handler = controller;
    }

    return config;
  }

  get(path, controllerName, options) {
    this.routes.push(this.generateConfig('GET', path, controllerName, options));
  }

  post(path, controllerName, options) {
    this.routes.push(this.generateConfig('POST', path, controllerName, options));
  }

  put(path, controllerName, options) {
    this.routes.push(this.generateConfig('PUT', path, controllerName, options));
  }

  delete(path, controllerName, options) {
    this.routes.push(this.generateConfig('DELETE', path, controllerName, options));
  }

}

const routesManager = new RoutesManager();

routesManager.post('auth', 'AuthController');
routesManager.get('todos', 'TodosController', { auth: 'jwt' });
routesManager.post('todos', 'TodosController', { auth: 'jwt' });

const Routes = {
  config: routesManager.all()
};

module.exports = Routes;
