import { useEffect, useRef, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { authClient, configured, callbackUrl } from "./client";
const modes=['giris','kayit','dogrula','unuttum','sifirla','profil'] as const;
type Mode=typeof modes[number];
const labels:Record<Mode,string>={giris:'Yeniden hoş geldin.',kayit:'Yeni bir bakış aç.',dogrula:'E-postanı doğrula.',unuttum:'Erişimini yenile.',sifirla:'Yeni şifreni belirle.',profil:'Gözlemin başlangıç noktası.'};
export default function AuthForms({base}:{base:string}){
 const [mode,setMode]=useState<Mode>('giris'),[user,setUser]=useState<User|null>(null),[busy,setBusy]=useState(false),[ready,setReady]=useState(false),[status,setStatus]=useState(''),[error,setError]=useState('');
 const heading=useRef<HTMLHeadingElement>(null);
 const move=(m:Mode)=>{setMode(m);setStatus('');setError('');history.replaceState(null,'',base+'hesap/?islem='+m);requestAnimationFrame(()=>heading.current?.focus())};
 useEffect(()=>{if(new URLSearchParams(location.search).has('error')||new URLSearchParams(location.hash.slice(1)).has('error'))setError('Bağlantı doğrulanamadı. Yeni bağlantı iste veya hesabınla giriş yap.');const m=new URLSearchParams(location.search).get('islem');if(modes.includes(m as Mode))setMode(m as Mode);let alive=true;let unsubscribe:undefined|(()=>void);
 if(!configured()){setReady(true);return}
 authClient().then(async c=>{if(!alive)return;const {data:{subscription}}=c.auth.onAuthStateChange((event)=>{if(event==='PASSWORD_RECOVERY'&&alive)setMode('sifirla');setTimeout(()=>{if(!alive)return;void c.auth.getUser().then(({data})=>{if(alive)setUser(data.user)})},0)});unsubscribe=()=>subscription.unsubscribe();const {data}=await c.auth.getUser();if(alive){setUser(data.user);if(data.user&&!m)setMode('profil');setReady(true)}}).catch(()=>{if(alive){setError('Hesap hizmetine şu anda bağlanılamıyor.');setReady(true)}});
 return()=>{alive=false;unsubscribe?.()};},[]);
 const submit=async(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();if(busy||!configured())return;const data=new FormData(e.currentTarget);const email=String(data.get('email')||'').trim(),password=String(data.get('password')||'');setBusy(true);setError('');setStatus('');try{const c=await authClient();
 if(mode==='giris'){const r=await c.auth.signInWithPassword({email,password});if(r.error)throw r.error;const verified=await c.auth.getUser();if(!verified.data.user)throw new Error('No valid user');setUser(verified.data.user);move('profil')}
 else if(mode==='kayit'){const r=await c.auth.signUp({email,password,options:{emailRedirectTo:callbackUrl(base,'dogrula'),data:{display_name:String(data.get('name')||'').trim()}}});if(r.error)throw r.error;move('dogrula');setStatus('Doğrulama gerektiren bir kayıt kabul edildiyse e-posta gönderilir. Gelen kutunu ve spam klasörünü kontrol et.')}
 else if(mode==='unuttum'){const r=await c.auth.resetPasswordForEmail(email,{redirectTo:callbackUrl(base,'sifirla')});if(r.error)throw r.error;setStatus('Uygun bir hesap varsa şifre yenileme bağlantısı gönderilir. E-postanı kontrol et.')}
 else if(mode==='sifirla'){const verify=await c.auth.getUser();if(!verify.data.user)throw new Error('Unauthorized');const r=await c.auth.updateUser({password});if(r.error)throw r.error;setStatus('Şifren güncellendi.');setUser(r.data.user);setMode('profil')}
 else if(mode==='profil'){const verify=await c.auth.getUser();if(!verify.data.user)throw new Error('Unauthorized');const r=await c.auth.updateUser({data:{display_name:String(data.get('name')||'').trim()}});if(r.error)throw r.error;setUser(r.data.user);setStatus('Profil bilgilerin kaydedildi.')}
 else {const r=await c.auth.resend({type:'signup',email,options:{emailRedirectTo:callbackUrl(base,'dogrula')}});if(r.error)throw r.error;setStatus('Uygun bir kayıt varsa doğrulama bağlantısı yeniden gönderilir.')}
 }catch{setError(mode==='giris'?'Oturum açılamadı. Bilgilerini, e-posta doğrulamasını ve bağlantını kontrol et.':'İşlem tamamlanamadı. Bağlantını ve bilgilerini kontrol ederek tekrar dene.')}finally{setBusy(false)}};
 const logout=async()=>{setBusy(true);setError('');try{const c=await authClient();const r=await c.auth.signOut();if(r.error)throw r.error;setUser(null);move('giris');setStatus('Oturumun kapatıldı.')}catch{setError('Çıkış tamamlanamadı. Tekrar dene.')}finally{setBusy(false)}};
 const protectedMode=mode==='profil'||mode==='sifirla';
 return <div className="auth-form-shell">
 <div className="auth-switch" role="group" aria-label="Hesap işlemi"><button type="button" aria-pressed={mode==='giris'} onClick={()=>move('giris')}>Giriş yap</button><button type="button" aria-pressed={mode==='kayit'} onClick={()=>move('kayit')}>Kayıt ol</button></div>
 <h2 ref={heading} tabIndex={-1}>{mode==='dogrula'&&user?.email_confirmed_at?'E-postan doğrulandı.':labels[mode]}</h2>
 {!configured()&&<p className="auth-notice" role="status">Hesap hizmeti henüz etkinleştirilmedi. Giriş ve kayıt şu anda kullanılamıyor.</p>}
 {!ready?<p role="status">Oturum kontrol ediliyor…</p>:mode==='dogrula'&&user?.email_confirmed_at?<div role="status"><p>E-posta doğrulaman hesabında onaylandı.</p><button type="button" onClick={()=>move('profil')}>Hesabıma devam et</button></div>:protectedMode&&!user?<div><p>Bu alana erişmek için doğrulanmış oturum gerekir. Şifre yenilemek için e-postandaki bağlantıyı kullan.</p><button type="button" onClick={()=>move('giris')}>Girişe dön</button></div>:<form key={mode} onSubmit={submit}>
 <fieldset disabled={busy||!configured()}>
 {(mode==='kayit'||mode==='profil')&&<label>Adın (isteğe bağlı)<input name="name" autoComplete="name" maxLength={80} defaultValue={user?.user_metadata?.display_name||''}/></label>}
 {['giris','kayit','unuttum','dogrula'].includes(mode)&&<label>E-posta<input name="email" type="email" autoComplete="email" required maxLength={254}/></label>}
 {['giris','kayit','sifirla'].includes(mode)&&<label>Şifre<input name="password" type="password" autoComplete={mode==='giris'?'current-password':'new-password'} minLength={mode==='giris'?1:12} maxLength={128} required/>{mode!=='giris'&&<small>En az 12 karakter; farklı hesaplarda kullandığın şifreyi kullanma.</small>}</label>}
 {mode==='profil'&&<p className="auth-identity">{user?.email}<br/>E-posta: {user?.email_confirmed_at?'doğrulandı':'doğrulama bekleniyor'}</p>}
 <button className="auth-submit" type="submit">{busy?'İşleniyor…':({giris:'Giriş yap',kayit:'Hesabımı oluştur',unuttum:'Yenileme bağlantısı gönder',sifirla:'Şifremi güncelle',profil:'Profili kaydet',dogrula:'Doğrulama bağlantısı gönder'})[mode]} <span aria-hidden="true">↗</span></button>
 </fieldset>
 </form>}
 <div className="auth-feedback"><p role="alert">{error}</p><p role="status">{status}</p></div>
 {mode==='dogrula'&&!user&&<p className="auth-notice">Doğrulama bağlantısını kayıt olduğun tarayıcıda aç. E-postanı başka cihazda doğruladıysan giriş yaparak devam edebilirsin.</p>}
 <div className="auth-utilities">{mode==='giris'&&<button type="button" onClick={()=>move('unuttum')}>Şifremi unuttum</button>}{user&&<button type="button" disabled={busy} onClick={logout}>Çıkış yap</button>}<a href={base+'gizlilik/'}>Gizlilik</a></div>
 {mode==='profil'&&user&&<p className="auth-scope">Bu alan hesabını yönetir. Tarımsal analiz paneli veya çalışan Filiz asistanı sunulmaz.</p>}
 </div>
}
