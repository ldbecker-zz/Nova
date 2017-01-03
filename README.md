# Nova

To Run:
1) clone repo
2) in root directory of repo: npm install
3) Create a local mysql database instance with the following:
	username: nova
	password: nova
	database name: nova
4) Run database migrations with the following command from root directory of repo:
	node node_modules/sequelize-cli/bin/sequelize db:migrate
5) in root directoryof repo:
	a) npm run dev-react
	b) npm start
6) Navigate browser to 127.0.0.1:3000