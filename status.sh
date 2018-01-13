#!/bin/bash

PROCESSES=$(ps aux | grep electron | wc -l)

[ $PROCESSES -gt 1 ] && echo 'electron is on' || echo 'electron is off'
