import { ForbiddenException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CheckPaymentDto } from './dto/CheckPaymentDto';
import { PaymentDto } from './dto/PaymentDto';

@Injectable()
export class PaymentService {
  async checkPayment(checkPaymentDto: CheckPaymentDto) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `https://api.yookassa.ru/v3/payments/${checkPaymentDto.paymentId}`,
        auth: {
          username: '204971',
          password: 'test_dgisbcPctB1RjjKeSBzdIuXJR0IRTFKm6Rdi9eNGZxE',
        },
      });

      return data;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
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
