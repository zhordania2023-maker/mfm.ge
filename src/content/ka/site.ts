import type { Site, Stat } from "../types";

export const site: Site = {
  name: "MFM საქართველო",
  nameFull: "დედა-ნაყოფის მედიცინის საზოგადოება — საქართველო",
  nameEn: "Society for Maternal-Fetal Medicine — Georgia",
  short: "MFM",
  logo: { line1: "დედა-ნაყოფის მედიცინის", line2: "საზოგადოება" },
  tagline: "ზრუნვა, განათლება და პროფესიული სტანდარტი დედისა და ნაყოფის მედიცინაში",
  description:
    "MFM საქართველო აერთიანებს პერინატოლოგებს, მეან-გინეკოლოგებსა და ნეონატოლოგებს — მაღალი რისკის ორსულობის მართვის სტანდარტების, კვლევისა და უწყვეტი განათლების განსავითარებლად.",
  url: "https://mfm.ge",
  founded: 2009,
  email: "info@mfm.ge",
  emailMembership: "members@mfm.ge",
  emailPress: "press@mfm.ge",
  phone: "+995 (32) 2 45 67 89",
  phoneHref: "+995322456789",
  address: {
    street: "ვაჟა-ფშაველას გამზირი 76",
    city: "თბილისი",
    zip: "0186",
    country: "საქართველო",
  },
  hours: "ორშაბათი – პარასკევი, 10:00 – 18:00",
  socials: [
    { name: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { name: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { name: "YouTube", href: "https://youtube.com", icon: "youtube" },
    { name: "X", href: "https://x.com", icon: "x" },
  ],
};

export const stats: Stat[] = [
  { value: "15+", label: "წლიანი გამოცდილება", note: "დაარსდა 2009 წელს" },
  { value: "480+", label: "აქტიური წევრი", note: "საქართველოს მასშტაბით" },
  { value: "62", label: "კლინიკური გაიდლაინი", note: "ქართულ ენაზე" },
  { value: "24", label: "პარტნიორი კლინიკა", note: "9 რეგიონში" },
];

export const impact: Stat[] = [
  {
    value: "1 200+",
    label: "გადამზადებული სპეციალისტი",
    note: "უწყვეტი სამედიცინო განათლების პროგრამებში",
  },
  {
    value: "38",
    label: "სამეცნიერო პუბლიკაცია",
    note: "საერთაშორისო რეცენზირებად ჟურნალებში",
  },
  {
    value: "9",
    label: "რეგიონული ცენტრი",
    note: "მაღალი რისკის ორსულობის კონსულტაციისთვის",
  },
  {
    value: "100%",
    label: "ღია წვდომა",
    note: "ყველა გაიდლაინი უფასოა",
  },
];
