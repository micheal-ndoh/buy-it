'use server';

import { prisma } from "@/lib/prisma";
import { AddToCartSchema } from "@/lib/schemas";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addToCart(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        // For now, redirect to login if not authenticated
        // In a real app, we might support guest carts
        redirect('/api/auth/signin');
    }

    const rawData = {
        productId: formData.get('productId'),
        quantity: Number(formData.get('quantity')),
    };

    const validatedFields = AddToCartSchema.safeParse(rawData);

    if (!validatedFields.success) {
        redirect('/products/' + rawData.productId + '?error=invalid_fields');
    }

    const { productId, quantity } = validatedFields.data;

    const userId = session.user.id;

    // Find or create cart
    let cart = await prisma.cart.findUnique({
        where: { userId },
    });

    if (!cart) {
        cart = await prisma.cart.create({
            data: { userId },
        });
    }

    // Check if item exists in cart
    const existingItem = await prisma.cartItem.findFirst({
        where: {
            cartId: cart.id,
            productId,
        },
    });

    if (existingItem) {
        await prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + quantity },
        });
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                quantity,
            },
        });
    }

    revalidatePath('/cart');
    redirect('/cart');
}
