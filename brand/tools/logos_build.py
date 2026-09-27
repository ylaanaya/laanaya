import numpy as np
from PIL import Image
SRC='/home/user/laanaya/brand/sources/'
def black_to_alpha(im,T=70.0,floor=10.0):
    pass
def black_to_alpha(im,T=70.0,floor=10.0):
    a=np.asarray(im.convert('RGB')).astype(np.float32)
    mx=a.max(axis=2)
    alpha=np.clip((mx-floor)/(T-floor),0,1)
    # dé-prémultiplication sur fond noir : F = C / alpha, bornée
    with np.errstate(divide='ignore',invalid='ignore'):
        f=np.where(alpha[...,None]>0, a/np.maximum(alpha[...,None],1e-3), 0)
    f=np.clip(f,0,255)
    # adoucit le bord extérieur (vignette) pour éviter toute coupure nette
    h,w=mx.shape; yy,xx=np.mgrid[0:h,0:w]
    e=np.minimum(np.minimum(xx,w-1-xx),np.minimum(yy,h-1-yy))/(0.035*min(w,h))
    alpha=alpha*np.clip(e,0,1)
    out=np.dstack([f,alpha*255]).astype(np.uint8)
    return Image.fromarray(out,'RGBA')
jobs={
 'ia-orchestrator-emblem':('ia-orchestrator-logo.webp',(47,125,977,1055),160),
 'ia-orchestrator-logo':('ia-orchestrator-logo.webp',(30,80,994,1300),400),
 'astro-emblem':('astro-logo.webp',(218,70,1038,868),160),
 'astro-logo':('astro-logo.webp',(120,50,1134,1150),400),
}
for name,(src,box,w) in jobs.items():
    im=Image.open(SRC+src).crop(box)
    r=w/im.size[0]; im=im.resize((w,round(im.size[1]*r)),Image.LANCZOS)
    t=black_to_alpha(im,T=95.0,floor=30.0) if name.startswith('ia-') else black_to_alpha(im,T=75.0,floor=14.0)
    t.save(name+'.webp','WEBP',quality=80,method=6)
    import os; print(name,t.size,os.path.getsize(name+'.webp'))
