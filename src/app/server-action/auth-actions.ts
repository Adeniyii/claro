"use server";

import { z } from "zod";
import { LoginFormSchema } from "@/lib/types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function loginAction({
  email,
  password,
}: z.infer<typeof LoginFormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signupAction({
  email,
  password,
}: z.infer<typeof LoginFormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });
  const {data} = await supabase.from('profiles').select('id').eq('email', email);
  if (data && data.length > 0) {
    return {error: {message: 'User already exists', data}}
  }
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  });
}
