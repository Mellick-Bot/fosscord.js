// @ts-nocheck
'use strict';

const BaseGuildVoiceChannel = require('./BaseGuildVoiceChannel');
const Permissions = require('../util/Permissions');

/**
 * Represents a guild voice channel on Discord.
 * @extends {BaseGuildVoiceChannel}
 */
class VoiceChannel extends BaseGuildVoiceChannel {
  /**
   * Whether the channel is deletable by the client user
   * @type {boolean}
   * @readonly
   */
  get deletable() {
    return super.deletable && this.permissionsFor(this.client.user).has(Permissions.FLAGS.CONNECT, false);
  }

  /**
   * Whether the channel is editable by the client user
   * @type {boolean}
   * @readonly
   */
  get editable() {
    return this.manageable && this.permissionsFor(this.client.user).has(Permissions.FLAGS.CONNECT, false);
  }

  /**
   * Whether the channel is joinable by the client user
   * @type {boolean}
   * @readonly
   */
  get joinable() {
    if (!super.joinable) return false;
    if (this.full && !this.permissionsFor(this.client.user).has(Permissions.FLAGS.MOVE_MEMBERS, false)) return false;
    return true;
  }

  /**
   * Checks if the client has permission to send audio to the voice channel
   * @type {boolean}
   * @readonly
   */
  get speakable() {
    return this.permissionsFor(this.client.user).has(Permissions.FLAGS.SPEAK, false);
  }

  /**
   * Sets the bitrate of the channel.
   * @param {number} bitrate The new bitrate
   * @param {string} [reason] Reason for changing the channel's bitrate
   * @returns {Promise<VoiceChannel>}
   * @example
   * // Set the bitrate of a voice channel
   * voiceChannel.setBitrate(48000)
   *   .then(vc => console.log(`Set bitrate to ${vc.bitrate}bps for ${vc.name}`))
   *   .catch(console.error);
   */
  setBitrate(bitrate, reason) {
    return this.edit({ bitrate }, reason);
  }

  /**
   * Sets the user limit of the channel.
   * @param {number} userLimit The new user limit
   * @param {string} [reason] Reason for changing the user limit
   * @returns {Promise<VoiceChannel>}
   * @example
   * // Set the user limit of a voice channel
   * voiceChannel.setUserLimit(42)
   *   .then(vc => console.log(`Set user limit to ${vc.userLimit} for ${vc.name}`))
   *   .catch(console.error);
   */
  setUserLimit(userLimit, reason) {
    return this.edit({ userLimit }, reason);
  }

  /**
   * Sets the RTC region of the channel.
   * @name VoiceChannel#setRTCRegion
   * @param {?string} region The new region of the channel. Set to `null` to remove a specific region for the channel
   * @returns {Promise<VoiceChannel>}
   * @example
   * // Set the RTC region to europe
   * voiceChannel.setRTCRegion('europe');
   * @example
   * // Remove a fixed region for this channel - let Discord decide automatically
   * voiceChannel.setRTCRegion(null);
   */
}

module.exports = VoiceChannel;
