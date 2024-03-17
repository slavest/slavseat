import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import * as WinstonDaily from 'winston-daily-rotate-file';

const colors = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',
  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',
  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m',
};

const format = ({ color } = { color: false }) => [
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSSZZ' }),
  color
    ? winston.format.printf(
        (info) =>
          `${colors.FgMagenta}[Slavseat]${colors.Reset} ${
            colors.FgYellow
          }${info.level.toUpperCase()}${colors.Reset} ${
            colors.FgBlue
          }${info.timestamp} ${colors.FgYellow}[${info.context}]${
            colors.Reset
          } ${
            info.level === 'error' ? colors.FgRed : colors.FgGreen
          }${info.message}${info.stack ? `\n${info.stack}` : ''}`,
      )
    : winston.format.printf(
        (info) =>
          `[Slavseat] ${info.level.toUpperCase()} ${
            info.timestamp
          } [${info.context}] ${info.message}${
            info.stack ? `\n${info.stack}` : ''
          }`,
      ),
];

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
      format: winston.format.combine(
        ...format({ color: true }),
        winston.format.colorize({ all: true, colors }),
      ),
    }),
    new WinstonDaily({
      maxFiles: 30,
      datePattern: 'YYYY-MM-DD',
      dirname: process.cwd() + '/logs/slavseat',
      filename: `%DATE%-${Date.now()}.log`,
      format: winston.format.combine(
        ...format({ color: false }),
        winston.format.colorize({ all: false }),
      ),
    }),
  ],
});
