const status = 'error';
const isClient = true;
const timestamp = new Date();

const fetchError = (err, req, res, next) => {
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

const errorHandler = ((err, req, res, next) => {
  if (err.isClient) res.send(err.response);
  else next(err);
});

export default [
  fetchError,
  errorHandler,
];
