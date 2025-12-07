import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
    const products = [
        {
            name: 'Premium Wireless Headphones',
            description: 'Experience crystal clear sound with our premium wireless headphones. Features active noise cancellation and 30-hour battery life.',
            price: 299.99,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
            stock: 50,
        },
        {
            name: 'Smart Watch Series 5',
            description: 'Stay connected and healthy with the latest Smart Watch. Tracks heart rate, sleep, and workouts.',
            price: 399.99,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
            stock: 30,
        },
        {
            name: 'Professional Camera Kit',
            description: 'Capture life\'s moments in stunning detail with this professional camera kit. Includes 2 lenses and a carrying case.',
            price: 1299.99,
            image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
            stock: 15,
        },
        {
            name: 'Designer Sunglasses',
            description: 'Protect your eyes in style with these designer sunglasses. UV400 protection.',
            price: 159.99,
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
            stock: 100,
        },
        {
            name: 'Leather Weekend Bag',
            description: 'Handcrafted leather bag perfect for weekend getaways. Durable and stylish.',
            price: 249.99,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
            stock: 25,
        },
        {
            name: 'Mechanical Keyboard',
            description: 'Tactile and responsive mechanical keyboard for the ultimate typing experience. RGB backlighting.',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=500&q=80',
            stock: 40,
        },
    ];

    for (const product of products) {
        await prisma.product.create({
            data: product,
        });
    }

    console.log('Seed data inserted successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
