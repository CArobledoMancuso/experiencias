import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { EventsService } from '../events/events.service';
@Module({
  imports: [PrismaModule],
  controllers: [BookingController],
  providers: [BookingService, EventsService],
  exports: [BookingService],
})
export class BookingModule {}
