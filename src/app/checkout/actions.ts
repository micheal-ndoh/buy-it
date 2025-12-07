'use server';

import { prisma } from "@/lib/prisma";
import { ShippingAddressSchema } from "@/lib/schemas";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function placeOrder(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        redirect('/api/auth/signin');
    }

    const rawData = {
        fullName: formData.get('fullName'),
        addressLine1: formData.get('addressLine1'),
        addressLine2: formData.get('addressLine2'),
        city: formData.get('city'),
        postalCode: formData.get('postalCode'),
        country: formData.get('country'),
    };

    const validatedFields = ShippingAddressSchema.safeParse(rawData);

    if (!validatedFields.success) {
        redirect('/checkout?error=invalid_fields');
    }

    const userId = session.user.id;

    // Get cart
    const cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: { product: true },
            },
        },
    });

    if (!cart || cart.items.length === 0) {
        redirect('/cart?error=empty');
    }

    // Calculate total
    const total = cart.items.reduce((acc, item) => {
        return acc + (Number(item.product.price) * item.quantity);
    }, 0);

    // Create order
    const order = await prisma.order.create({
        data: {
            userId,
            total,
            status: 'COMPLETED', // Simplified for MVP
            items: {
                create: cart.items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.product.price,
                })),
            },
        },
    });

    // Clear cart
    await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
    });

    redirect(`/orders/${order.id}`);
}
