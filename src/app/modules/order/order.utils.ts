/* eslint-disable @typescript-eslint/no-explicit-any */
import Shurjopay from 'shurjopay';
import config from '../../config';

export interface PaymentResponse {
  transactionStatus?: string;
  sp_order_id?: string;
  checkout_url?: string;
  error?: string;
}

const shurjopay = new Shurjopay();

shurjopay.config(
  config.sp_endpoint!,
  config.sp_username!,
  config.sp_password!,
  config.sp_prefix!,
  config.sp_returnUrl!,
);

const makePaymentAsync = async (
  paymentPayload: any,
): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      paymentPayload,
      (response) => resolve(response),
      (error) => reject(error),
    );
  });
};

const verifyPayment = (order_id: string) => {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (response) => resolve(response),
      (err) => reject(err),
    );
  });
};

export const orderUtils = {
  makePaymentAsync,
  verifyPayment,
};
