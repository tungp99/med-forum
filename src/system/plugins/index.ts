export { mdParser } from './_markdown.plugin'
export { apollo } from './_graphql.plugin'

import { getNames, registerLocale } from 'i18n-iso-countries'
import json from 'i18n-iso-countries/langs/en.json'
registerLocale(json)
console.log(getNames('en', { select: 'official' }))
