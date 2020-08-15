import { Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

export function getService<TInput = any, TResult = TInput>(
  typeOrToken: Type<TInput> | string | symbol,
  options?: {
    strict: boolean;
  }
): TResult {
  return (global as any).moduleRef.get(typeOrToken);
}

export class ModuleReferenceService {
  constructor(moduleRef: ModuleRef) {
    (global as any).moduleRef = moduleRef;
  }
}
