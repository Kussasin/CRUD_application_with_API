npm run build

cd build

git init

git remote add origin https://github.com/Kussasin/Quizzy
git config user.email "bohdan.basistyi@gmail.com"
git config user.name "Kussasin"

git branch -M gh-pages

git pull origin gh-pages

git add .

git commit -m "build"

git push -f origin gh-pages