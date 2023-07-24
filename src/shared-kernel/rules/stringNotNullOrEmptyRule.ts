import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { iBusinessRule } from '../core/iBusinessRule';

export const StringNotNullOrEmpty = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const value = request.body?.value;

    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new Error('String cannot be null or empty.');
    }

    return value;
  },
);
