import { z } from 'zod';

export const AddToCartSchema = z.object({
    productId: z.string(),
    quantity: z.number().int().min(1),
});

export const UpdateCartItemSchema = z.object({
    itemId: z.string(),
    quantity: z.number().int().min(1),
});

export const RemoveCartItemSchema = z.object({
    itemId: z.string(),
});

export const ShippingAddressSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    addressLine1: z.string().min(1, "Address line 1 is required"),
    addressLine2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
});
