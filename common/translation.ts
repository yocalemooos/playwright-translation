import fs from "fs";

export type language = "en-US" | "fr";

class Translation {
  private language: language;
  private dataSource: Map<language, Record<string, string>>;
  constructor(language: language) {
    this.language = language;
    this.dataSource = new Map();
  }
  public changeLanguage(language: language) {
    this.language = language;
  }
  public async loadDataSource(language: language, url: string) {
    return new Promise((resolve, reject) => {
      fs.readFile(url, { encoding: "utf-8" }, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        try {
          const translations = JSON.parse(data);
          this.dataSource.set(language, translations);
          resolve(translations);
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
    });
  }
  public translate(value: string) {
    const translations = this.dataSource.get(this.language);
    return translations?.[value] || value;
  }
}

export default Translation;
