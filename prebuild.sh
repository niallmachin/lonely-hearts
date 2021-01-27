#!/bin/bash

curl --location --request DELETE "https://$DRONE_SYSTEM_HOST/api/repos//builds/" --header "Authorization: Bearer $DRONE_AUTH_TOKEN"
