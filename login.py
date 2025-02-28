import requests
import json
from sign import sm2sign
import loguru
import argparse


class LoginSession(requests.Session):
    def __init__(self, username, password, logfile = 'login.log'):
        super().__init__()
        self.username = username
        self.password = sm2sign(password)
        self.logger = loguru.logger
        self.logger.add(logfile, rotation='5 MB')
        
    def getFinger3(self):
        self.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0'
        resp = self.post('https://id.tsinghua.edu.cn/b/doubleAuth/personal/getFinger3')
        if resp.status_code != 200:
            self.logger.error(f'Failed to get finger3, status code: {resp.status_code}')
            raise ValueError(f'Failed to get finger3, status code: {resp.status_code}')
            return None
        else:
            self.logger.info(f'Finger3: {json.loads(resp.text)["object"]}')
            return json.loads(resp.text)['object']
        
    def getAuthPage(self):
        headers = {
            'Cache-Control': 'max-age=0',
            'sec-ch-ua': '"Not(A:Brand";v="99", "Microsoft Edge";v="133", "Chromium";v="133"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'Origin': 'https://id.tsinghua.edu.cn',
            'DNT': '1',
            'Upgrade-Insecure-Requests': '1',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Referer': 'https://madmodel.cs.tsinghua.edu.cn/',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'zh-CN,zh;q=0.9',
        }
        for k, v in headers.items():
            self.headers[k] = v
        resp = self.get('https://id.tsinghua.edu.cn/do/off/ui/auth/login/form/d736f067a6705ab942df52f958a0f23b/0?/authLogin')
        if resp.status_code != 200:
            self.logger.error(f'Failed to get auth page, status code: {resp.status_code}')
            raise ValueError(f'Failed to get auth page, status code: {resp.status_code}')
        else:
            self.logger.info('Get auth page successfully')
            
    def check(self, finger3, i_captcha = ''):
        headers = {
            'Cache-Control': 'max-age=0',
            'sec-ch-ua': '"Not(A:Brand";v="99", "Microsoft Edge";v="133", "Chromium";v="133"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'Origin': 'https://id.tsinghua.edu.cn',
            'DNT': '1',
            'Upgrade-Insecure-Requests': '1',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Referer': 'https://id.tsinghua.edu.cn/do/off/ui/auth/login/form/d736f067a6705ab942df52f958a0f23b/0?/authLogin',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'zh-CN,zh;q=0.9'
        } 
        for k, v in headers.items():
            self.headers[k] = v
        x_www_form_urlencoded = {
            'i_user': self.username,
            'i_pass': self.password,
            'fingerPrint': '25d975d5b0f38ca41117a5e239c47db3',
            'fingerGenPrint3': finger3,
            'fingerGenPrint': '',
            'i_captcha': i_captcha
        }
        resp = self.post('https://id.tsinghua.edu.cn/do/off/ui/auth/login/check', data=x_www_form_urlencoded)
        if resp.status_code != 200 or '登录成功' not in resp.text:
            self.logger.error(f'Failed to login, status code: {resp.status_code}')
            self.logger.error(f'Response: {resp.text}')
            return False
        else:
            self.logger.info('Login successfully')
            return True
        
    def login(self):
        finger3 = self.getFinger3()
        if finger3 is None:
            return False
        self.getAuthPage()
        return self.check(finger3)

if __name__ == '__main__':
    argparser = argparse.ArgumentParser()
    argparser.add_argument('--username', '-u', type=str, required=True, help='Your username')
    argparser.add_argument('--password', '-p', type=str, required=True, help='Your password')
    argparser.add_argument('--logfile', type=str, default='log/login.log', help='Log file path')
    
    args = argparser.parse_args()
    login = LoginSession(args.username, args.password, args.logfile)
    login.login()
