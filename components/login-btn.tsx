/* eslint-disable @next/next/no-img-element */
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { User } from 'lucide-react';

const img1 = 'https://www.rd.com/wp-content/uploads/2020/02/GettyImages-187514202-1.jpg'

export default function Component() {
  const { data: session } = useSession();

  if (session) {
    console.log(session.user);
    return (
      <div className="flex items-center space-x-3">
        {session.user.image ?
          (<img
            className="w-12 h-12 rounded-full"
            src={session.user.image}
            alt="avator"
          />) :
          (<User />)
        }
        <Link href="/me" legacyBehavior>
          <a className="text-blue-600 font-medium">{session.user.name}</a>
        </Link>
        <button
          className="px-3 py-2 bg-blue-500 text-white rounded"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    );
  }
  return (
    <button
      className="px-3 py-2 bg-blue-500 text-white rounded"
      onClick={() => signIn()}
    >
      Login
    </button>
  );
}
