#!/bin/bash
kill -9 `ps -ef | grep SimpleHTTPServer | grep 8000 | awk '{print $2}'`
