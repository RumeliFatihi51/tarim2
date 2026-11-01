"""Real public API negative tests. No email delivery or persistent test user creation."""
import json,urllib.request,urllib.error
from pathlib import Path
cfg=json.loads(Path('src/config/supabase-public.json').read_text());result=[]
def request(path,body=None):
 req=urllib.request.Request(cfg['url']+path,data=json.dumps(body).encode() if body is not None else None,headers={'apikey':cfg['publishableKey'],'Content-Type':'application/json'})
 try:
  with urllib.request.urlopen(req) as r:return r.status,json.load(r)
 except urllib.error.HTTPError as e:return e.code,json.load(e)
status,data=request('/auth/v1/user');assert status in [401,403];result.append({'test':'unauthenticated account API rejected','status':status})
status,data=request('/rest/v1/contact_requests?select=id');assert status in [401,403];result.append({'test':'anonymous contact inbox read denied','status':status})
status,data=request('/auth/v1/token?grant_type=password',{'email':'phase2-nonexistent@example.invalid','password':'nonexistent-test-account-not-a-real-password'});assert status in [400,401,422] and 'access_token' not in data;result.append({'test':'invalid login produces no session','status':status})
status,data=request('/auth/v1/signup',{'email':'phase2-weak-password@example.invalid','password':'a'});assert status in [400,422] and 'access_token' not in data;result.append({'test':'invalid signup rejected before email delivery','status':status})
Path('docs/phase2/provider-tests.json').write_text(json.dumps(result,indent=2));print('PASS:',len(result),'real API negative checks; no email or test account created')
