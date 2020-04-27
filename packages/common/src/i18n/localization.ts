/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Inject, Injectable, LOCALE_ID} from '@angular/core';

import {getLocalePluralCase, Plural} from './locale_data_api';


/**
 * @publicApi
 */
export abstract class NgLocalization {
  abstract getPluralCategory(value: any, locale?: string): string;
}


/**
 * Returns the plural category for a given value.
 * - "=value" when the case exists,
 * - the plural category otherwise
 */
export function getPluralCategory(
    value: number, cases: string[], ngLocalization: NgLocalization, locale?: string): string {
  let key = `=${value}`;

  if (cases.indexOf(key) > -1) {
    return key;
  }

  key = ngLocalization.getPluralCategory(value, locale);

  if (cases.indexOf(key) > -1) {
    return key;
  }

  if (cases.indexOf('other') > -1) {
    return 'other';
  }

  throw new Error(`No plural message found for value "${value}"`);
}

/**
 * Возвращает регистр множественного числа в зависимости от локали
 *
 * @publicApi
 */
@Injectable()
export class NgLocaleLocalization extends NgLocalization {
  constructor(@Inject(LOCALE_ID) protected locale: string) {
    super();
  }

  getPluralCategory(value: any, locale?: string): string {
    const plural = getLocalePluralCase(locale || this.locale)(value);

    switch (plural) {
      case Plural.Zero:
        return 'zero';
      case Plural.One:
        return 'one';
      case Plural.Two:
        return 'two';
      case Plural.Few:
        return 'few';
      case Plural.Many:
        return 'many';
      default:
        return 'other';
    }
  }
}
