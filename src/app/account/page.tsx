import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">My Account</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center gap-4 mb-6">
          {session.user.image && (
            <img src={session.user.image} alt={session.user.name || ''} className="w-16 h-16 rounded-full" />
          )}
          <div>
            <h2 className="text-xl font-semibold">{session.user.name}</h2>
            <p className="text-gray-600">{session.user.email}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/account/orders" className="block p-6 border rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-semibold text-lg mb-2">Order History</h3>
            <p className="text-gray-600">View and track your past orders.</p>
          </Link>
          
          <div className="p-6 border rounded-lg opacity-50 cursor-not-allowed">
            <h3 className="font-semibold text-lg mb-2">Profile Settings</h3>
            <p className="text-gray-600">Manage your personal information (Coming Soon).</p>
          </div>
        </div>
      </div>
    </div>
  );
}
