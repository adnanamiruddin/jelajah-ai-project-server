import { formatDate } from "../helpers/helper.js";

class Tag {
  constructor(name) {
    this.name = name;
    this.createdAt = new Date();
  }

  toObject() {
    return {
      name: this.name,
      createdAt: this.createdAt,
    };
  }

  static getData(doc) {
    const data = doc.data();
    const tag = new Tag(data.name);
    tag.id = doc.id;
    tag.createdAt = formatDate(data.createdAt);
    return tag;
  }
}

export default Tag;
