#!/bin/sh
exec python3 -m http.server 8420 --directory "$(cd "$(dirname "$0")" && pwd)"
