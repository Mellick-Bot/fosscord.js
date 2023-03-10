// @ts-nocheck
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const User = require('./User');
const DataResolver = require('../util/DataResolver');
/**
 * Represents the logged in client's Discord user.
 * @extends {User}
 */
class ClientUser extends User {
    _patch(data) {
        super._patch(data);
        if ('verified' in data) {
            /**
             * Whether or not this account has been verified
             * @type {boolean}
             */
            this.verified = data.verified;
        }
        if ('mfa_enabled' in data) {
            /**
             * If the bot's {@link ClientApplication#owner Owner} has MFA enabled on their account
             * @type {?boolean}
             */
            this.mfaEnabled = typeof data.mfa_enabled === 'boolean' ? data.mfa_enabled : null;
        }
        else if (typeof this.mfaEnabled === 'undefined') {
            this.mfaEnabled = null;
        }
        if (data.token)
            this.client.token = data.token;
    }
    /**
     * ClientUser's presence
     * @type {Presence}
     * @readonly
     */
    get presence() {
        return this.client.presence;
    }
    /**
     * Data used to edit the logged in client
     * @typdef {Object} ClientUserEditData
     * @property {string} [username] The new username
     * @property {BufferResolvable|Base64Resolvable} [avatar] The new avatar
     */
    /**
     * Edits the logged in client.
     * @param {ClientUserEditData} data The new data
     */
    edit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newData = yield this.client.api.users('@me').patch({ data });
            this.client.token = newData.token;
            const { updated } = this.client.actions.UserUpdate.handle(newData);
            return updated !== null && updated !== void 0 ? updated : this;
        });
    }
    /**
     * Sets the username of the logged in client.
     * <info>Changing usernames in Discord is heavily rate limited, with only 2 requests
     * every hour. Use this sparingly!</info>
     * @param {string} username The new username
     * @returns {Promise<ClientUser>}
     * @example
     * // Set username
     * client.user.setUsername('discordjs')
     *   .then(user => console.log(`My new username is ${user.username}`))
     *   .catch(console.error);
     */
    setUsername(username) {
        return this.edit({ username });
    }
    /**
     * Sets the avatar of the logged in client.
     * @param {BufferResolvable|Base64Resolvable} avatar The new avatar
     * @returns {Promise<ClientUser>}
     * @example
     * // Set avatar
     * client.user.setAvatar('./avatar.png')
     *   .then(user => console.log(`New avatar set!`))
     *   .catch(console.error);
     */
    setAvatar(avatar) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.edit({ avatar: yield DataResolver.resolveImage(avatar) });
        });
    }
    /**
     * Options for setting activities
     * @typedef {Object} ActivitiesOptions
     * @property {string} [name] Name of the activity
     * @property {ActivityType|number} [type] Type of the activity
     * @property {string} [url] Twitch / YouTube stream URL
     */
    /**
     * Data resembling a raw Discord presence.
     * @typedef {Object} PresenceData
     * @property {PresenceStatusData} [status] Status of the user
     * @property {boolean} [afk] Whether the user is AFK
     * @property {ActivitiesOptions[]} [activities] Activity the user is playing
     * @property {number|number[]} [shardId] Shard id(s) to have the activity set on
     */
    /**
     * Sets the full presence of the client user.
     * @param {PresenceData} data Data for the presence
     * @returns {Presence}
     * @example
     * // Set the client user's presence
     * client.user.setPresence({ activities: [{ name: 'with fosscord-gopnik' }], status: 'idle' });
     */
    setPresence(data) {
        return this.client.presence.set(data);
    }
    /**
     * A user's status. Must be one of:
     * * `online`
     * * `idle`
     * * `invisible`
     * * `dnd` (do not disturb)
     * @typedef {string} PresenceStatusData
     */
    /**
     * Sets the status of the client user.
     * @param {PresenceStatusData} status Status to change to
     * @param {number|number[]} [shardId] Shard id(s) to have the activity set on
     * @returns {Presence}
     * @example
     * // Set the client user's status
     * client.user.setStatus('idle');
     */
    setStatus(status, shardId) {
        return this.setPresence({ status, shardId });
    }
    /**
     * Options for setting an activity.
     * @typedef {Object} ActivityOptions
     * @property {string} [name] Name of the activity
     * @property {string} [url] Twitch / YouTube stream URL
     * @property {ActivityType|number} [type] Type of the activity
     * @property {number|number[]} [shardId] Shard Id(s) to have the activity set on
     */
    /**
     * Sets the activity the client user is playing.
     * @param {string|ActivityOptions} [name] Activity being played, or options for setting the activity
     * @param {ActivityOptions} [options] Options for setting the activity
     * @returns {Presence}
     * @example
     * // Set the client user's activity
     * client.user.setActivity('fosscord-gopnik', { type: 'WATCHING' });
     */
    setActivity(name, options = {}) {
        if (!name)
            return this.setPresence({ activities: [], shardId: options.shardId });
        const activity = Object.assign({}, options, typeof name === 'object' ? name : { name });
        return this.setPresence({ activities: [activity], shardId: activity.shardId });
    }
    /**
     * Sets/removes the AFK flag for the client user.
     * @param {boolean} afk Whether or not the user is AFK
     * @param {number|number[]} [shardId] Shard Id(s) to have the AFK flag set on
     * @returns {Presence}
     */
    setAFK(afk, shardId) {
        return this.setPresence({ afk, shardId });
    }
}
module.exports = ClientUser;
