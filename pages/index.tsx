import { Avatar, Typography } from "@mui/material";
import { Notifications } from "@prisma/client";
import { GetServerSideProps } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import Faq from "../components/Faq";
import NotificationList from "../components/Notifications";
import prisma from "../lib/prisma";
import { authOptions } from './api/auth/[...nextauth].js'

interface NotificationProps {
  notifications: [Notifications]
}

export default function Home({ notifications }: NotificationProps) {
  console.log(notifications)
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="max-w-4xl mx-auto"> {/* Main Container */}
        <div className="flex flex-col items-center justify-center space-y-6 md:space-y-2 my-14">
          <Avatar alt="User image" src={session?.user?.image as string} className="w-24 h-24 object-cover shadow-md shadow-blue-700 drop-shadow-lg ring-2 ring-blue-500" />
          <Typography variant="h4">Velkommen, <span className="text-blue-500">{session?.user?.name}</span>!</Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
          <Faq />
          <NotificationList notifications={notifications} />
        </div>

      </div>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn().then(test => console.log(test)).catch(error => console.error(error))}>Sign in</button>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  //TODO: Have some checking for the userID:session?.user?.id

  const notifications = await prisma.notifications.findMany({
    where: { userId: session?.user?.id as string }
  })

  return {
    props: {
      notifications,
    }
  }
};
