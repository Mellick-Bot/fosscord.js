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
const Collection = require('../util/Collection');
const CachedManager = require('./CachedManager');
const { TypeError } = require('../errors');
const Role = require('../structures/Role');
const Permissions = require('../util/Permissions');
const { resolveColor, setPosition } = require('../util/Util');
let cacheWarningEmitted = false;
/**
 * Manages API methods for roles and stores their cache.
 * @extends {CachedManager}
 */
class RoleManager extends CachedManager {
    constructor(guild, iterable) {
        super(guild.client, Role, iterable);
        /**
         * The guild belonging to this manager
         * @type {Guild}
         */
        this.guild = guild;
    }
    /**
     * The role cache of this manager
     * @type {Collection<Snowflake, Role>}
     * @name RoleManager#cache
     */
    _add(data, cache) {
        return super._add(data, cache, { extras: [this.guild] });
    }
    /**
     * Obtains a role from Discord, or the role cache if they're already available.
     * @param {Snowflake} [id] The role's id
     * @param {BaseFetchOptions} [options] Additional options for this fetch
     * @returns {Promise<?Role|Collection<Snowflake, Role>>}
     * @example
     * // Fetch all roles from the guild
     * message.guild.roles.fetch()
     *   .then(roles => console.log(`There are ${roles.cache.size} roles.`))
     *   .catch(console.error);
     * @example
     * // Fetch a single role
     * message.guild.roles.fetch('222078108977594368')
     *   .then(role => console.log(`The role color is: ${role.color}`))
     *   .catch(console.error);
     */
    fetch(id, { cache = true, force = false } = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (id && !force) {
                const existing = this.cache.get(id);
                if (existing)
                    return existing;
            }
            // We cannot fetch a single role, as of this commit's date, Discord API throws with 405
            const data = yield this.client.api.guilds(this.guild.id).roles.get();
            const roles = new Collection();
            for (const role of data)
                roles.set(role.id, this._add(role, cache));
            return id ? (_a = roles.get(id)) !== null && _a !== void 0 ? _a : null : roles;
        });
    }
    /**
     * Data that can be resolved to a Role object. This can be:
     * * A Role
     * * A Snowflake
     * @typedef {Role|Snowflake} RoleResolvable
     */
    /**
     * Resolves a {@link RoleResolvable} to a {@link Role} object.
     * @method resolve
     * @memberof RoleManager
     * @instance
     * @param {RoleResolvable} role The role resolvable to resolve
     * @returns {?Role}
     */
    /**
     * Resolves a {@link RoleResolvable} to a {@link Role} id.
     * @method resolveId
     * @memberof RoleManager
     * @instance
     * @param {RoleResolvable} role The role resolvable to resolve
     * @returns {?Snowflake}
     */
    /**
     * Options used to create a new role.
     * @typedef {Object} CreateRoleOptions
     * @property {string} [name] The name of the new role
     * @property {ColorResolvable} [color] The data to create the role with
     * @property {boolean} [hoist] Whether or not the new role should be hoisted
     * @property {PermissionResolvable} [permissions] The permissions for the new role
     * @property {number} [position] The position of the new role
     * @property {boolean} [mentionable] Whether or not the new role should be mentionable
     * @property {string} [reason] The reason for creating this role
     */
    /**
     * Creates a new role in the guild with given information.
     * <warn>The position will silently reset to 1 if an invalid one is provided, or none.</warn>
     * @param {CreateRoleOptions} [options] Options for creating the new role
     * @returns {Promise<Role>}
     * @example
     * // Create a new role
     * guild.roles.create()
     *   .then(console.log)
     *   .catch(console.error);
     * @example
     * // Create a new role with data and a reason
     * guild.roles.create({
     *   name: 'Super Cool Blue People',
     *   color: 'BLUE',
     *   reason: 'we needed a role for Super Cool People',
     * })
     *   .then(console.log)
     *   .catch(console.error);
     */
    create(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let { name, color, hoist, permissions, position, mentionable, reason } = options;
            if (color)
                color = resolveColor(color);
            if (typeof permissions !== 'undefined')
                permissions = new Permissions(permissions);
            const data = yield this.client.api.guilds(this.guild.id).roles.post({
                data: {
                    name,
                    color,
                    hoist,
                    permissions,
                    mentionable,
                },
                reason,
            });
            const { role } = this.client.actions.GuildRoleCreate.handle({
                guild_id: this.guild.id,
                role: data,
            });
            if (position)
                return role.setPosition(position, reason);
            return role;
        });
    }
    /**
     * Edits a role of the guild.
     * @param {RoleResolvable} role The role to edit
     * @param {RoleData} data The new data for the role
     * @param {string} [reason] Reason for editing this role
     * @returns {Promise<Role>}
     * @example
     * // Edit a role
     * guild.roles.edit('222079219327434752', { name: 'buddies' })
     *   .then(updated => console.log(`Edited role name to ${updated.name}`))
     *   .catch(console.error);
     */
    edit(role, data, reason) {
        return __awaiter(this, void 0, void 0, function* () {
            role = this.resolve(role);
            if (!role)
                throw new TypeError('INVALID_TYPE', 'role', 'RoleResolvable');
            if (typeof data.position === 'number') {
                const updatedRoles = yield setPosition(role, data.position, false, this.guild._sortedRoles(), this.client.api.guilds(this.guild.id).roles, reason);
                this.client.actions.GuildRolesPositionUpdate.handle({
                    guild_id: this.guild.id,
                    roles: updatedRoles,
                });
            }
            const _data = {
                name: data.name,
                color: typeof data.color === 'undefined' ? undefined : resolveColor(data.color),
                hoist: data.hoist,
                permissions: typeof data.permissions === 'undefined' ? undefined : new Permissions(data.permissions),
                mentionable: data.mentionable,
            };
            const d = yield this.client.api.guilds(this.guild.id).roles(role.id).patch({ data: _data, reason });
            const clone = role._clone();
            clone._patch(d);
            return clone;
        });
    }
    /**
     * Gets the managed role a user created when joining the guild, if any
     * <info>Only ever available for bots</info>
     * @param {UserResolvable} user The user to access the bot role for
     * @returns {?Role}
     */
    botRoleFor(user) {
        var _a;
        const userId = this.client.users.resolveId(user);
        if (!userId)
            return null;
        return (_a = this.cache.find(role => { var _a; return ((_a = role.tags) === null || _a === void 0 ? void 0 : _a.botId) === userId; })) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * The `@everyone` role of the guild
     * @type {Role}
     * @readonly
     */
    get everyone() {
        return this.cache.get(this.guild.id);
    }
    /**
     * The premium subscriber role of the guild, if any
     * @type {?Role}
     * @readonly
     */
    get premiumSubscriberRole() {
        var _a;
        return (_a = this.cache.find(role => { var _a; return (_a = role.tags) === null || _a === void 0 ? void 0 : _a.premiumSubscriberRole; })) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * The role with the highest position in the cache
     * @type {Role}
     * @readonly
     */
    get highest() {
        return this.cache.reduce((prev, role) => (role.comparePositionTo(prev) > 0 ? role : prev), this.cache.first());
    }
}
module.exports = RoleManager;
