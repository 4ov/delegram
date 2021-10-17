/// <reference path="./defs.d.ts" />
/// <reference path="./types.d.ts" />
import urlCat from "https://esm.sh/urlcat";
import { createForm } from "./utils/major.ts";

class Core {
	private get url() {
		return `https://api.telegram.org/bot${this.token}`;
	}

	constructor(private token: string) {}

	private async Get(method: Methods, config: Record<string, any> = {}) {
		const conf = Object.entries(config).map(([key, value]) => {
			if (typeof value == "object") {
				return [key, JSON.stringify(value)];
			} else {
				return [key, value];
			}
		});
		const destUrl = urlCat(this.url, method, Object.fromEntries(conf));

		const response = await fetch(destUrl);
		// deno-lint-ignore no-explicit-any
		const json = await response.json() as MethodResult<any>;
		if (response.status === 200 || json.ok === true) {
			return json.result;
		} else {
			//!--
			throw new Error(json.description)

		}
	}

	private Post(
		method: Methods,
		config: Record<string, any> = {},
		extra: PostExtra,
	): Promise<any> {
		return new Promise((resolve, reject) => {
			const destUrl = urlCat(this.url, method);
			const body = createForm(Object.entries(config), extra);
			fetch(destUrl, {
				method: "POST",
				headers: {
					"connection": "keep-alive",
				},
				body,
			})
				.then(async (response) => {
					const json = await response.json() as MethodResult<any>;
					if (response.ok === true) {
						resolve(json.result);
					} else {
						throw new Error(json.description)
					}
				})
				.catch(err=>{
					throw new Error(err)
				});
		});
	}

	//! GET methods
	async getMe() {
		return await this.Get("getMe");
	}
	
    async getUpdates(config: GetUpdates) : Promise<Update[]> {
		return await this.Get("getUpdates", config);
	}
    
    async setWebhook(config: SetWebhook): Promise<true>  {
		return await this.Get("setWebhook", config);
	}
    
    async deleteWebhook(config: DeleteWebhook) {
		return await this.Get("deleteWebhook", config);
	}
    
    async getWebhookInfo(config: any) {
        //? no types found
		return await this.Get("getWebhookInfo", config);
	}

