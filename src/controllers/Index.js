export default class Controller {
  constructor(key) {
    this.dispatchResponse = this.dispatchResponse.bind(this);
    this.handleService = this.handleService.bind(this);
    this.key = key;
  }

  handleService({
    method, res, next, status = 200, arg,
  }) {
    method(arg).then((data) => {
      if (data != null) {
        res.locals[this.key] = data;
        res.status(status);
        next();
      } else next('Service error');
    }).catch(next);
  }

  dispatchResponse(req, res) {
    res.send({ status: 'success', ...res.locals[this.key] });
  }
}
