# -*- coding: utf-8 -*-
# 判断是否有UAC权限
import os
import sys
import ctypes


def have_uac():
    try:
        if ctypes.windll.shell32.IsUserAnAdmin() == 0:
            return False
        else:
            return True
    except:
        return False


def run_as_admin():
    if not have_uac():
        #os.system('powershell Start-Process notepad -Verb runas')
        os.system('powershell Start-Process ' + sys.argv[0] + ' -Verb runas')
        sys.exit()