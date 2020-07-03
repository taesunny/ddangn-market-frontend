REPOSITORY=/home/ec2-user/ddangn-ui
PROJECT_NAME=ddangn-market-frontend
IMAGE_VERSION=0.1

cd $REPOSITORY/$PROJECT_NAME/

echo "> Git Pull"
git pull

echo "> Build React App"
npm run build

echo "> Dockerfile Build"
docker build -t nginx-react:$IMAGE_VERSION .

echo "> Run docker"
docker run -d --name my-react-app -p 80:80 nginx-react:$IMAGE_VERSION