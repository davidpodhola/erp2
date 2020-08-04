import { LanguageModel } from './language.model';

export const LanguagesServiceKey = 'LanguagesService';

export class LanguagesService {
  getLanguages: () => Array<LanguageModel>;
}
