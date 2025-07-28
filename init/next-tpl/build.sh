


web_build(){
  IMAGE_NAME=324037279324.dkr.ecr.us-east-2.amazonaws.com/chev/web:getytmp3-v1.0.5
  yarn run build:master
  docker build --platform linux/amd64 --build-arg ENV=master --target run -t $IMAGE_NAME  -f ./Dockerfile .
  docker push $IMAGE_NAME
  # docker rmi $IMAGE_NAME
}


web_build
