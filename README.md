# @softik/ai-pushkin-api

![preview](https://i.ibb.co/mCLhkyK/2147483648-211294.jpg)

Да, очередная обёртка на NodeJs. Пару дней назад увидел рекламу в каком-то Telegram канале новой нейронной сети от Tinkoff. Заинтересовался, успел уже сделать Telegram-бот на её основе [@AiPushkinBot](https://t.me/AiPushkinBot), ну и решил опубликовать небольшую обёртку для работы с их API.
Для тех же, кто не видел и не пользовался оригиналом, вот ссылка — [ai-pushkin.content.tinkoff.ru](https://ai-pushkin.content.tinkoff.ru/).

## Как пользоваться

По моим наблюдениям, этот шаг неособо обязателен, однако я всё же опишу его.\
Для начала, в конструктор AiPushkin суём authorId, который вы можете достать, воспользовавшись веб-версией нейронки [ai-pushkin.content.tinkoff.ru](https://ai-pushkin.content.tinkoff.ru/) и режимом разработчика в вашем браузере (если Chrome, лезем в Application -> Local Storage -> userId).

```javascript
const AiPushkin = require('../src/ai-pushkin');
const aiPushkin = new AiPushkin('M-2PAZtrj_avJHb-zaiKA'); // это мой authorId, можете и его использовать, без разницы
```

Но, даже если вы ничего не укажете, по-сути, всё должно работать.

Дальше все примеры использования описаны в папке `examples`. Кратенько покажу их здесь на примере метода getQuatrain.

```javascript
aiPushkin
    .getQuatrain('шёл по лесу')
    .then((response) => {
        /**
         * тут ваш код и где-то вызов checkTask метода
         * так как API не возвращает сразу результат, нужная какая-то функция, которая подождёт
         * n-количество времени перед тем, как вызвать checkTask.
         *
         * в папке examples вы найдете такую функцию — delay.
         * в целом, там вся реализация есть, как и что ждать, так что вызывав node examples/getQuatrain.js вы
         * сразу же получите готовый результат.
         */
    })
    .catch((err) => {
        console.error(err);
    });
```

Оба метода возвращают один и тот же объект. Немного о нём:

```javascript
{
    taskId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', // айди задания, по нему нужно делать запрос checkTask
    text: 'шёл по лесу', // ваш запрос
    enrichedText: '', // тут будет результат, т.е. четверостишье
    authorId: 'M-2PAZtrj_avJHb-zaiKA', // как уже говорил, необязательное поле, но, возможно понадобится
    source: 'web', // откуда запрос делаете
    taskType: 'text_enrich', // может быть ещё video_generation
    status: 'waiting_text_enrich', // может быть 'waiting_text_enrich', 'waiting_audio_generation', 'waiting_video_generation', 'success' и 'error'
    audioUrl: '', // тут будет ссылка, если вы используете метод, который генерирует видео
    videoUrl: '',  // тоже самое, тут будет ссылка, если используете соответствующий метод
    createdAt: '', // тут и
    updatedAt: '', // тут просто будут даты
    approximateProcessedAt: '', // по вот этой дате можете ориентироваться, когда делать checkTask запрос
    secondsToEnd: 4, // либо же можете использовать мою функцию delay и засунуть туда это значение, функция подождет эти секунды, и дальше можете делать checkTask запрос
    error: null // тут будет объект ошибок, если status равен 'error'
}
```

## Дополнительная информация

-   Мой [Telegram канал](https://t.me/softik).
