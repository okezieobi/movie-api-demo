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
  }
};

const errorHandler = ((err, req, res, next) => {
  if (err.isClient) res.send(err.response);
  else next(err);
});

export default [
  handleRequestError,
  errorHandler,
];
