#!/bin/sh

ln -s /install/node_modules /install/test
cypress run --browser chrome -P test --config videosFolder='/media/1/cypress/'