	async sendMessage(config: SendMessage): Promise<Message> {
		return await this.Get("sendMessage", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async forwardMessage(config: ForwardMessage): Promise<Message> {
		return await this.Get("forwardMessage", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async copyMessage(config: CopyMessage): Promise<MessageId> {
		return await this.Get("copyMessage", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async sendLocation(config: SendLocation): Promise<Message> {
		return await this.Get("sendLocation", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async stopMessageLiveLocation(
		config: StopMessageLiveLocation,
	): Promise<Message | true> {
		return await this.Get("stopMessageLiveLocation", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async editMessageLiveLocation(
		config: EditMessageLiveLocation,
	): Promise<Message | true> {
		return await this.Get("editMessageLiveLocation", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async sendVenue(config: SendVenue): Promise<Message> {
		return await this.Get("sendVenue", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async sendContact(config: SendContact): Promise<Message> {
		return await this.Get("sendContact", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async sendPoll(config: SendPoll): Promise<Message> {
		return await this.Get("sendPoll", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async sendDice(config: SendDice): Promise<Message> {
		return await this.Get("sendDice", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async sendChatAction(config: SendChatAction): Promise<true> {
		return await this.Get("sendChatAction", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async getUserProfilePhotos(
		config: GetUserProfilePhotos,
	): Promise<UserProfilePhotos> {
		return await this.Get("getUserProfilePhotos", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async getFile(config: GetFile): Promise<File> {
		return await this.Get("getFile", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async kickChatMember(config: KickChatMember): Promise<true> {
		return await this.Get("kickChatMember", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async unbanChatMember(config: UnbanChatMember): Promise<true> {
		return await this.Get("unbanChatMember", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async restrictChatMember(config: RestrictChatMember): Promise<true> {
		return await this.Get("restrictChatMember", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async promoteChatMember(config: PromoteChatMember): Promise<true> {
		return await this.Get("promoteChatMember", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async setChatAdministratorCustomTitle(
		config: SetChatAdministratorCustomTitle,
	): Promise<true> {
		return await this.Get("setChatAdministratorCustomTitle", config).catch((
			err,
		) => Promise.reject(err));
	}

	async setChatPermissions(config: SetChatPermissions): Promise<true> {
		return await this.Get("setChatPermissions", config).catch((err) =>
			Promise.reject(err)
		);
	}

	exportChatInviteLink(config: any): Promise<true> {
		throw new Error("Unimplemented");
	}

	createChatInviteLink(config: any): Promise<true> {
		throw new Error("Unimplemented");
	}

	editChatInviteLink(config: any): Promise<true> {
		throw new Error("Unimplemented");
	}

	revokeChatInviteLink(config: any): Promise<true> {
		throw new Error("Unimplemented");
	}

	async deleteChatPhoto(config: DeleteChatPhoto): Promise<true> {
		return await this.Get("deleteChatPhoto", config).catch((err) =>
			Promise.reject(err)
		);
	}
	
    async setChatPhoto(config: SetChatPhoto): Promise<true> {
		return await this.Get("setChatPhoto", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async setChatTitle(config: SetChatTitle): Promise<true> {
		return await this.Get("setChatTitle", config).catch((err) =>
			Promise.reject(err)
		);
	}

	async setChatDescription(config: SetChatDescription): Promise<true> {
		return await this.Get("setChatDescription", config).catch((err) =>
			Promise.reject(err)
		);
	}
	
    async pinChatMessage(config: PinChatMessage): Promise<true> {
		return await this.Get("pinChatMessage", config).catch((err) =>
			Promise.reject(err)
		);
	}
    async unpinChatMessage(config: UnpinChatMessage): Promise<true> {
		return await this.Get("unpinChatMessage", config).catch((err) =>
			Promise.reject(err)
		);
	}
    
    async unpinAllChatMessages(config: UnpinAllChatMessages): Promise<true> {
		return await this.Get("unpinAllChatMessages", config).catch((err) =>
			Promise.reject(err)
		);
	}

    async leaveChat(config: LeaveChat): Promise<true> {
		return await this.Get("leaveChat", config).catch((err) =>
			Promise.reject(err)
		);
	}

    async getChat(config: GetChat): Promise<Chat> {
		return await this.Get("getChat", config).catch((err) =>
			Promise.reject(err)
		);
	}
    
    async getChatAdministrators(config: GetChatAdministrators): Promise<ChatMember[]> {
		return await this.Get("getChatAdministrators", config).catch((err) =>
			Promise.reject(err)
		);
	}
   
    async getChatMemberCount(config: GetChatMembersCount): Promise<number> {
		return await this.Get("getChatMemberCount", config).catch((err) =>
			Promise.reject(err)
		);
	}
    
    async getChatMember(config: GetChatMember): Promise<ChatMember> {
		return await this.Get("getChatMember", config).catch((err) =>
			Promise.reject(err)
		);
	}
    
    async setChatStickerSet(config: SetChatStickerSet): Promise<true> {
		return await this.Get("setChatStickerSet", config).catch((err) =>
			Promise.reject(err)
		);
	}
   
    async deleteChatStickerSet(config: DeleteChatStickerSet): Promise<true> {
		return await this.Get("deleteChatStickerSet", config).catch((err) =>
			Promise.reject(err)
		);
	}
    
    async answerCallbackQuery(config: AnswerCallbackQuery): Promise<true> {
		return await this.Get("answerCallbackQuery", config).catch((err) =>
			Promise.reject(err)
		);
	}
    
    async setMyCommands(config: SetMyCommands): Promise<true> {
		return await this.Get("setMyCommands", config).catch((err) =>
			Promise.reject(err)
		);
	}
    
    async deleteMyCommands(config: any): Promise<true> {
        //? no types found
		return await this.Get("deleteMyCommands", config).catch((err) =>
			Promise.reject(err)
		);
	}
   
    async getMyCommands(config: any): Promise<true> {
        //? no types found
		return await this.Get("getMyCommands", config).catch((err) =>
			Promise.reject(err)
		);
	}
    
    async editMessageText(config: EditMessageText): Promise<Message | true> {
        //? no types found
		return await this.Get("editMessageText", config).catch((err) =>
			Promise.reject(err)
		);
	}
    
    async editMessageCaption(config: EditMessageCaption): Promise<Message | true> {
        //? no types found
		return await this.Get("editMessageCaption", config).catch((err) =>
			Promise.reject(err)
		);
	}
    
    editMessageMedia(config: EditMessageMedia): Promise<true> {
        throw new Error("Unimplemented");

	}

    async editMessageReplyMarkup(config: EditMessageReplyMarkup): Promise<Message | true> {
        //? no types found
		return await this.Get("editMessageReplyMarkup", config).catch((err) =>
			Promise.reject(err)
		);
	}
    
    async stopPoll(config: StopPoll): Promise<Message | true> {
        //? no types found
		return await this.Get("stopPoll", config).catch((err) =>
			Promise.reject(err)
		);
	}
    
    async deleteMessage(config: DeleteMessage): Promise<Message | true> {
        //? no types found
		return await this.Get("deleteMessage", config).catch((err) =>
			Promise.reject(err)
		);
	}

	//! POST methods

	async sendPhoto(
		config: SendPhoto,
		files: Record<string, string>,
	): Promise<Message> {
		return await this.Post("sendPhoto", config, {
			files,
			fields: ["photo"],
		}).catch((err) => Promise.reject(err));
	}

	async sendAudio(
		config: SendAudio,
		files: Record<string, string>,
	): Promise<Message> {
		return await this.Post("sendAudio", config, {
			files,
			fields: ["audio", "thumb"],
		}).catch((err) => Promise.reject(err));
	}

	async sendDocument(
		config: SendDocument,
		files: Record<string, string>,
	): Promise<Message> {
		return await this.Post("sendDocument", config, {
			files,
			fields: ["document", "thumb"],
		}).catch((err) => Promise.reject(err));
	}

	async sendVideo(
		config: SendVideo,
		files: Record<string, string>,
	): Promise<Message> {
		return await this.Post("sendVideo", config, {
			files,
			fields: ["video"],
		}).catch((err) => Promise.reject(err));
	}

	async sendAnimation(
		config: SendAnimation,
		files: Record<string, string>,
	): Promise<Message> {
		return await this.Post("sendAnimation", config, {
			files,
			fields: ["animation", "thumb"],
		}).catch((err) => Promise.reject(err));
	}

	async sendVoice(
		config: SendVoice,
		files: Record<string, string>,
	): Promise<Message> {
		return await this.Post("sendVoice", config, {
			files,
			fields: ["voice"],
		}).catch((err) => Promise.reject(err));
	}

	async sendVideoNote(
		config: SendVideoNote,
		files: Record<string, string>,
	): Promise<Message> {
		return await this.Post("sendVideoNote", config, {
			files,
			fields: ["video_note", "thumb"],
		}).catch((err) => Promise.reject(err));
	}

	sendMediaGroup(
		_config: SendMediaGroup,
		_files: Record<string, string>,
	): Promise<Message> {
		//! TODO
		throw new Error("Unimplemented");
	}
}


export default Core