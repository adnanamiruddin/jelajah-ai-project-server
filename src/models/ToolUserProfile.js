import { formatDate } from "../helpers/helper.js";

class ToolUserProfile {
  constructor(name, instagramURL, youtubeURL, tiktokURL, toolId) {
    this.name = name;
    this.instagramURL = instagramURL;
    this.youtubeURL = youtubeURL;
    this.tiktokURL = tiktokURL;
    this.toolId = toolId;
    this.createdAt = new Date();
  }

  toObject() {
    return {
      name: this.name,
      instagramURL: this.instagramURL,
      youtubeURL: this.youtubeURL,
      tiktokURL: this.tiktokURL,
      toolId: this.toolId,
      createdAt: this.createdAt,
    };
  }

  static getData(doc) {
    const data = doc.data();
    const toolUserProfile = new ToolUserProfile(
      data.name,
      data.instagramURL,
      data.youtubeURL,
      data.tiktokURL,
      data.toolId
    );
    toolUserProfile.id = doc.id;
    toolUserProfile.createdAt = formatDate(data.createdAt);
    return toolUserProfile;
  }
}

export default ToolUserProfile;
