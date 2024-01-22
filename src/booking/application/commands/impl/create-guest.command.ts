import { CreateGuestDto } from '../../dtos/guest.dto';

export class CreateGuestCommand {
  constructor(public readonly createGuestRequest: CreateGuestDto) {}
}
