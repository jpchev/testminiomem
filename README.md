# testminiomem


```shell
# generate a 1 Gb file
fsutil file createnew 1gb.test 1073741824
# install nodejs modules
npm i
# start server
node index.js
# upload file
curl -F "file=@./1gb.test"  http://localhost:8080/upload/test
```
