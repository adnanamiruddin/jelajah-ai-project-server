import { formatDate } from "../helpers/helper.js";

class ToolTag {
  constructor(toolId, tagId) {
    this.toolId = toolId;
    this.tagId = tagId;
    this.createdAt = new Date();
  }

  toObject() {
    return {
      toolId: this.toolId,
      tagId: this.tagId,
      createdAt: this.createdAt,
    };
  }

  static getData(doc) {
    const data = doc.data();
    const toolTag = new ToolTag(data.toolId, data.tagId);
    toolTag.id = doc.id;
    toolTag.createdAt = formatDate(data.createdAt);
    return toolTag;
  }
}

export default ToolTag;
