import { getNames, registerLocale } from 'i18n-iso-countries'
import json from 'i18n-iso-countries/langs/en.json'
registerLocale(json)

export const locales = getNames('en', { select: 'official' })
