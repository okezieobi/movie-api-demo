const status = 'error';
const isClient = true;
const timestamp = new Date();

export default (err, req, res, next) => {
  if (err.constructor.name === 'FetchError') {
    res.status(409);
    next({
      isClient,
      response: {
        status,
        message: err.message,
        data: {
          name: err.name,
          timestamp,
        },
      },
    });
  }
};
