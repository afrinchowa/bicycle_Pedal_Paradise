import Shurjopay from 'shurjopay';
import config from '../../app/config';
import { response } from 'express';
import { error } from 'console';

const shurjopay = new Shurjopay();

shurjopay.config(
  config.sp.sp_endpoint!,
  config.sp.sp_username!,
  config.sp.sp_password!,
  config.sp.sp_prefix!,
  config.sp.sp_return_url!,
);

console.log(shurjopay)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makePayment = async (paymentPayload:any, res)=>{
  const paymentResult = await shurjopay.makePayment(paymentPayload, (response)=>{
    res.json({
      message: 'Order created successfully',
      success: true,
      data: response,
    })
  }, (error)=>console.log(error));
  console.log(paymentResult);
  return paymentResult;
}

export const orderUtils = {
  makePayment,
};