#!/bin/bash

# 스크립트 실행 중 에러 발생 시 중단
set -e  

echo "🔨 빌드 시작..."
npm run build

echo "📂 서버에 임시 디렉토리 생성..."
ssh linkrew-web-dev "rm -rf ~/temp-dist && mkdir -p ~/temp-dist"

echo "📤 빌드 결과 서버에 업로드..."
scp -r dist/* linkrew-web-dev:~/temp-dist/

echo "서버 접속"
ssh linkrew-web-dev

# # 기존 파일 삭제
# sudo rm -rf /home/ubuntu/linkrew/*

# # 새 파일 복사
# sudo cp -r ~/temp-dist/* /home/ubuntu/linkrew/

# # 권한 설정
# sudo chown -R ubuntu:ubuntu /home/ubuntu/linkrew/
# sudo chmod -R 755 /home/ubuntu/linkrew/

# # 복사 결과 확인
# ls -la /home/ubuntu/linkrew/

# # nginx 재시작
# sudo systemctl reload nginx
