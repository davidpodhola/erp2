import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

let _moduleRef: ModuleRef = null;

export function getService<TInput = any, TResult = TInput>(typeOrToken: Type<TInput> | string | symbol, options?: {
  strict: boolean;
}): TResult {
  return _moduleRef.get(typeOrToken);
}

@Injectable()
export class ModuleReferenceService {
  constructor(
    moduleRef: ModuleRef
  ) {
    _moduleRef = moduleRef;
  }

}
