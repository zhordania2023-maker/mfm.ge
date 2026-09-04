import fs from "node:fs";
import path from "node:path";

/**
 * ეძებს მომხმარებლის ლოგოს ფაილს `public/img/`-ში.
 *
 * ► ჩააგდე ფაილი: public/img/logo.svg (ან .png / .jpg / .webp)
 *   და ის ავტომატურად ჩაჯდება ჰედერში, ფუტერში, ბრაუზერის ტაბსა
 *   და ძებნის/სოციალურ პრევიუში. სხვა არაფერია გასაკეთებელი.
 *
 * თუ ფაილი არ არის — გამოიყენება ჩაშენებული ვექტორული ნიშანი.
 */
const EXTS = ["svg", "png", "webp", "jpg", "jpeg"];

function look(base: string): string | null {
  const dir = path.join(process.cwd(), "public", "img");
  for (const ext of EXTS) {
    try {
      if (fs.existsSync(path.join(dir, `${base}.${ext}`))) return `/img/${base}.${ext}`;
    } catch {
      // წვდომის შეცდომა — ვაგრძელებთ სარეზერვო ვარიანტით
    }
  }
  return null;
}

let cachedMain: string | null | undefined;
let cachedLight: string | null | undefined;

/** ძირითადი (მუქი) ლოგო — ღია ფონისთვის */
export function findLogoFile(): string | null {
  if (cachedMain === undefined) cachedMain = look("logo");
  return cachedMain;
}

/** ღია ვერსია — მუქი ფონისთვის (ფუტერი). თუ არ არის, ძირითადი ბრუნდება. */
export function findLogoLightFile(): string | null {
  if (cachedLight === undefined) cachedLight = look("logo-light");
  return cachedLight ?? findLogoFile();
}
