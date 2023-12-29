import { STRIPE_SECRET } from '$env/static/private';
import Stripe from 'stripe';

export const stripe = new Stripe(STRIPE_SECRET, { apiVersion: '2023-10-16', typescript: true });
