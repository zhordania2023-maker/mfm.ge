import type { ContentBundle } from "../types";
import { site, stats, impact } from "./site";
import { mainNav, footerNav } from "./nav";
import { news, newsCategories } from "./news";
import { events, eventTypes } from "./events";
import { guidelines, guidelineTopics, guidelineTypes } from "./guidelines";
import { specialists, cities, subspecialties, languages } from "./specialists";
import { board, staff, committees, partners } from "./people";
import { courses, cases } from "./education";
import { faq, patientResources, patientRights, highRiskFactors } from "./patients";
import { tiers, memberBenefits, joinSteps } from "./membership";

export const en: ContentBundle = {
  site,
  stats,
  impact,
  mainNav,
  footerNav,
  news,
  newsCategories,
  events,
  eventTypes,
  guidelines,
  guidelineTopics,
  guidelineTypes,
  specialists,
  cities,
  subspecialties,
  languages,
  board,
  staff,
  committees,
  partners,
  courses,
  cases,
  faq,
  patientResources,
  patientRights,
  highRiskFactors,
  tiers,
  memberBenefits,
  joinSteps,
};
