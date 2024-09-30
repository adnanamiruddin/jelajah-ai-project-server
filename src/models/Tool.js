import { formatDate } from "../helpers/helper.js";

class Tool {
  constructor(name, description, link, videoURL, imageURL, status) {
    this.name = name;
    this.description = description;
    this.link = link;
    this.videoURL = videoURL;
    this.imageURL = imageURL;
    this.status = status; // pending, approved, rejected
    this.createdAt = new Date();
  }

  toObject() {
    return {
      name: this.name,
      description: this.description,
      link: this.link,
      videoURL: this.videoURL,
      imageURL: this.imageURL,
      status: this.status,
      createdAt: this.createdAt,
    };
  }

  static getData(doc) {
    const data = doc.data();
    const tool = new Tool(
      data.name,
      data.description,
      data.link,
      data.videoURL,
      data.imageURL,
      data.status
    );
    tool.id = doc.id;
    tool.createdAt = formatDate(data.createdAt);
    return tool;
  }
}

export default Tool;
