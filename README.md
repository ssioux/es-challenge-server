# es-challenge-server
esChallenge is an app created to all people wich want to make a tourney. To do that its very easy, you only have to signup, create your team, your game and your tourney. Contact us to accord the dates of the tourney.

To enjoy the webSite here: https://es-challenge.netlify.app/

METHOD	URL	Description	BODY
POST	"/auth/signup"	create user	// .  username, email, password
POST	"/auth/login	log user // 	email, password
GET	"/auth/verify"	verify user	
			
TEAM ROUTES			
GET 	/team/list	Team List	
POST	/team/create	Team Create	name,   // nameTag, picture, creator, members
GET	/team/:teamId/details	Team Details	
PATCH	/team/:teamId/edit	Team Edit	 //  name, nameTag, picture, creator, members
DELETE	/team/:teamId/delete	Team Delete	
GET	/team/find-creator	Find team creator	
GET	/team/find-user	Find teams wich user is included	
			
GAME ROUTES			
GET	/game/list	// Game List	
POST	/game/create	// Game Create	name, //  description, picture, creator
GET	/game/:gameId/details	// Game Details	
PATCH	/game/:gameId/edit	// Game Edit	name, //  description, picture, creator
DELETE	/game/:gameId/delete // 	Game Delete	
			
PROFILE ROUTES			
GET	/profile/user-list // 	Profile List	
GET	/profile/:userId/details // Profile Details	 //   username, email, password
PATCH	/profile/:userId/edit // 	Profile Edit	// username, email, password
DELETE	/profile/:userId/delete	// Profile Delete	
			
TOURNEY ROUTES			
GET	/tourney/list	Tourney List	
POST	/tourney/create	 // Tourney  Create	 // . name, game, creator, teams, active, quarter(A,B,C,D), semi(A,B), final,winner
GET	/tourney/:tourneyId/details// 	Tourney Details	
PATCH	/tourney/:tourneyId/edit	// Tourney Edit	// . name, game, creator, teams, active, quarter(A,B,C,D), semi(A,B), final,winner
DELETE	/tourney/:gameId/delete// 	Tourney Delete	
PATCH	"/:tourneyId/sort-teams"// 	Tourney Teams Mix	
PATCH	/tourney/:tourneyId/details/edit// 	Tourney Details edit	
PATCH	/tourney/:tourneyId/update-quarters// 	Tourney update quarters results // 	 quarter(A,B,C,D)
PATCH	/tourney/:tourneyId/update-semi	// Tourney update semiFinals results	//    semi(A,B)
PATCH	/tourney/:tourneyId/update-final	// Tourney update Finals result	//     final
PATCH	/:tourneyId/add-team // add team to tourney //	


MODELS:
- USER MODEL
 username - String // required // trim 
 email - String // required// unique// lowercase// trim
 password - String
 role - String // enum "user", "admin"
 picture - String

- GAME MODEL
 name - String // required
 description - String
 picture - String
 creator- [ObjectID<User>]

 - TEAM MODEL
 name - String// required // unique
 nameTag - String // required // unique
 picture - String // default
 creator- [ObjectID<User>]
 members- [ObjectID<User>]
 joinPassword - String // required

 - TOURNEY MODEL
  name - String // required
  description - String
  game - [ObjectID<Game>]
  teams - [ObjectID<Teams>]
  active - boolean
  quarterA -  [ObjectID<Teams>]
  quarterB -  [ObjectID<Teams>]
  quarterC -  [ObjectID<Teams>]
  quarterD -  [ObjectID<Teams>]
  semiA -  [ObjectID<Teams>]
  semiB -  [ObjectID<Teams>]
  final -  [ObjectID<Teams>]
  winner -  {ObjectID<Teams>}

  