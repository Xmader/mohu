#!/usr/bin/env python
# -*- coding: utf-8 -*-
import oss2
import requests
import os
import sys
from settings import auth, endpoint, bucket, site

file_name = os.path.abspath(sys.argv[1])
base_name = os.path.basename(file_name)

print u"即将上传 " + file_name + u" 到 " + site + "/" + "v1/" + base_name


oss2.resumable_upload(bucket, "v1/" + base_name, file_name,
                      store=oss2.ResumableStore(root='/.tmp'),
                      # multipart_threshold=100*1024,
                      # part_size=100*1024,
                      # num_threads=1
                      )

print u"上传成功!"
