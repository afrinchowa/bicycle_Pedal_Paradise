/* eslint-disable @typescript-eslint/no-explicit-any */
import Shurjopay from 'shurjopay';
import config from '../../config';
// import config from '../../app/config';
const shurjopay = new Shurjopay();

shurjopay.config(
  config.sp_endpoint!,
  config.sp_username!,
  config.sp_password!,
  config.sp_prefix!,
  config.sp_returnUrl!,
);
// console.log(shurjopay);
// const makePayment = async (paymentPayload: any) => {
//   return new Promise((resolve, reject) => {
//     shurjopay.makePayment(
//       paymentPayload,
//       (response) => resolve(response),
//       (err) => reject(err),
//     );
//   });
// };

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
