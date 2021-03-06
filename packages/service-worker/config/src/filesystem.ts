/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Абстракция над виртуальной файловой системой, используемой для тестирования и работы
 * генератора конфига в разных средах.
 *
 * @publicApi
 */
export interface Filesystem {
  list(dir: string): Promise<string[]>;
  read(file: string): Promise<string>;
  hash(file: string): Promise<string>;
  write(file: string, contents: string): Promise<void>;
}