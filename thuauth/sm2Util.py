from py_mini_racer import py_mini_racer
from pathlib import Path

def sm2sign(passwd):
    ctx = py_mini_racer.MiniRacer()
    js_path = Path(__file__).parent / 'sm2Util.js'
    sm2Util_js = js_path.read_text(encoding='utf-8')
    publickey = '04d0c9e1ae89279fe05b435d63e3eba437bf510e09da5f71558974a19dc596724227f08dc2fc6e74bbb9d8b468d4dd5205e9b6793a3bbc48df3fdf219b3ea140e3'
    ctx.eval(sm2Util_js)
    return ctx.call('sm2Util.doEncryptStr', passwd, publickey)

if __name__ == '__main__':
    s = sm2sign('123456')
    print(s)
