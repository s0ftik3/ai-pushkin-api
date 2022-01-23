const AiPushkin = require('../src/ai-pushkin');
const aiPushkin = new AiPushkin('M-2PAZtrj_avJHb-zaiKA');

const delay = (sec) => new Promise((resolve) => setTimeout(resolve, sec * 1000));

aiPushkin
    .getAudioVideoQuatrain('шёл по лесу')
    .then(async (response) => {
        let isTaskDone = false;

        await delay(response.secondsToEnd);

        while (!isTaskDone) {
            aiPushkin
                .checkTask(response.taskId)
                .then((response) => {
                    if (response.status === 'success') {
                        isTaskDone = true;
                        console.log(response);
                    } else {
                        return;
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
            await delay(1);
        }
    })
    .catch((err) => {
        console.error(err);
    });
