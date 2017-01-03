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

Reasoning:
1) Set up a server
	-For the sake of time, I simply used the generator functionality of express to generate a boilerplate ejs node/express application.
2) Create the databases
	-I used mysql. After creating the local database instance I used the sequelize-cli to create my models. I then ran a database migration to create my tables, and again later modify the schema of my phase1 table. 
3) Create the endpoints
	-Phase1: I first created a react front end for receiving input. What this endpoint does is create an entry into the phase1 File database with the user specified file name, extension, tags and description.
	-Phase2: Phase 2 is only accessible to the user once there is a file that has completed the phase1 data upload. I first created a route to get all files waiting to be uploaded, which is then populated into a selector. To upload a file, first select a filename from the dropdown. Then click on the dropzone component to select a file, or drag the file onto the component. The file is first uploaded onto the server via the /uploadHandler route. The /uploadHandler route then calls the actual /phase2 route. The line count of the file is done at this point, and the meta data is inserted into the phase2 FileMeta table.
	-data/:id : This route is called via the CompletedFile component, which is used for viewing the info of an uploaded file. The entire File entry is loaded into the component (not ideal, I know) and this route is called where :id is the id of the entry passed into the component. What this route does is get the metadata for a given uploaded file's id. 
4) Test-Suite
	-Not yet completed. But will be completed ASAP. I ran out of time today.

How do you typically manage dependencies for a project?
- If possible, I try to manage dependencies individually as I need them. When I feel I need to install a dependency, I usually do so via the npm install (package_name) -save command. If I know I need more than 1 at a certain time, I usually add them into package.json and then run an npm install.

Provide a top 3 of your favorite resources (blogs, books, people, etc...) that you use to improve as an engineer. Please tell why you like that particular resource.
- 1) Stackoverflow - Stackoverflow is my first stop usually when I run into trouble. I find most of the time, I am able to find relevant enough info where it applies to my problem, or can be slightly altered in some way to be relevant. I learn best through examples so it is both reassuring and informative to see how people navigated similar problems.
- 2) Github - Most of the time if you are trying to accomplish something technically, unless it is something completely cutting edge and new, it or something similar has been done before. As I mentioned before, I learn best through code examples so seeing actual code implementations tackling certain problems is very useful for me.
- 3) Other programmers - If I get completely stuck, and the above 2 aren't providing useful info, I tend to simply ask one of my friends how they would approach the problem. Even if they are not able to help solve my problem, seeing someone else's thought process regarding the problem is usually quite helpful in the end.

How would you test a piece of code that required access to a remote database through a network connection?
- I would probably use mocha and chai. Sorry I cannot be more detailed, but the question is somewhat vague. If it was a live production database, I would most likely recreate a local instance of the database's schemas and test that as to be sure to not mess anything up on the production server. 