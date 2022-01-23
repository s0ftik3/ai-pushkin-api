const axios = require('axios');
const randomUseragent = require('random-useragent');

module.exports = class Api {
    /**
     * This method builds API request.
     * @param {String} method Available methods: getQuatrain, getAudioVideoQuatrain, checkTask.
     * @param {Object} params Parametrs for the methods: authorId, taskId, text.
     * @private
     */
    buildRequest(method, params = {}) {
        switch (method) {
            case 'getQuatrain':
                return {
                    method: 'POST',
                    url: 'https://neuro-personalities.tinkoff.ru/tasks/text_enrich',
                    headers: { 'user-agent': randomUseragent.getRandom() },
                    data: { ...params },
                };
            case 'getAudioVideoQuatrain':
                return {
                    method: 'POST',
                    url: 'https://neuro-personalities.tinkoff.ru/tasks/video_generation',
                    headers: { 'user-agent': randomUseragent.getRandom() },
                    data: { ...params },
                };
            case 'checkTask':
                return {
                    method: 'GET',
                    url: 'https://neuro-personalities.tinkoff.ru/tasks/' + params.taskId,
                    headers: { 'user-agent': randomUseragent.getRandom() },
                };
            default:
                throw new Error('An error occured during request build');
        }
    }

    /**
     * This method sends request to the API.
     * @param {Object} config Everything that buildRequest needs.
     * @private
     */
    async makeRequest(config) {
        const res = await axios(config);
        const data = await res.data;

        if (!data) {
            throw new Error('Failed to call API');
        }

        return data;
    }

    /**
     * Just a shortcut. Sends API request.
     * @param {String} method Available methods: getQuatrain, getAudioVideoQuatrain, checkTask.
     * @param {Object} params Parametrs for the methods: authorId, taskId, text.
     * @public
     */
    async callApi(method, params) {
        const config = this.buildRequest(method, params);
        return this.makeRequest(config);
    }
};
