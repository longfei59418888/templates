#!/usr/bin/env bash
ENV=$2
GIT_COMMIT=$(git log -n 1 --pretty=format:'%h')

test(){
   echo "---> test start ..."
   docker info
   docker build -f ./scripts/ops/Dockerfile -t "demo/test" --progress=plain --no-cache --target test .
   if [ "$?" != 0 ]; then
     exit "$?"
   fi
   echo "---> test end ..."
}

build(){
    echo "---> build start ..."
    CONTAINER_REPO="registry.cn-qingdao.aliyuncs.com"
    STORE_PATH="wxl-test/test"
    PROJECT_NAME="react-tpl"
    IMAGE_NAME=${CONTAINER_REPO}/${STORE_PATH}:${PROJECT_NAME}_${ENV}-${GIT_COMMIT}
    echo ${IMAGE_NAME}
    docker build -f ./scripts/ops/Dockerfile -t ${IMAGE_NAME} --progress=plain --build-arg ENV=${ENV} --target prod .
     if [ "$?" != 0 ]; then
      exit "$?"
     fi
    docker login -u 398497684@qq.com -p !password registry.cn-qingdao.aliyuncs.com
    docker push ${IMAGE_NAME}
    docker rmi ${IMAGE_NAME}
    echo "---> build end ..."
}

deploy(){
  echo "test"
}


case $1 in
 test )
   $1;;
 build )
   $1;;
 deploy )
   $1 $2 $3;;
 * )
   echo "not support!!! example: go <test|build|deploy>"
   exit 1;;
esac
