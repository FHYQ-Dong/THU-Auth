import thuauth

# d736f067a6705ab942df52f958a0f23b is the form_id for madmodel.cs.tsinghua.edu.cn
auth = thuauth.AuthSession('d736f067a6705ab942df52f958a0f23b', '<your_username>', '<your_password>')
# do_auth() will return a str containing the ticket for further use
print(auth.do_auth())
