// Custom logger middleware: logs method, URL, status and response time
const logger = (req, res, next) => {
  const start = Date.now();
  const time = new Date().toISOString();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${time}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`
    );
  });

  next();
};

module.exports = logger;
