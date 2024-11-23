import { Schema, model, connect } from 'mongoose';

export type Bicycle={
    id:string;
    name:string;
    price:number;
    type:string;
    description:string;
    quantity:number;
    inStock:boolean;
}