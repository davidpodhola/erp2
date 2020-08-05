import { LanguageModel } from './language.model';
import { Injectable } from '@nestjs/common';

export const LanguagesServiceKey = 'LanguagesService';

@Injectable()
export class LanguagesService {
  getLanguages: () => Array<LanguageModel>;
}
