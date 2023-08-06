import { Body, Controller, Post, Get } from '@nestjs/common';
import { MenuService } from '../services/menu.service';
import { CreateBookingDto } from '../../application/dtos/booking.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('/')
  findAll() {
    return this.menuService.findAll();
  }

  @Post()
  create(@Body() payload: CreateBookingDto) {
    return this.menuService.createPizza(payload);
  }
}
