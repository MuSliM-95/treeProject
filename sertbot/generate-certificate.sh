#!/bin/bash

rm -rf /etc/letsencrypt/live/certfolder*

certbot certonly \
  --webroot \
  -w /var/www/certbot \
  --email $DOMAIN_EMAIL \
  -d $DOMAIN_URL \
  --cert-name certfolder \
  --key-type rsa \
  --agree-tos \
  --non-interactive

if [ $? -ne 0 ]; then
  echo "Certbot failed"
  exit 1
fi

rm -f /etc/nginx/fullchain.pem
rm -f /etc/nginx/privkey.pem

cp /etc/letsencrypt/live/certfolder/fullchain.pem /etc/nginx/fullchain.pem
cp /etc/letsencrypt/live/certfolder/privkey.pem /etc/nginx/privkey.pem

echo "Certificate generated successfully"