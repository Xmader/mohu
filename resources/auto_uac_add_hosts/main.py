#!/usr/bin/env python
# -*- coding: utf-8 -*-
import uac_judge
import os
import sys

# uac_judge.run_as_admin()
platform = sys.platform
host = "\n104.27.146.57 www.mohu.club\n"

if platform == 'win32':
    windir = os.getenv("windir") or 'C:\\WINDOWS'
    sys_hosts_path = windir + "\\system32\\drivers\\etc\\hosts"
else:
    sys_hosts_path = '/etc/hosts'
    
try:
    with open(sys_hosts_path,"ab") as f:
    # with open(windir + "\\system32\\drivers\\etc\\h1", "wb") as f:
        f.write(host)
except IOError:
    uac_judge.run_as_admin()
