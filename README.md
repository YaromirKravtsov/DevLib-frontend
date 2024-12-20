# Проект Frontend Команди

## Опис Репозиторію

Цей репозиторій призначений для управління та координації розробки фронтенд-проекту. Команда складається з чотирьох учасників, кожен з яких має свої визначені обов'язки. Робочий процес організовано таким чином, щоб забезпечити ефективність та контроль якості коду.

### Задачі Тімліда
- Відповідає за створення завдань (тикетів) та призначення їх конкретним учасникам команди.
- Визначає дедлайни для виконання завдань.
- Після завершення роботи над тикетом проводить перевірку змін.
- Якщо зміни відповідають вимогам, зливає їх у головну гілку (`master`).

## Виконання Завдань
1. **Створення Тикетів:** Кожне завдання оформлюється як тикет, який створюється тімлідом у системі управління проектом.
2. **Гілки для Завдань:** Під кожен тикет створюється окрема гілка. Назва гілки повинна чітко відображати зміст завдання, наприклад, `feature/ticket-name` або `bugfix/ticket-id`.
3. **Завершення Завдання:** Після виконання завдання, виконавець створює коміт, в якому фіксує всі зміни, пов'язані з тикетом. Паралельно з цим, тикет закривається та змінює свій статус на "done".
4. **Перевірка Тімлідом:** Після завершення роботи над тикетом тімлід проводить повторне тестування. Якщо усі зміни виконані коректно та відповідають вимогам, тімлід зливає гілку із завершеним завданням у `master`.

## Загальні Правила
- **Всі коміти повинні бути змістовними та описувати внесені зміни.**
- **Не допускається пряме внесення змін у гілку `master`.** Всі зміни мають проходити через окремі гілки та перевірку тімлідом.
- **Комунікація:** Учасники команди повинні регулярно інформувати про статус своїх завдань та звертатись за допомогою в разі необхідності.
- **Код рев'ю:** Перед злиттям у `master` кожна зміна проходить перевірку тімлідом, що забезпечує якість та стабільність коду.

