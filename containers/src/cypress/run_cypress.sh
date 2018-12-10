#!/bin/sh

ln -s /install/node_modules /install/test
cypress run -P test --config videosFolder='/media/1/cypress/'
