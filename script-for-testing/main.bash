#!/bin/bash

m=$1
n=$2

declare -a next
declare -a goal

for (( i=0; i<=m; i++ )); do
    next[$i]=0
    goal[$i]=1
done

goal[$m]=-1

while [ ${next[$m]} -ne $((n + 1)) ]; do
    value=$(( next[0] + 1 ))
    transferring=1
    m_current=0

    while [ $transferring -ne 0 ]; do
        if [ ${next[$m_current]} -eq ${goal[$m_current]} ]; then
            goal[$m_current]=$value
        else
            transferring=0
        fi

        next[$m_current]=$(( next[$m_current] + 1 ))
        m_current=$(( m_current + 1 ))
    done
done

echo $value
