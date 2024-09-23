"use client"

import { getUser } from "@/api/user";
import { If } from "@/components/If";
import { ProfileDialog } from "@/components/ProfileDialog";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";

export function ProfileHeader() {

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  })

  return (
    <section className="py-16">
      <div className="flex items-center justify-between py-4 w-full">
        <section className="text-gray-200 flex text-xl font-jetbrains">
          <div className="flex gap-3 items-center">
            <h2>
              <If condition={isLoading}>
                <div className="w-6 h-6 border-2 border-white border-t-blue-500 animate-spin rounded-full"></div>
              </If>

              <If condition={!isLoading}>
                {user?.name}
              </If>
            </h2>
          </div>
        </section>
        <section>
          <ProfileDialog />
        </section>
      </div>
      <Separator className="bg-grayDark" />
    </section>
  );
}