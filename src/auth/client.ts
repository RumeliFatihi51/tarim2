import defaults from "../config/supabase-public.json";
import type { SupabaseClient } from "@supabase/supabase-js";
const supplied = import.meta.env || (typeof process!=="undefined" ? process.env : {});
const env={VITE_SUPABASE_URL:supplied.VITE_SUPABASE_URL||defaults.url,VITE_SUPABASE_PUBLISHABLE_KEY:supplied.VITE_SUPABASE_PUBLISHABLE_KEY||defaults.publishableKey};
let pending: Promise<SupabaseClient> | undefined;
export function configured(){return Boolean(env.VITE_SUPABASE_URL && env.VITE_SUPABASE_PUBLISHABLE_KEY)}
export function authClient(){
 if(!configured())return Promise.reject(new Error('AUTH_NOT_CONFIGURED'));
 return pending??=import('@supabase/supabase-js').then(({createClient})=>createClient(env.VITE_SUPABASE_URL,env.VITE_SUPABASE_PUBLISHABLE_KEY,{auth:{flowType:'pkce',persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}));
}
export function callbackUrl(base:string,mode:string){return new URL(base+'hesap/?islem='+encodeURIComponent(mode),location.origin).href}
