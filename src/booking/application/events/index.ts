import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';

export const EVENT_HANDLERS: Type<IEventHandler>[] = [];
