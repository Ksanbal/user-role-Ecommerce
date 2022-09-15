import { SetMetadata } from '@nestjs/common';

export const Staff = (isStaff: boolean) => SetMetadata('staff', isStaff);
