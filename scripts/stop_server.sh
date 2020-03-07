#!/bin/bash
# kill -9 `ps -ef | grep SimpleHTTPServer | grep 8000 | awk '{print $2}'`
isExistApp=`pgrep httpd`
if [[ -n  $isExistApp ]]; then
    service httpd stop
fi
