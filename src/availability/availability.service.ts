import { Injectable } from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@Injectable()
export class AvailabilityService {
  create(createAvailabilityDto: CreateAvailabilityDto) {
    return 'This action adds a new availability';
  }

  findAll() {
    return `This action returns all availability`;
  }

  findOne(id: number) {
    return `This action returns a #${id} availability`;
  }

  update(id: number, updateAvailabilityDto: UpdateAvailabilityDto) {
    return `This action updates a #${id} availability`;
  }

  remove(id: number) {
    return `This action removes a #${id} availability`;
  }
}
