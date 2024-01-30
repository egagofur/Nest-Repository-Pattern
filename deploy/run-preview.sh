#!/bin/bash
eval $(ssh-agent -s)
/bin/bash -c 'ssh-add <(echo "$DOT_SECRET_KEY")'
export ANSIBLE_HOST_KEY_CHECKING=false
export ANSIBLE_DEPRECATION_WARNINGS=false
ansible-playbook -i deploy/hosts deploy/$1.yaml
