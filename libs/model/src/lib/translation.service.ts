import { LanguageModel } from './language.model';
import { LocalizedMessages } from './localized.messages';

export const TranslationServiceKey = 'TranslationService';

export class TranslationService {
  getMessages: (language: LanguageModel) => LocalizedMessages;
}
