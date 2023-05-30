const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
const CATEGORY = "DevOps API: Computer loan service";

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "debug",
  format: combine(label({ label: CATEGORY }), timestamp(), customFormat),
  transports: [
    new transports.File({
      filename: "./logs.log",
    }),
  ],
});

module.exports = logger;
