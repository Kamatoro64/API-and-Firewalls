echo "running test 1"
while read line; do curl -s -X "POST" -H "Content-Type: application/json" -d '{"quote":"'"$line"'"}' http://localhost:3000/quotes/ | jq; done <~/linux_profile/notes/quotes

echo "running test 2"
curl -s -X "DELETE" http://localhost:3000/quotes| jq

echo "running test 3"
curl -s -X "GET" http://localhost:3000/quotes| jq

