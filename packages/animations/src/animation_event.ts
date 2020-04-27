/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Экземпляр этого класса возвращается как параметр события при анимации
 * обратный вызов фиксируется для анимации во время фазы запуска или завершения.
 *
 *  ```typescript
 *  @Component({
 *    host: {
 *      '[@myAnimationTrigger]': 'someExpression',
 *      '(@myAnimationTrigger.start)': 'captureStartEvent($event)',
 *      '(@myAnimationTrigger.done)': 'captureDoneEvent($event)',
 *    },
 *    animations: [
 *      trigger("myAnimationTrigger", [
 *         // ...
 *      ])
 *    ]
 *  })
 *  class MyComponent {
 *    someExpression: any = false;
 *    captureStartEvent(event: AnimationEvent) {
 *      // the toState, fromState and totalTime data is accessible from the event variable
 *    }
 *
 *    captureDoneEvent(event: AnimationEvent) {
 *      // the toState, fromState and totalTime data is accessible from the event variable
 *    }
 *  }
 *  ```
 *
 * @publicApi
 */
export interface AnimationEvent {
  /**
   * The name of the state from which the animation is triggered.
   */
  fromState: string;
  /**
   * The name of the state in which the animation completes.
   */
  toState: string;
  /**
   * The time it takes the animation to complete, in milliseconds.
   */
  totalTime: number;
  /**
   * The animation phase in which the callback was invoked, one of
   * "start" or "done".
   */
  phaseName: string;
  /**
   * The element to which the animation is attached.
   */
  element: any;
  /**
   * Internal.
   */
  triggerName: string;
  /**
   * Internal.
   */
  disabled: boolean;
}
