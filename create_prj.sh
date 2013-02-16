#!/bin/sh

#-------------------
# vars
#-------------------
PRJ_PATH=""

#-------------------
# options
#-------------------
while getopts p: OPT
do
  case $OPT in
    "p" ) PRJ_PATH="$OPTARG" ;;
  esac
done

if [ "$PRJ_PATH" = "" ]; then
  echo "Usage: create_prj.sh [-p export directory path]" 1>&2
  exit 1
fi

#-------------------
# export
#-------------------
#$GIT_CMD checkout-index -a -f --prefix=${PATH}/
git checkout-index -a -f --prefix=${PRJ_PATH}/
#/usr/local/Cellar/git/1.8.0/bin/git checkout-index -a -f --prefix=${PATH}/
