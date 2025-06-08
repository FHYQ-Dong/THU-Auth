import requests
import json
from . import sm2Util
import loguru
from pathlib import Path
import re

__all__ = ['AuthSession']

class AuthSession(requests.Session):
    def __init__(self, form_id, username, password, log = True, logfile = 'log/login.log'):
        super().__init__()
        self.username = username
        self.password = sm2Util.sm2sign(password)
        self.form_id = form_id
        self.log = log
        if self.log:
            logfile = Path(logfile).resolve()
            logfile.parent.mkdir(parents=True, exist_ok=True)
            self.logger = loguru.logger
            self.logger.add(logfile.as_posix(), rotation='5 MB')
        
    def _getFinger3(self):
        self.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0'
        resp = self.post('https://id.tsinghua.edu.cn/b/doubleAuth/personal/getFinger3')
        if resp.status_code != 200:
            if self.log:
                self.logger.error(f'Failed to get finger3, status code: {resp.status_code}')
            raise ValueError(f'Failed to get finger3, status code: {resp.status_code}')
            return None
        else:
            if self.log:
                self.logger.info(f'Finger3: {json.loads(resp.text)["object"]}')
            return json.loads(resp.text)['object']
        
    def _getAuthPage(self):
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
        resp = self.get(f'https://id.tsinghua.edu.cn/do/off/ui/auth/login/form/{self.form_id}/0?/authLogin')
        if resp.status_code != 200:
            if self.log:
                self.logger.error(f'Failed to get auth page, status code: {resp.status_code}')
            raise ValueError(f'Failed to get auth page, status code: {resp.status_code}')
        else:
            if self.log:
                self.logger.info('Get auth page successfully')
            
    def _check(self, finger, finger3='', i_captcha = ''):
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
            'Referer': f'https://id.tsinghua.edu.cn/do/off/ui/auth/login/form/{self.form_id}/0?/authLogin',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'zh-CN,zh;q=0.9'
        } 
        for k, v in headers.items():
            self.headers[k] = v
        x_www_form_urlencoded = {
            'i_user': self.username,
            'i_pass': self.password,
            'fingerPrint': finger,
            'fingerGenPrint3': finger3,
            'fingerGenPrint': '',
            'i_captcha': i_captcha
        }
        resp = self.post('https://id.tsinghua.edu.cn/do/off/ui/auth/login/check', data=x_www_form_urlencoded)
        if resp.status_code != 200 or '登录成功' not in resp.text:
            if self.log:
                self.logger.error(f'Failed to login, status code: {resp.status_code}')
                self.logger.error(f'Response: {resp.text}')
            return None
        else:
            if self.log:
                self.logger.info('Login successfully')
            return re.search(r'\?ticket=([a-zA-Z0-9]+)', resp.text).group(1)
        
    def do_auth(self):
        self._getAuthPage()
        finger3 = self._getFinger3()
        ticket = self._check('25cc2f1226b3223ef1503047a72fd6a6', finger3 if finger3 else '', '')
        # finger3 = self._getFinger3()
        # self._getAuthPage()
        return ticket
