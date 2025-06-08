# THU-Auth

THU-Auth 是用于通过[清华大学电子身份认证服务系统](https://id.tsinghua.edu.cn)自动登录的 Python 脚本库。

## 安装

1. 克隆本仓库或下载源码
2. 安装依赖：

   ```bash
   pip install -r requirements.txt
   ```

## 使用方法

### 作为库调用

```python
import thuauth

# form_id 可在目标站点跳转到清华大学电子身份认证服务系统后的地址中找到
# 如 madmodel.cs.tsinghua.edu.cn 的 form_id 是 25cc2f1226b3223ef1503047a72fd6a6
auth = thuauth.AuthSession('<form_id>', '<your_username>', '<your_password>')
# do_auth() 将会返回一个 ticket 字符串，将会用于在目标站点进行认证
ticket = auth.do_auth()
print(ticket)
```

## 免责声明

本项目仅供学习与交流使用，请勿用于非法用途。

---
