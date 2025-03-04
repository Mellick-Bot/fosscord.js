// @ts-nocheck
'use strict';

module.exports = {
  // "Root" classes (starting points)
  BaseClient: require('./client/BaseClient'),
  Client: require('./client/Client'),
  WebhookClient: require('./client/WebhookClient'),

  // Utilities
  ActivityFlags: require('./util/ActivityFlags'),
  ApplicationFlags: require('./util/ApplicationFlags'),
  BaseManager: require('./managers/BaseManager'),
  BitField: require('./util/BitField'),
  Collection: require('./util/Collection'),
  Constants: require('./util/Constants'),
  DataResolver: require('./util/DataResolver'),
  DiscordAPIError: require('./rest/DiscordAPIError'),
  Formatters: require('./util/Formatters'),
  HTTPError: require('./rest/HTTPError'),
  Intents: require('./util/Intents'),
  LimitedCollection: require('./util/LimitedCollection'),
  MessageFlags: require('./util/MessageFlags'),
  Options: require('./util/Options'),
  Permissions: require('./util/Permissions'),
  RateLimitError: require('./rest/RateLimitError'),
  SnowflakeUtil: require('./util/SnowflakeUtil'),
  SystemChannelFlags: require('./util/SystemChannelFlags'),
  ThreadMemberFlags: require('./util/ThreadMemberFlags'),
  UserFlags: require('./util/UserFlags'),
  Util: require('./util/Util'),
  version: require('../package.json').version,

  // Managers
  ApplicationCommandManager: require('./managers/ApplicationCommandManager'),
  ApplicationCommandPermissionsManager: require('./managers/ApplicationCommandPermissionsManager'),
  BaseGuildEmojiManager: require('./managers/BaseGuildEmojiManager'),
  CachedManager: require('./managers/CachedManager'),
  ChannelManager: require('./managers/ChannelManager'),
  ClientVoiceManager: require('./client/voice/ClientVoiceManager'),
  DataManager: require('./managers/DataManager'),
  GuildApplicationCommandManager: require('./managers/GuildApplicationCommandManager'),
  GuildBanManager: require('./managers/GuildBanManager'),
  GuildChannelManager: require('./managers/GuildChannelManager'),
  GuildEmojiManager: require('./managers/GuildEmojiManager'),
  GuildEmojiRoleManager: require('./managers/GuildEmojiRoleManager'),
  GuildInviteManager: require('./managers/GuildInviteManager'),
  GuildManager: require('./managers/GuildManager'),
  GuildMemberManager: require('./managers/GuildMemberManager'),
  GuildMemberRoleManager: require('./managers/GuildMemberRoleManager'),
  GuildStickerManager: require('./managers/GuildStickerManager'),
  MessageManager: require('./managers/MessageManager'),
  PermissionOverwriteManager: require('./managers/PermissionOverwriteManager'),
  PresenceManager: require('./managers/PresenceManager'),
  ReactionManager: require('./managers/ReactionManager'),
  ReactionUserManager: require('./managers/ReactionUserManager'),
  RoleManager: require('./managers/RoleManager'),
  StageInstanceManager: require('./managers/StageInstanceManager'),
  ThreadManager: require('./managers/ThreadManager'),
  ThreadMemberManager: require('./managers/ThreadMemberManager'),
  UserManager: require('./managers/UserManager'),
  VoiceStateManager: require('./managers/VoiceStateManager'),
  WebSocketManager: require('./client/websocket/WebSocketManager'),
  WebSocketShard: require('./client/websocket/WebSocketShard'),

  // Structures
  Activity: require('./structures/Presence').Activity,
  AnonymousGuild: require('./structures/AnonymousGuild'),
  Application: require('./structures/interfaces/Application'),
  ApplicationCommand: require('./structures/ApplicationCommand'),
  Base: require('./structures/Base'),
  BaseGuild: require('./structures/BaseGuild'),
  BaseGuildEmoji: require('./structures/BaseGuildEmoji'),
  BaseGuildVoiceChannel: require('./structures/BaseGuildVoiceChannel'),
  BaseMessageComponent: require('./structures/BaseMessageComponent'),
  ButtonInteraction: require('./structures/ButtonInteraction'),
  CategoryChannel: require('./structures/CategoryChannel'),
  Channel: require('./structures/Channel'),
  ClientApplication: require('./structures/ClientApplication'),
  ClientPresence: require('./structures/ClientPresence'),
  ClientUser: require('./structures/ClientUser'),
  Collector: require('./structures/interfaces/Collector'),
  CommandInteraction: require('./structures/CommandInteraction'),
  CommandInteractionOptionResolver: require('./structures/CommandInteractionOptionResolver'),
  DMChannel: require('./structures/DMChannel'),
  Emoji: require('./structures/Emoji'),
  Guild: require('./structures/Guild'),
  GuildAuditLogs: require('./structures/GuildAuditLogs'),
  GuildAuditLogsEntry: require('./structures/GuildAuditLogs').Entry,
  GuildBan: require('./structures/GuildBan'),
  GuildChannel: require('./structures/GuildChannel'),
  GuildEmoji: require('./structures/GuildEmoji'),
  GuildMember: require('./structures/GuildMember'),
  GuildPreview: require('./structures/GuildPreview'),
  GuildPreviewEmoji: require('./structures/GuildPreviewEmoji'),
  GuildTemplate: require('./structures/GuildTemplate'),
  Integration: require('./structures/Integration'),
  IntegrationApplication: require('./structures/IntegrationApplication'),
  Interaction: require('./structures/Interaction'),
  InteractionCollector: require('./structures/InteractionCollector'),
  InteractionWebhook: require('./structures/InteractionWebhook'),
  Invite: require('./structures/Invite'),
  InviteStageInstance: require('./structures/InviteStageInstance'),
  InviteGuild: require('./structures/InviteGuild'),
  Message: require('./structures/Message'),
  MessageActionRow: require('./structures/MessageActionRow'),
  MessageAttachment: require('./structures/MessageAttachment'),
  MessageButton: require('./structures/MessageButton'),
  MessageCollector: require('./structures/MessageCollector'),
  MessageComponentInteraction: require('./structures/MessageComponentInteraction'),
  MessageEmbed: require('./structures/MessageEmbed'),
  MessageMentions: require('./structures/MessageMentions'),
  MessagePayload: require('./structures/MessagePayload'),
  MessageReaction: require('./structures/MessageReaction'),
  MessageSelectMenu: require('./structures/MessageSelectMenu'),
  NewsChannel: require('./structures/NewsChannel'),
  OAuth2Guild: require('./structures/OAuth2Guild'),
  PartialGroupDMChannel: require('./structures/PartialGroupDMChannel'),
  PermissionOverwrites: require('./structures/PermissionOverwrites'),
  Presence: require('./structures/Presence').Presence,
  ReactionCollector: require('./structures/ReactionCollector'),
  ReactionEmoji: require('./structures/ReactionEmoji'),
  RichPresenceAssets: require('./structures/Presence').RichPresenceAssets,
  Role: require('./structures/Role'),
  SelectMenuInteraction: require('./structures/SelectMenuInteraction'),
  StageChannel: require('./structures/StageChannel'),
  StageInstance: require('./structures/StageInstance'),
  Sticker: require('./structures/Sticker'),
  StickerPack: require('./structures/StickerPack'),
  StoreChannel: require('./structures/StoreChannel'),
  Team: require('./structures/Team'),
  TeamMember: require('./structures/TeamMember'),
  TextChannel: require('./structures/TextChannel'),
  ThreadChannel: require('./structures/ThreadChannel'),
  ThreadMember: require('./structures/ThreadMember'),
  Typing: require('./structures/Typing'),
  User: require('./structures/User'),
  VoiceChannel: require('./structures/VoiceChannel'),
  VoiceRegion: require('./structures/VoiceRegion'),
  VoiceState: require('./structures/VoiceState'),
  Webhook: require('./structures/Webhook'),
  Widget: require('./structures/Widget'),
  WidgetMember: require('./structures/WidgetMember'),
  WelcomeChannel: require('./structures/WelcomeChannel'),
  WelcomeScreen: require('./structures/WelcomeScreen'),

  WebSocket: require('./WebSocket'),
};
