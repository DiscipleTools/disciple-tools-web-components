// This file statically imports all country name JSONs from i18n-iso-countries/langs/
// and exports them as a single object keyed by language code.
// Update this list if you add/remove supported languages.

import en from 'i18n-iso-countries/langs/en.json';
import fr from 'i18n-iso-countries/langs/fr.json';
import es from 'i18n-iso-countries/langs/es.json';
import de from 'i18n-iso-countries/langs/de.json';
import it from 'i18n-iso-countries/langs/it.json';
import ru from 'i18n-iso-countries/langs/ru.json';
import zh from 'i18n-iso-countries/langs/zh.json';
import ar from 'i18n-iso-countries/langs/ar.json';
import pt from 'i18n-iso-countries/langs/pt.json';
import tr from 'i18n-iso-countries/langs/tr.json';
import ja from 'i18n-iso-countries/langs/ja.json';
import nl from 'i18n-iso-countries/langs/nl.json';
import pl from 'i18n-iso-countries/langs/pl.json';
import sv from 'i18n-iso-countries/langs/sv.json';
import uk from 'i18n-iso-countries/langs/uk.json';
import ko from 'i18n-iso-countries/langs/ko.json';
import cs from 'i18n-iso-countries/langs/cs.json';
import da from 'i18n-iso-countries/langs/da.json';
import fi from 'i18n-iso-countries/langs/fi.json';
import nb from 'i18n-iso-countries/langs/nb.json';
import ro from 'i18n-iso-countries/langs/ro.json';
import hu from 'i18n-iso-countries/langs/hu.json';
import el from 'i18n-iso-countries/langs/el.json';
import he from 'i18n-iso-countries/langs/he.json';
import fa from 'i18n-iso-countries/langs/fa.json';
import hi from 'i18n-iso-countries/langs/hi.json';
import id from 'i18n-iso-countries/langs/id.json';
import th from 'i18n-iso-countries/langs/th.json';
import vi from 'i18n-iso-countries/langs/vi.json';

export const countryNames = {
  en, fr, es, de, it, ru, zh, ar, pt, tr, ja, nl, pl, sv, uk, ko, cs, da, fi, nb, ro, hu, el, he, fa, hi, id, th, vi
};

// Usage: import { countryNames } from './country-names.js';
// countryNames['en'].countries['US'] // "United States"
