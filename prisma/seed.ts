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
            image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&q=80',
            stock: 40,
        },
        {
            name: 'Wireless Gaming Mouse',
            description: 'Precision gaming mouse with customizable DPI settings and ergonomic design. Perfect for competitive gaming.',
            price: 79.99,
            image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80',
            stock: 75,
        },
        {
            name: 'Portable Bluetooth Speaker',
            description: 'Compact and powerful Bluetooth speaker with 360-degree sound and waterproof design. Great for outdoor activities.',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
            stock: 60,
        },
        {
            name: 'Fitness Tracker Band',
            description: 'Advanced fitness tracker with heart rate monitoring, GPS, and sleep tracking. Water-resistant up to 50 meters.',
            price: 149.99,
            image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80',
            stock: 45,
        },
        {
            name: '4K Webcam for Streaming',
            description: 'Professional-grade webcam with 4K resolution, auto-focus, and built-in microphone. Perfect for content creators.',
            price: 199.99,
            image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&q=80',
            stock: 35,
        },
        {
            name: 'Ergonomic Office Chair',
            description: 'Premium ergonomic office chair with lumbar support and adjustable height. Designed for long work sessions.',
            price: 349.99,
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&q=80',
            stock: 20,
        },
        {
            name: 'Smart Home Hub',
            description: 'Control all your smart home devices from one central hub. Voice-activated and compatible with major platforms.',
            price: 129.99,
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
            stock: 55,
        },
        {
            name: 'Wireless Charging Pad',
            description: 'Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicators.',
            price: 39.99,
            image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&q=80',
            stock: 90,
        },
        {
            name: 'Noise-Cancelling Earbuds',
            description: 'Compact in-ear headphones with active noise cancellation and premium sound quality. Perfect for travel.',
            price: 179.99,
            image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
            stock: 70,
        },
        {
            name: 'Digital Drawing Tablet',
            description: 'Professional digital drawing tablet with pressure sensitivity and battery-free stylus. Perfect for artists.',
            price: 249.99,
            image: 'https://images.unsplash.com/photo-1609921141835-710b7fa6e438?w=500&q=80',
            stock: 30,
        },
        {
            name: 'Portable Power Bank',
            description: 'High-capacity power bank with fast charging and multiple USB ports. Keep your devices charged on the go.',
            price: 49.99,
            image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&q=80',
            stock: 85,
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
