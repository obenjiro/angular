/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {createPlatformFactory, NgModule, PlatformRef, StaticProvider} from '@angular/core';
import {BrowserDynamicTestingModule, ɵplatformCoreDynamicTesting as platformCoreDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ɵINTERNAL_SERVER_PLATFORM_PROVIDERS as INTERNAL_SERVER_PLATFORM_PROVIDERS, ɵSERVER_RENDER_PROVIDERS as SERVER_RENDER_PROVIDERS} from '@angular/platform-server';


/**
 * Платформа для тестирования
 *
 * @publicApi
 */
export const platformServerTesting = createPlatformFactory(
    platformCoreDynamicTesting, 'serverTesting', INTERNAL_SERVER_PLATFORM_PROVIDERS);

/**
 * NgModule для тестирования.
 *
 * @publicApi
 */
@NgModule({
  exports: [BrowserDynamicTestingModule],
  imports: [NoopAnimationsModule],
  providers: SERVER_RENDER_PROVIDERS
})
export class ServerTestingModule {
}
