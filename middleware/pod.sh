#!/bin/bash

middleware_pod=$(kubectl get pods -n tst-seefit | grep middleware- | awk '{print $1}')

if [ -n "$middleware_pod" ]; then
    echo "middleware pod found: $middleware_pod"
    kubectl logs -n tst-seefit --timestamps -f $middleware_pod
else
    echo "middleware pod not found"
fi