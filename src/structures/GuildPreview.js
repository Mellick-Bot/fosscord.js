// @ts-nocheck
'use strict';

const Collection = require('../util/Collection');
const Base = require('./Base');
const GuildPreviewEmoji = require('./GuildPreviewEmoji');
const SnowflakeUtil = require('../util/SnowflakeUtil');

/**
 * Represents the data about the guild any bot can preview, connected to the specified guild.
 * @extends {Base}
 */
class GuildPreview extends Base {
  constructor(client, data) {
    super(client);

    if (!data) return;

    this._patch(data);
  }

  /**
   * Builds the guild with the provided data.
   * @param {*} data The raw data of the guild
   * @private
   */
  _patch(data) {
    /**
     * The id of this guild
     * @type {string}
     */
    this.id = data.id;

    /**
     * The name of this guild
     * @type {string}
     */
    this.name = data.name;

    /**
     * The icon of this guild
     * @type {?string}
     */
    this.icon = data.icon;

    /**
     * The splash icon of this guild
     * @type {?string}
     */
    this.splash = data.splash;

    /**
     * The discovery splash icon of this guild
     * @type {?string}
     */
    this.discoverySplash = data.discovery_splash;

    /**
     * An array of enabled guild features
     * @type {Features[]}
     */
    this.features = data.features;

    /**
     * The approximate count of members in this guild
     * @type {number}
     */
    this.approximateMemberCount = data.approximate_member_count;

    /**
     * The approximate count of online members in this guild
     * @type {number}
     */
    this.approximatePresenceCount = data.approximate_presence_count;

    /**
     * The description for this guild
     * @type {?string}
     */
    this.description = data.description ?? null;

    if (!this.emojis) {
      /**
       * Collection of emojis belonging to this guild
       * @type {Collection<Snowflake, GuildPreviewEmoji>}
       */
      this.emojis = new Collection();
    } else {
      this.emojis.clear();
    }
    for (const emoji of data.emojis) {
      this.emojis.set(emoji.id, new GuildPreviewEmoji(this.client, emoji, this));
    }
  }
  /**
   * The timestamp this guild was created at
   * @type {number}
   * @readonly
   */
  get createdTimestamp() {
    return SnowflakeUtil.deconstruct(this.id).timestamp;
  }

  /**
   * The time this guild was created at
   * @type {Date}
   * @readonly
   */
  get createdAt() {
    return new Date(this.createdTimestamp);
  }

  /**
   * The URL to this guild's splash.
   * @param {StaticImageURLOptions} [options={}] Options for the Image URL
   * @returns {?string}
   */
  splashURL({ format, size } = {}) {
    return this.splash && this.client.rest.cdn.Splash(this.id, this.splash, format, size);
  }

  /**
   * The URL to this guild's discovery splash.
   * @param {StaticImageURLOptions} [options={}] Options for the Image URL
   * @returns {?string}
   */
  discoverySplashURL({ format, size } = {}) {
    return this.discoverySplash && this.client.rest.cdn.DiscoverySplash(this.id, this.discoverySplash, format, size);
  }

  /**
   * The URL to this guild's icon.
   * @param {ImageURLOptions} [options={}] Options for the Image URL
   * @returns {?string}
   */
  iconURL({ format, size, dynamic } = {}) {
    return this.icon && this.client.rest.cdn.Icon(this.id, this.icon, format, size, dynamic);
  }

  /**
   * Fetches this guild.
   * @returns {Promise<GuildPreview>}
   */
  async fetch() {
    const data = await this.client.api.guilds(this.id).preview.get();
    this._patch(data);
    return this;
  }

  /**
   * When concatenated with a string, this automatically returns the guild's name instead of the Guild object.
   * @returns {string}
   * @example
   * // Logs: Hello from My Guild!
   * console.log(`Hello from ${previewGuild}!`);
   */
  toString() {
    return this.name;
  }

  toJSON() {
    const json = super.toJSON();
    json.iconURL = this.iconURL();
    json.splashURL = this.splashURL();
    return json;
  }
}

module.exports = GuildPreview;
