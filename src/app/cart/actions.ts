'use server';

import { prisma } from "@/lib/prisma";
import { UpdateCartItemSchema, RemoveCartItemSchema } from "@/lib/schemas";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateCartItem(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return;

    const rawData = {
        itemId: formData.get('itemId'),
        quantity: Number(formData.get('quantity')),
    };

    const validatedFields = UpdateCartItemSchema.safeParse(rawData);

    if (!validatedFields.success) return;

    const { itemId, quantity } = validatedFields.data;

    // Verify ownership
    const cartItem = await prisma.cartItem.findUnique({
        where: { id: itemId },
        include: { cart: true },
    });

    if (!cartItem || cartItem.cart.userId !== session.user.id) return;

    await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity },
    });

    revalidatePath('/cart');
}

export async function removeCartItem(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) return;

    const rawData = {
        itemId: formData.get('itemId'),
    };

    const validatedFields = RemoveCartItemSchema.safeParse(rawData);

    if (!validatedFields.success) return;

    const { itemId } = validatedFields.data;

    // Verify ownership
    const cartItem = await prisma.cartItem.findUnique({
        where: { id: itemId },
        include: { cart: true },
    });

    if (!cartItem || cartItem.cart.userId !== session.user.id) return;

    await prisma.cartItem.delete({
        where: { id: itemId },
    });

    revalidatePath('/cart');
}
