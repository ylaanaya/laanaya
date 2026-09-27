import json,glob,os,re,html
PL='/home/user/laanaya/plugin/blackvault-design/assets'
SN='/home/user/laanaya/snapshots/2026-09-27_phase0/pages'
P1='/tmp/claude-0/-home-user-laanaya/949e9b6f-dbe4-5c18-aa9e-45f6d9d64239/scratchpad/p1'
LOGO=P1+'/mirror/blackvault.ma/wp-content/uploads/2026/09/blackvault-logo-blanc.png'
def inner(p): return re.sub(r'^<svg[^>]*>|</svg>\s*$','',open(p).read().strip())
UP=P1+'/mirror/blackvault.ma/wp-content/uploads/2026/09/'
# Logos officiels des solutions (médiathèque du site, identiques à la présentation)
logo={1728:'logo-nova.webp',1731:'logo-blackcasex.webp',1734:'logo-blacktrace.webp',1737:'logo-thehound.webp',1740:'logo-vx.webp',1743:'logo-orbitfix.webp',1746:'logo-nexus.webp'}
BR=PL+'/brand/'
icon={1755:'shield',1758:'search',1761:'workflow',1764:'scale',1767:'server',1770:'network',1773:'cog',1725:'layers',1752:'layout-grid',1776:'landmark',1779:'building-2',1782:'user-check',1785:'mail',1788:'shield-user'}
label={1728:'Solution',1731:'Solution',1734:'Solution',1737:'Solution',1740:'Solution',1743:'Solution',1746:'Solution',1755:'Service',1758:'Service',1761:'Service',1764:'Service',1767:'Service',1770:'Service',1773:'Service',2335:'Plateforme',1749:'Plateforme',1725:'Solutions',1752:'Services',1776:'Secteurs',1779:'Entreprise',1782:'Carrières',1785:'Contact',1788:""}
pages={}
for d in glob.glob(SN+'/*'):
    m=json.load(open(d+'/meta.json')); pages[m['id']]=(m['slug'],html.unescape(m['post']['post_title']))
css=f'''@font-face{{font-family:Sora;font-weight:600;src:url(file://{PL}/fonts/sora-latin-600-normal.woff2)}}
@font-face{{font-family:Sora;font-weight:400;src:url(file://{PL}/fonts/sora-latin-400-normal.woff2)}}
@font-face{{font-family:Mono;font-weight:500;src:url(file://{PL}/fonts/ibm-plex-mono-latin-500-normal.woff2)}}
*{{margin:0;box-sizing:border-box}}body{{width:1200px;height:630px;overflow:hidden;background:#070B10;font-family:Sora}}
.c{{position:relative;width:1200px;height:630px;background:radial-gradient(rgba(147,163,181,.09) 1px,transparent 1px) 0 0/24px 24px,#070B10}}
.sig{{position:absolute;right:-260px;top:-20px;height:670px;opacity:.85}}
.logo{{position:absolute;left:72px;top:64px;height:52px}}
.lab{{position:absolute;left:72px;top:250px;font:500 17px/1 Mono;letter-spacing:.14em;text-transform:uppercase;color:#93A3B5;display:flex;gap:14px;align-items:center}}
.lab:before{{content:"";width:22px;height:1px;background:#5EAAE3}}
h1{{position:absolute;left:72px;top:290px;width:620px;font:600 60px/1.06 Sora;letter-spacing:-.03em;color:#E6EDF4;text-wrap:balance}}
.foot{{position:absolute;left:72px;right:72px;bottom:56px;border-top:1px solid #1E2C3A;padding-top:22px;font:500 16px/1 Mono;letter-spacing:.12em;color:#93A3B5;text-transform:uppercase}}
.tile{{position:absolute;right:96px;top:150px;width:330px;height:330px;border:1px solid #1E2C3A;border-radius:12px;display:grid;place-items:center;
background:linear-gradient(#1E2C3A 1px,transparent 1px) 0 0/33px 33px,linear-gradient(90deg,#1E2C3A 1px,transparent 1px) 0 0/33px 33px,#0B121A}}
.tile:before,.tile:after{{content:"";position:absolute;width:20px;height:20px;border:1.5px solid #5EAAE3}}
.tile:before{{top:-1px;left:-1px;border-right:0;border-bottom:0}}.tile:after{{right:-1px;bottom:-1px;border-left:0;border-top:0}}
.tile svg{{width:150px;height:150px;color:#5EAAE3;fill:none;stroke:currentColor;stroke-width:1;stroke-linecap:round;stroke-linejoin:round}}
.tile img{{width:84%;height:84%;object-fit:contain}}
.tile.duo{{display:flex;gap:6px;align-items:center;justify-content:center;padding:18px}}.tile.duo img{{width:48%;height:auto}}
.eco{{position:absolute;right:40px;top:28px;width:560px;height:580px}}
'''
sig=open(PL+'/visuals/hero-signal.svg').read()
import re as _re
eco=_re.sub(r'__IMG_([a-z0-9-]+)__',lambda m:'file://'+(BR+m.group(1)+'.webp' if os.path.exists(BR+m.group(1)+'.webp') else BR+'products/'+m.group(1)+'.webp'),open(PL+'/visuals/ecosystem.svg').read().replace('__ALT__','').replace('width="560" height="580" ',''))
out=[]
for pid,(slug,title) in sorted(pages.items()):
    if pid in (1722,2335):
        h=('BLACKVAULT' if pid==1722 else html.escape(title))
        lab=('' if pid==1722 else '<div class="lab">Plateforme</div>')
        body=f'<div class="c"><img class="logo" src="file://{LOGO}">{lab}<h1 style="width:520px">{h}</h1><div class="eco">{eco}</div><div class="foot">blackvault.ma</div></div>'
    else:
        lb=label.get(pid,''); lab=('<div class="lab">'+lb+'</div>') if lb and lb!=title else ''
        if pid in logo: tile=f'<div class="tile"><img src="file://{UP+logo[pid]}"></div>'
        elif pid==1749: tile=f'<div class="tile duo"><img src="file://{BR}ia-orchestrator-logo.webp"><img src="file://{BR}astro-logo.webp"></div>'
        else: tile=f'<div class="tile"><svg viewBox="0 0 24 24">{inner(f"{PL}/icons/lucide/{icon[pid]}.svg")}</svg></div>'
        body=f'<div class="c"><div class="sig">{sig}</div><img class="logo" src="file://{LOGO}">{lab}<h1>{html.escape(title)}</h1>{tile}<div class="foot">blackvault.ma</div></div>'
    f=f'{P1}/og/og-{slug}.html'; os.makedirs(os.path.dirname(f),exist_ok=True)
    open(f,'w').write(f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body>{body}</body></html>')
    out.append((pid,slug,f))
json.dump(out,open(P1+'/og/list.json','w'))
print(len(out),'templates')
