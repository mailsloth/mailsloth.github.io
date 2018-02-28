base_uri=https://api.mailsloth.net

function get_email() {
    echo $(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 10 | head -n 1)$(echo @email.com); } 

email=$(get_email)
echo Using $email

# Create endpoint
echo Testing create endpoint...

payload="{'Email': '$email', 'Captcha': ''}"
echo $payload
json="$(curl -X POST -d "$payload" -H "Content-Type: application/json" -S -f $base_uri/create2)"
public_key="$(echo $json | jq -r ".PublicKey")"
private_key="$(echo $json | jq -r ".PrivateKey")"

echo Got public key $public_key and private key $private_key

# Add endpoint
echo Testing add endpoint...

for i in 1 2 3 4 5 
do
    echo $i
    email=$(get_email)
    echo Using test email $email

    payload="{'Id': '$public_key', 'Email': '$email', 'SourceUri': 'http://test.com'}"
    curl -X POST -d "$payload" -H "Content-Type: application/json" -S -f $base_uri/add
done

# Retrieve endpoint
echo Testing retrieve endpoint...

json="$(curl -X GET -S -f $base_uri/retrieve?key=$private_key)"
count=$(echo $json | jq '. | length' )

echo Retrieved $count emails
retrieved=$(echo $json | jq '.[] | .Email')
echo Retrieved $retrieved