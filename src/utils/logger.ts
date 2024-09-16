let $name: `[${string}]` | undefined

let $levels: {
  verbose?: boolean
  info?: boolean
  warnings?: boolean
  errors?: boolean
} = {
  verbose: true,
  info: true,
  warnings: true,
  errors: true,
}

export const setLoggerName = (name: string) => {
  $name = `[${name}]`
}

export const setLoggerLevels = (levels: typeof $levels) => {
  $levels = levels
}

export const logger: Console = {
  // Verbose
  debug(...data: any[]): void {
    if ($levels.verbose) {
      if ($name) data.unshift($name)

      console.log(...data)
    }
  },

  // Info
  info(...data: any[]): void {
    if ($levels.info) {
      if ($name) data.unshift($name)

      console.log(...data)
    }
  },
  log(...data: any[]): void {
    this.info(...data)
  },

  // Warnings
  warn(...data: any[]): void {
    if ($levels.warnings) {
      if ($name) data.unshift($name)

      console.warn(...data)
    }
  },

  // Errors
  error(...data: any[]): void {
    if ($levels.errors) {
      if ($name) data.unshift($name)

      console.error(...data)
    }
  },

  assert: console.assert,
  clear: console.clear,
  count: console.count,
  countReset: console.countReset,
  dir: console.dir,
  dirxml: console.dirxml,
  group: console.group,
  groupCollapsed: console.groupCollapsed,
  groupEnd: console.groupEnd,
  table: console.table,
  time: console.time,
  timeEnd: console.timeEnd,
  timeLog: console.timeLog,
  timeStamp: console.timeStamp,
  trace: console.trace,
}

setLoggerName('nco-api')
