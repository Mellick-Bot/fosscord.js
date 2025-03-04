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
const GuildEmoji = require('./GuildEmoji');
const ReactionEmoji = require('./ReactionEmoji');
const ReactionUserManager = require('../managers/ReactionUserManager');
const Util = require('../util/Util');
/**
 * Represents a reaction to a message.
 */
class MessageReaction {
    /**
     * @param {Client} client The instantiating client
     * @param {APIReaction} data The data for the message reaction
     * @param {Message} message The message the reaction refers to
     */
    constructor(client, data, message) {
        /**
         * The client that instantiated this message reaction
         * @name MessageReaction#client
         * @type {Client}
         * @readonly
         */
        Object.defineProperty(this, 'client', { value: client });
        /**
         * The message that this reaction refers to
         * @type {Message}
         */
        this.message = message;
        /**
         * Whether the client has given this reaction
         * @type {boolean}
         */
        this.me = data.me;
        /**
         * A manager of the users that have given this reaction
         * @type {ReactionUserManager}
         */
        this.users = new ReactionUserManager(this);
        this._emoji = new ReactionEmoji(this, data.emoji);
        this._patch(data);
    }
    _patch(data) {
        // eslint-disable-next-line eqeqeq
        if (this.count == undefined) {
            /**
             * The number of people that have given the same reaction
             * @type {?number}
             */
            this.count = data.count;
        }
    }
    /**
     * Removes all users from this reaction.
     * @returns {Promise<MessageReaction>}
     */
    remove() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.api
                .channels(this.message.channelId)
                .messages(this.message.id)
                .reactions(this._emoji.identifier)
                .delete();
            return this;
        });
    }
    /**
     * The emoji of this reaction. Either a {@link GuildEmoji} object for known custom emojis, or a {@link ReactionEmoji}
     * object which has fewer properties. Whatever the prototype of the emoji, it will still have
     * `name`, `id`, `identifier` and `toString()`
     * @type {GuildEmoji|ReactionEmoji}
     * @readonly
     */
    get emoji() {
        if (this._emoji instanceof GuildEmoji)
            return this._emoji;
        // Check to see if the emoji has become known to the client
        if (this._emoji.id) {
            const emojis = this.message.client.emojis.cache;
            if (emojis.has(this._emoji.id)) {
                const emoji = emojis.get(this._emoji.id);
                this._emoji = emoji;
                return emoji;
            }
        }
        return this._emoji;
    }
    /**
     * Whether or not this reaction is a partial
     * @type {boolean}
     * @readonly
     */
    get partial() {
        return this.count === null;
    }
    /**
     * Fetch this reaction.
     * @returns {Promise<MessageReaction>}
     */
    fetch() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.message.fetch();
            const existing = message.reactions.cache.get((_a = this.emoji.id) !== null && _a !== void 0 ? _a : this.emoji.name);
            // The reaction won't get set when it has been completely removed
            this._patch(existing !== null && existing !== void 0 ? existing : { count: 0 });
            return this;
        });
    }
    toJSON() {
        return Util.flatten(this, { emoji: 'emojiId', message: 'messageId' });
    }
    _add(user) {
        if (this.partial)
            return;
        this.users.cache.set(user.id, user);
        if (!this.me || user.id !== this.message.client.user.id || this.count === 0)
            this.count++;
        if (!this.me)
            this.me = user.id === this.message.client.user.id;
    }
    _remove(user) {
        var _a;
        if (this.partial)
            return;
        this.users.cache.delete(user.id);
        if (!this.me || user.id !== this.message.client.user.id)
            this.count--;
        if (user.id === this.message.client.user.id)
            this.me = false;
        if (this.count <= 0 && this.users.cache.size === 0) {
            this.message.reactions.cache.delete((_a = this.emoji.id) !== null && _a !== void 0 ? _a : this.emoji.name);
        }
    }
}
module.exports = MessageReaction;
