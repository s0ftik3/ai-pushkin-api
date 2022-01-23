const Api = require('./api');

module.exports = class AiPushkin {
    constructor(authorId = '') {
        const api = new Api();
        /**
         * Method to call the API.
         * @private
         */
        this.callApi = api.callApi.bind(api);
        this.authorId = authorId;
    }

    /**
     * This method sends API request to get a quatrain.
     * @param {String} text Query line up to 30 chars.
     * @public
     */
    getQuatrain(text) {
        return this.callApi('getQuatrain', { authorId: this.authorId, text });
    }

    /**
     * This method sends API request to get a quatrain with video & audio.
     * @param {String} text Query line up to 30 chars.
     * @public
     */
    getAudioVideoQuatrain(text) {
        return this.callApi('getAudioVideoQuatrain', { authorId: this.authorId, text });
    }

    /**
     * This method sends API request to check if the task done or not.
     * @param {String} taskId Task id that will be returned from one of the 'get' methods.
     * @public
     */
    checkTask(taskId) {
        return this.callApi('checkTask', { taskId });
    }
};
