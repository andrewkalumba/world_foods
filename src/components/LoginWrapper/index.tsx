"use client"

import { useUser } from "@/utils/context"
import Form from "../Form"

const Protection = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser()

  if (!user) return <Form />

  return <>{children}</>
}

export default Protection
