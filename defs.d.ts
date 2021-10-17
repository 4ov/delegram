type Methods =
	| "sendMessage"
	| "getMe"
	| "getUpdates"
	| "setWebhook"
	| "deleteWebhook"
	| "getWebhookInfo"
	| "forwardMessage"
	| "copyMessage"
	| "sendPhoto"
	| "sendAudio"
	| "sendDocument"
	| "sendVideo"
	| "sendAnimation"
	| "sendVoice"
	| "sendVideoNote"
	| "sendMediaGroup"
	| "sendLocation"
	| "editMessageLiveLocation"
	| "stopMessageLiveLocation"
	| "sendVenue"
	| "sendContact"
	| "sendPoll"
	| "sendDice"
	| "sendChatAction"
	| "getUserProfilePhotos"
	| "getFile"
	| "kickChatMember"
	| "unbanChatMember"
	| "restrictChatMember"
	| "promoteChatMember"
	| "setChatAdministratorCustomTitle"
	| "setChatPermissions"
	| "exportChatInviteLink"
	| "createChatInviteLink"
	| "editChatInviteLink"
	| "revokeChatInviteLink"
	| "deleteChatPhoto"
	| "setChatTitle"
	| "setChatDescription"
	| "pinChatMessage"
	| "setChatPhoto"
	| "unpinChatMessage"
	| "unpinAllChatMessages"
	| "leaveChat"
	| "getChat"
	| "getChatAdministrators"
	| "getChatMemberCount"
	| "getChatMember"
	| "setChatStickerSet"
	| "deleteChatStickerSet"
	| "answerCallbackQuery"
	| "setMyCommands"
	| "deleteMyCommands"
	| "getMyCommands"
	| "editMessageText"
	| "editMessageCaption"
	| "editMessageMedia"
	| "editMessageReplyMarkup"
	| "stopPoll"
	| "deleteMessage";

type UpdateType = typeof import("./runtime-types.ts").updateTypes[number];
type UpdateSubtype = typeof import("./runtime-types.ts").updateSubtypes[number];

type ChatType = import("./runtime-types.ts").ChatType

type MethodResult<T> = import("./runtime-types.ts").MethodResult<T>

type FormField = import("./runtime-types.ts").FormField

type PostExtra = import("./runtime-types.ts").PostExtra


type Callback = import("./runtime-types.ts").Callback

type Rule = import("./runtime-types.ts").Rule



type MetaDataResult = import("./runtime-types.ts").MetaDataResult







