import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

export const COMMAND_HANDLERS: Type<ICommandHandler>[] = [];
