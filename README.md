# burger-worker-latihan-rabbitmq


for start you need to

cd producers => yarn install => nest start -w
cd consumers => yarn install

in customer directory
run yarn start:dev burger-worker ( to start burger-worker )
run yarn start:dev recovery-worker ( to start recovery-worker )

producers will sent to customers to prepare a burger
every third burger will fail, so recovery-worker will doing his job to send meessage again to customer
