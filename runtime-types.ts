export const updateTypes = [
	"message",
	"edited_message",
	"channel_post",
	"edited_channel_post",
	"inline_query",
	"chosen_inline_result",
	"callback_query",
	"shipping_query",
	"pre_checkout_query",
	"poll",
	"poll_answer",
	// "chat_member",
] as const;

export const updateSubtypes = [
	"text",
	"animation",
	"audio",
	"document",
	"photo",
	"sticker",
	"video",
	"video_note",
	"voice",
	"contact",
	"dice",
	"game",
	"poll",
	"venue",
	"location",
	"new_chat_members",
	"left_chat_member",
	"new_chat_title",
	"new_chat_photo",
	"delete_chat_photo",
	"group_chat_created",
	"supergroup_chat_created",
	"channel_chat_created",
	"message_auto_delete_timer_changed",
	"migrate_to_chat_id",
	"migrate_from_chat_id",
	"pinned_message",
	"invoice",
	"successful_payment",
	"connected_website",
	"passport_data",
	"proximity_alert_triggered",
	"voice_chat_scheduled",
	"voice_chat_started",
	"voice_chat_ended",
	"voice_chat_participants_invited",
] as const


export type ChatType = "private" | "group" | "supergroup" | "channel"


export type MethodResult<T> = {
	result: T;
	ok: boolean;
	description? : string
};

// deno-lint-ignore no-explicit-any
export type FormField = [string, any];


export type PostExtra = {
	files: Record<string, string>;
	fields: string[];
};

export type Callback = (context: import("./context.ts").default, next?: any) => void


export interface Rule {
	type: UpdateType | null;
	subtype: UpdateSubtype | null;
	chatType: ChatType | null
	callbacks: Callback[],
	text?: RegExp | null
}

export interface MetaDataResult{
	updateType : UpdateType,
	updateSubtype : UpdateSubtype,
	chatType : string,
	text : string | null
}