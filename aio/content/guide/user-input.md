{@a user-input}
# Пользовательский ввод

Действия пользователя, такие как нажатие на ссылку, нажатие кнопки и ввод
текст поднять события DOM.
На этой странице объясняется, как связать эти события с обработчиками событий компонента, используя Angular
синтаксис привязки событий.

Запустите <live-example></live-example>.


{@a binding-to-user-input-events}
## Привязка к событиям пользовательского ввода

Вы можете использовать [привязки Angular событий](guide/template-syntax#event-binding)
ответить на любое [событие DOM](https://developer.mozilla.org/en-US/docs/Web/Events).
Многие события DOM запускаются пользовательским вводом. Привязка к этим событиям дает возможность
получить ввод от пользователя.

Для привязки к событию DOM заключите имя события DOM в круглые скобки и присвойте кавычку
[шаблон заявления](guide/template-syntax#template-statements)к нему.

В следующем примере показано событие связывания, который реализует обработчик щелчка:

<code-example path="user-input/src/app/click-me.component.ts" region="click-me-button" header="src/app/click-me.component.ts"></code-example>

{@a click}

 `(click)` слева от знака равенства идентифицирует событие нажатия кнопки как **цель привязки**.
Текст в кавычках справа от знака равенства
это **шаблон заявления**, который отвечает
к событию click, вызывая компонент `onClickMe` метод.

При написании привязки оператора шаблона **учитывайте контекст выполнения**.
Идентификаторы в шаблоне заявления принадлежат определенному контексту объекта
обычно Angular компонент, управляющий шаблоном.
Приведенный выше пример показывает одна строки HTML, но, что HTML - принадлежит к большей компоненте:


<code-example path="user-input/src/app/click-me.component.ts" region="click-me-component" header="src/app/click-me.component.ts"></code-example>



Когда пользователь нажимает кнопку, Angular вызывает `onClickMe` метод из `ClickMeComponent`.



{@a get-user-input-from-the-$event-object}
## Получить пользовательский ввод от объекта $ event
События DOM несут полезную информацию, которая может быть полезна для компонента.
В этом разделе показано, как привязать к `keyup` Событие поля ввода для получения ввода пользователя после каждого нажатия клавиши.

Следующий код слушает `keyup` событие и передает всю полезную нагрузку события (`$event`) в обработчик событий компонента.

<code-example path="user-input/src/app/keyup.components.ts" region="key-up-component-1-template" header="src/app/keyup.components.ts (template v.1)"></code-example>



Когда пользователь нажимает и отпускает клавишу, `keyup` происходит событие, а Angular предоставляет соответствующий
Объект события DOM в `$event` переменная которую этот код передает в качестве параметра компоненту `onKey()`.

<code-example path="user-input/src/app/keyup.components.ts" region="key-up-component-1-class-no-type" header="src/app/keyup.components.ts (class v.1)"></code-example>



Свойства `$event` Объект варьируется в зависимости от типа события DOM. Например,
событие мыши содержит информацию, отличную от события редактирования поля ввода.

Все [стандартные объекты событий DOM](https://developer.mozilla.org/en-US/docs/Web/API/Event)
иметь `target` свойство, ссылка на элемент, вызвавший событие.
В этом случае, `target` относится к [`элемент](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)и
 `event.target.value` возвращает текущее содержимое этого элемента.

После каждого звонка `onKey()` добавляет содержимое значения поля ввода в список
в компоненте `values` Свойство, за которым следует символ разделителя (|).
[Интерполяция](guide/template-syntax#interpolation)
отображает накопление изменений в поле ввода `values` свойства.

Предположим, что пользователь вводит буквы «abc», а затем удаляет их по одному.
Вот то, что отображает пользовательский интерфейс:

<code-example>
  a | ab | abc | ab | a | |
</code-example>



<div class="lightbox">
  <img src='generated/images/guide/user-input/keyup1-anim.gif' alt="key up 1">
</div>



<div class="alert is-helpful">



В качестве альтернативы, вы можете накапливать отдельные ключи сами, подставляя `event.key` 
для `event.target.value` в этом случае тот же пользовательский ввод будет производить:

<code-example>
  a | b | c | backspace | backspace | backspace |

</code-example>



</div>



{@a keyup1}


{@a type-the-event}
### Введите _$event_

В приведенном выше примере `$event` как `any` тип.
Это упрощает код за плату.
Нет информации о типе
это может раскрыть свойства объекта события и предотвратить глупые ошибки.

Следующий пример переписывает метод с типами:

<code-example path="user-input/src/app/keyup.components.ts" region="key-up-component-1-class" header="src/app/keyup.components.ts (class v.1 - typed)"></code-example>



 `$event` теперь является конкретным `KeyboardEvent`.
Не все элементы имеют `value` свойства, так что бросает `target` для элемента ввода.
 `OnKey` Метод более четко выражает то, что он ожидает от шаблона и как он интерпретирует событие.

{@a passing-$event-is-a-dubious-practice}
### Прохождение _$event_ - сомнительная практика
Typing объекта события показывает существенное возражение передавая все события DOM в метод:
компонент слишком осведомлен о деталях шаблона.
Он не может извлекать информацию, не зная больше, чем следует о реализации HTML.
Это нарушает разделение проблем между шаблоном (то, что видит пользователь)
и компонент (_как приложение обрабатывает пользовательские данные_).

В следующем разделе показано, как использовать переменные ссылки на шаблон для решения этой проблемы.



{@a get-user-input-from-a-template-reference-variable}
## Получите пользовательский ввод из ссылочной переменной шаблона
Есть еще один способ получить пользовательские данные: использовать Angular
[** ссылочные переменные шаблона**](guide/template-syntax#ref-vars).
Эти переменные обеспечивают прямой доступ к элементу из шаблона.
Чтобы объявить переменную ссылки на шаблон, перед идентификатором должен стоять символ хеша (или фунта) ( #).

В следующем примере используется ссылочная переменная шаблона
реализовать петлю нажатия клавиш в простом шаблоне.

<code-example path="user-input/src/app/loop-back.component.ts" region="loop-back-component" header="src/app/loop-back.component.ts"></code-example>



Ссылочная переменная шаблона с именем `box`, заявленная на `<input>` элемент
относится к `<input>` сам элемент.
Код использует `box` переменная чтобы получить входной элемент `value` и отобразить его
с интерполяцией между `<p>` теги.

Шаблон полностью автономен. Он не привязан к компоненту
и компонент ничего не делает.

Введите что-нибудь в поле ввода и следите за обновлением дисплея при каждом нажатии клавиши.


<div class="lightbox">
  <img src='generated/images/guide/user-input/keyup-loop-back-anim.gif' alt="loop back">
</div>



<div class="alert is-helpful">



**Это не будет работать вообще, если вы не привязаны к событию**.

Angular обновляет привязки (и, следовательно, экран)
только если приложение делает что-то в ответ на асинхронные события, такие как нажатия клавиш.
Этот пример кода связывает `keyup` событие
на номер 0 возможна самая короткая шаблонная выписка.
Пока заявление ничего полезного не дает
он удовлетворяет требованию Angular, чтобы Angular обновлял экран.

</div>



Проще попасть в поле ввода со ссылкой на шаблон
переменная, чем пройти через `$event` объекта. Вот переписать предыдущий
 `keyup` Пример который использует переменную ссылки шаблона для получения ввода пользователя.

<code-example path="user-input/src/app/keyup.components.ts" region="key-up-component-2" header="src/app/keyup.components.ts (v2)"></code-example>



Приятным аспектом этого подхода является то, что компонент получает чистые значения данных из представления.
Больше не требуется знание `$event` и его структура.
{@a key-event}


{@a key-event-filtering-with-key.enter}
## Фильтрация ключевых событий (с `key.enter`)
 `(keyup)` обработчик событий слышит *каждое нажатие клавиши*.
Иногда имеет значение только ключ _Enter_, потому что он сигнализирует, что пользователь закончил печатать.
Одним из способов снижения шума будет проверка каждого `$event.keyCode` и выполнять действие только тогда, когда ключ _Enter_.

Есть более простой способ: привязать к Angular's `keyup.enter` псевдо-событие.
Затем Angular вызывает обработчик событий только тогда, когда пользователь нажимает _Enter_.

<code-example path="user-input/src/app/keyup.components.ts" region="key-up-component-3" header="src/app/keyup.components.ts (v3)"></code-example>



Вот как это работает.

<div class="lightbox">
  <img src='generated/images/guide/user-input/keyup3-anim.gif' alt="key up 3">
</div>




{@a on-blur}
## На размытие

В предыдущем примере текущее состояние поля ввода
будет потеряно, если пользователь отключится и щелкнет в другом месте на странице
без первого нажатия _Enter_.
Компоненты `value` свойства обновляется только тогда, когда пользователь нажимает _Enter_.

Чтобы устранить эту проблему, прослушайте ключ _Enter_ и событие _blur_.


<code-example path="user-input/src/app/keyup.components.ts" region="key-up-component-4" header="src/app/keyup.components.ts (v4)"></code-example>




{@a put-it-all-together}
## Положите все это вместе
Предыдущая страница показала, как [отображать данные](guide/displaying-data).
На этой странице демонстрируются методы привязки событий.

Теперь соберите все это вместе в микро-приложение
который может отображать список героев и добавлять новых героев в список.
Пользователь может добавить героя, введя имя героя в поле ввода и
нажав кнопку **Добавить**.


<div class="lightbox">
  <img src='generated/images/guide/user-input/little-tour-anim.gif' alt="Little Tour of Heroes">
</div>



Ниже приведен компонент «Маленький тур героев».


<code-example path="user-input/src/app/little-tour.component.ts" region="little-tour" header="src/app/little-tour.component.ts"></code-example>



{@a observations}
### Наблюдения

* **Используйте переменный шаблон для обозначения элементов** -
 `newHero` шаблона относится к `<input>` элемент.
Вы можете ссылаться `newHero` от любого родного брата или ребенка `<input>` элемент.

* **Передача значений, а не элементы** -
Вместо прохождения `newHero` в компонент `addHero` метод
получить значение поля ввода и передать, *что* в `addHero`.

* **Держите шаблон отчетность простой** -
 `(blur)` Событие связано с двумя операторами JavaScript.
Первое высказывание призывает `addHero` . Второе утверждение, `newHero.value=''`,
очищает поле ввода после добавления нового героя в список.



{@a source-code}
## Исходный код

Ниже приведен весь код, обсуждаемый на этой странице.

<code-tabs>

  <code-pane header="click-me.component.ts" path="user-input/src/app/click-me.component.ts">

  </code-pane>

  <code-pane header="keyup.components.ts" path="user-input/src/app/keyup.components.ts">

  </code-pane>

  <code-pane header="loop-back.component.ts" path="user-input/src/app/loop-back.component.ts">

  </code-pane>

  <code-pane header="little-tour.component.ts" path="user-input/src/app/little-tour.component.ts">

  </code-pane>

</code-tabs>


Angular также поддерживает пассивные слушатели событий. Например, вы можете использовать следующие шаги, чтобы сделать событие прокрутки пассивным.

1. Создать файл `zone-flags.ts` под `src` каталог.
2. Добавьте следующую строку в этот файл.

```
(window as any)['__zone_symbol__PASSIVE_EVENTS'] = ['scroll'];
```

3. В `src/polyfills.ts` Файл, прежде чем импортировать zone.js, импортирует только что созданный `zone-flags`.

```
import './zone-flags';
import 'zone.js/dist/zone'; // Included with Angular CLI.
```

После этих шагов, если вы добавите прослушиватели событий для `scroll` событие, слушатели будут `passive`.

{@a summary}
## Резюме

Вы освоили основные примитивы для реагирования на пользовательский ввод и жесты.

Эти приемы полезны для небольших демонстраций, но они есть
быстро становиться многословным и неуклюжим при обработке большого количества пользовательского ввода.
Двустороннее связывание данных - более элегантный и компактный способ перемещения
значения между полями ввода данных и свойствами модели.
Следующая страница, `Forms`, объясняет, как писать
двусторонние привязки с `NgModel`.
