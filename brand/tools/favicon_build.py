import cv2, numpy as np, math
SRC='/tmp/claude-0/-home-user-laanaya/949e9b6f-dbe4-5c18-aa9e-45f6d9d64239/scratchpad/p1/mirror/blackvault.ma/wp-content/uploads/2026/09/blackvault-icone-300x300.png'
S=8
im=cv2.imread(SRC,cv2.IMREAD_UNCHANGED).astype(np.float32)
big=cv2.resize(im,(300*S,300*S),interpolation=cv2.INTER_CUBIC)
big=cv2.GaussianBlur(big,(0,0),S*0.5)
b,g,r=big[:,:,0],big[:,:,1],big[:,:,2]
lum=0.299*r+0.587*g+0.114*b
dark=((lum<115)&(b-r<70)).astype(np.uint8)
# zone utile : intérieur du cadre source élargi de 3 px (pour recouvrir le cadre)
x0,y0,x1,y1=41.5-3,41.75-3,263.4+3,259.75+3
mask=np.zeros_like(dark); mask[int(y0*S):int(y1*S),int(x0*S):int(x1*S)]=1
sh=dark*mask
n,lab=cv2.connectedComponents(sh)
wheel=lab[int(147.8*S),int((151.8+25)*S)]  # composante de la roue (anneau du moyeu)
sh[lab==wheel]=0
sh=(sh*255).astype(np.uint8)
cnts,_=cv2.findContours(sh,cv2.RETR_CCOMP,cv2.CHAIN_APPROX_NONE)
# affine cadre source -> cadre normalisé
F0,F1=30.8,269.2
ax=(F1-F0)/(271.1-33.4); ay=(F1-F0)/(267.75-33.6)
def T(x,y): return (F0+(x-33.4)*ax, F0+(y-33.6)*ay)
parts=[]
for c in cnts:
    if cv2.contourArea(c)<(1.0*S)**2: continue
    ap=cv2.approxPolyDP(c,0.28*S,True)
    pts=[T(p[0][0]/S,p[0][1]/S) for p in ap]
    parts.append('M'+' '.join(f'{x:.1f} {y:.1f}' for x,y in pts)+'Z')
shards=''.join(parts)
# roue géométrique, centrée
cx=cy=150; k=1.01
R=lambda v: round(v*k,2)
spk=[]
for i in range(8):
    a=math.radians(i*45); r0=R(18.6); r1=R(101.3)-R(5.15)
    spk.append(f'M{cx+r0*math.cos(a):.2f} {cy+r0*math.sin(a):.2f}L{cx+r1*math.cos(a):.2f} {cy+r1*math.sin(a):.2f}')
dots=[]
for i in range(8):
    for s in (-6.7,6.7):
        a=math.radians(22.5+45*i+s); rr=R(52.4)
        dots.append(f'<circle cx="{cx+rr*math.cos(a):.2f}" cy="{cy+rr*math.sin(a):.2f}" r="{R(2.3)}"/>')
hr0,hr1,gr1,or1=R(18.6),R(29.2),R(44.9),R(60.2)
ring=lambda ro,ri: f'M{cx-ro} {cy}a{ro} {ro} 0 1 0 {2*ro} 0a{ro} {ro} 0 1 0 {-2*ro} 0ZM{cx-ri} {cy}a{ri} {ri} 0 1 1 {2*ri} 0a{ri} {ri} 0 1 1 {-2*ri} 0Z'
BLUE,DARK='#1F74B5','#051627'
frame=f'M{F0+3} {F0}H{F1-3}a3 3 0 0 1 3 3V{F1-3}a3 3 0 0 1 -3 3H{F0+3}a3 3 0 0 1 -3 -3V{F0+3}a3 3 0 0 1 3 -3ZM39 39V261H261V39Z'
svg=(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">'
 f'<rect width="300" height="300" rx="16" fill="{BLUE}"/>'
 f'<rect x="20.5" y="20.5" width="259" height="259" rx="7" fill="#fff"/>'
 f'<g fill="{DARK}"><path fill-rule="evenodd" d="{frame}"/><path d="{shards}"/>'
 f'<path fill-rule="evenodd" d="{ring(or1,gr1)}{ring(hr1,hr0)}"/></g>'
 f'<path d="{"".join(spk)}" stroke="{DARK}" stroke-width="{R(10.3)}" stroke-linecap="round" fill="none"/>'
 f'<circle cx="{cx}" cy="{cy}" r="{hr0}" fill="#fff"/>'
 f'<g fill="#fff">{"".join(dots)}</g></svg>')
open('blackvault-icon.svg','w').write(svg)
print(len(parts),'shard paths',len(svg),'bytes')
