/**
 * @this Bear
 */
export class Bear {
  constructor(obj) {
    this.name = null;
    this.avg_color = obj.avg_color;
    this.height = obj.height;
    this.id = obj.id;
    this.liked = obj.liked;
    this.photographer = obj.photographer;
    this.photographer_id = obj.photographer_id;
    this.photographer_url = obj.photographer_url;
    this.src = obj.src && new BearSrc(obj.src);
    this.type = obj.type;
    this.url = obj.url;
    this.width = obj.width;
  }

  setName(name) {
    this.name = name;
  }

  setType(type) {
    this.type = type;
  }

  getSrcByDimensions() {
    if (!this.src) {
      return null;
    }
    return this.width > this.height ? this.src.landscape : this.src.portrait;
  }

  isPaddington() {
    return this.name === "Paddington" && this.type === "christmas";
  }
}

/**
 * @this BearSrc
 */
class BearSrc {
  constructor(obj) {
    this.landscape = obj.landscape;
    this.large = obj.large;
    this.large2x = obj.large2x;
    this.medium = obj.medium;
    this.original = obj.original;
    this.portrait = obj.portrait;
    this.small = obj.small;
    this.tiny = obj.tiny;
  }
}
