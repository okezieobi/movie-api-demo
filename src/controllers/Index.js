export default class Controller {
  constructor(key) {
    this.dispatchResponse = this.dispatchResponse.bind(this);
    this.handleService = this.handleService.bind(this);
    this.key = key;
  }

  async handleService({
    method, res, next, status = 200, arg,
  }) {
    const data = await method(arg).catch(next);
    if (data != null) {
      res.locals[this.key] = data;
      res.status(status);
      next();
    } else next('Service error');
  }

  dispatchResponse(req, res) {
    res.send({ status: 'success', ...res.locals[this.key] });
  }
}
