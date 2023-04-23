import { ForbiddenException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { PaymentDto } from './dto/PaymentDto';

@Injectable()
export class PaymentService {
  async makePayment(makePaymentDto: PaymentDto) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: 'https://api.yookassa.ru/v3/payments',
        headers: {
          'Content-Type': 'application/json',
          'Idempotence-Key': Date.now(),
        },
        auth: {
          username: '312599',
          password: 'test_qq0qpFd7a7eM1jwi-4yQIvZ6E4E850p97boTglBgPzU',
        },
        data: {
          amount: {
            value: makePaymentDto.amount,
            currency: 'RUB',
          },
          capture: true,
          confirmation: {
            type: 'redirect',
            return_url: 'http://localhost:3001/order',
          },
          description: 'Заказ №1',
        },
      });

      return data;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
