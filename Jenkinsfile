node {
  stage 'Checkout'
  git 'https://github.com/ReDeployIO/docker-wordpress-nginx.git'

  stage 'Package Docker image'
  def img = docker.build('redeployio/jupiter:latest', '.')

  stage 'Publish'

docker.withRegistry('https://registry.hub.docker.com', 'docker-hub') {
    img.push('latest')
  }
}
