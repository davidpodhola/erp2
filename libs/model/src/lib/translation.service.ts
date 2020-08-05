import { LanguageModel } from './language.model';
import { LocalizedMessages } from './localized.messages';
import { Injectable } from '@nestjs/common';

export const TranslationServiceKey = 'TranslationService';

@Injectable()
export class TranslationService {
  getMessages: (language: LanguageModel) => LocalizedMessages;
}
