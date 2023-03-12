/** @module utils/logger */
const { createLogger, format, transports } = require('winston')

/**
 * Create logger instance with the custom configuration
*/
module.exports = createLogger({
  transports:
    new transports.File({
      filename: 'logs/server.log',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
      )
    })
})
