import { setLoggerName, setLoggerLevels } from './utils/logger.js'

import * as nco from './nco/index.js'
import { search } from './search/index.js'
import { syobocal as searchSyobocal } from './search/syobocal.js'
import * as niconico from './niconico/index.js'
import * as jikkyo from './jikkyo/index.js'
import * as syobocal from './syobocal/index.js'
import * as danime from './danime/index.js'
import * as abema from './abema/index.js'
import * as dmmTv from './dmmTv/index.js'
import * as fod from './fod/index.js'
import * as unext from './unext/index.js'

setLoggerName('nco-api')

export const ncoApi = {
  setLoggerName,
  setLoggerLevels,

  nco,
  search,
  searchSyobocal,
  niconico,
  jikkyo,
  syobocal,
  danime,
  abema,
  dmmTv,
  fod,
  unext,
}
