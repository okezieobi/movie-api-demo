const status = 'error';
const isClient = true;
const timestamp = new Date();

const handleRequestError = (err, req, res, next) => {
  if (err.name === 'RequestError') {
    res.status(err.data.code);
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
  } else next(err);
};

const handleValidationError = (err, req, res, next) => {
  if (err.constructor.name === 'ValidationError') {
    res.status(400);
    next({
      isClient,
      response: {
        status,
        message: err.message,
        data: { ...err, timestamp },
      },
    });
  } else next(err);
};

const errorHandler = ((err, req, res, next) => {
  if (err.isClient) res.send(err.response);
  else next(err);
});

export default [
  handleRequestError,
  handleValidationError,
  errorHandler,
];
