import * as THREE from 'https://threejs.org/build/three.module.js';
import {GLTFLoader} from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

const wordList = [
  "ability","able","aboard","about","above","accept","accident","according",
  "account","accurate","acres","across","act","action","active","activity",
  "actual","actually","add","addition","additional","adjective","adult","adventure",
  "advice","affect","afraid","after","afternoon","again","against","age",
  "ago","agree","ahead","aid","air","airplane","alike","alive",
  "all","allow","almost","alone","along","aloud","alphabet","already",
  "also","although","am","among","amount","ancient","angle","angry",
  "animal","announced","another","answer","ants","any","anybody","anyone",
  "anything","anyway","anywhere","apart","apartment","appearance","apple","applied",
  "appropriate","are","area","arm","army","around","arrange","arrangement",
  "arrive","arrow","art","article","as","aside","ask","asleep",
  "at","ate","atmosphere","atom","atomic","attached","attack","attempt",
  "attention","audience","author","automobile","available","average","avoid","aware",
  "away","baby","back","bad","badly","bag","balance","ball",
  "balloon","band","bank","bar","bare","bark","barn","base",
  "baseball","basic","basis","basket","bat","battle","be","bean",
  "bear","beat","beautiful","beauty","became","because","become","becoming",
  "bee","been","before","began","beginning","begun","behavior","behind",
  "being","believed","bell","belong","below","belt","bend","beneath",
  "bent","beside","best","bet","better","between","beyond","bicycle",
  "bigger","biggest","bill","birds","birth","birthday","bit","bite",
  "black","blank","blanket","blew","blind","block","blood","blow",
  "blue","board","boat","body","bone","book","border","born",
  "both","bottle","bottom","bound","bow","bowl","box","boy",
  "brain","branch","brass","brave","bread","break","breakfast","breath",
  "breathe","breathing","breeze","brick","bridge","brief","bright","bring",
  "broad","broke","broken","brother","brought","brown","brush","buffalo",
  "build","building","built","buried","burn","burst","bus","bush",
  "business","busy","but","butter","buy","by","cabin","cage",
  "cake","call","calm","came","camera","camp","can","canal",
  "cannot","cap","capital","captain","captured","car","carbon","card",
  "care","careful","carefully","carried","carry","case","cast","castle",
  "cat","catch","cattle","caught","cause","cave","cell","cent",
  "center","central","century","certain","certainly","chain","chair","chamber",
  "chance","change","changing","chapter","character","characteristic","charge","chart",
  "check","cheese","chemical","chest","chicken","chief","child","children",
  "choice","choose","chose","chosen","church","circle","circus","citizen",
  "city","class","classroom","claws","clay","clean","clear","clearly",
  "climate","climb","clock","close","closely","closer","cloth","clothes",
  "clothing","cloud","club","coach","coal","coast","coat","coffee",
  "cold","collect","college","colony","color","column","combination","combine",
  "come","comfortable","coming","command","common","community","company","compare",
  "compass","complete","completely","complex","composed","composition","compound","concerned",
  "condition","congress","connected","consider","consist","consonant","constantly","construction",
  "contain","continent","continued","contrast","control","conversation","cook","cookies",
  "cool","copper","copy","corn","corner","correct","correctly","cost",
  "cotton","could","count","country","couple","courage","course","court",
  "cover","cow","cowboy","crack","cream","create","creature","crew",
  "crop","cross","crowd","cry","cup","curious","current","curve",
  "customs","cut","cutting","daily","damage","dance","danger","dangerous",
  "dark","darkness","date","daughter","dawn","day","dead","deal",
  "dear","death","decide","declared","deep","deeply","deer","definition",
  "degree","depend","depth","describe","desert","design","desk","detail",
  "determine","develop","development","diagram","diameter","did","die","differ",
  "difference","different","difficult","difficulty","dig","dinner","direct","direction",
  "directly","dirt","dirty","disappear","discover","discovery","discuss","discussion",
  "disease","dish","distance","distant","divide","division","do","doctor",
  "does","dog","doing","doll","dollar","done","donkey","door",
  "dot","double","doubt","down","dozen","draw","drawn","dream",
  "dress","drew","dried","drink","drive","driven","driver","driving",
  "drop","dropped","drove","dry","duck","due","dug","dull",
  "during","dust","duty","each","eager","ear","earlier","early",
  "earn","earth","easier","easily","east","easy","eat","eaten",
  "edge","education","effect","effort","egg","eight","either","electric",
  "electricity","element","elephant","eleven","else","empty","end","enemy",
  "energy","engine","engineer","enjoy","enough","enter","entire","entirely",
  "environment","equal","equally","equator","equipment","escape","especially","essential",
  "establish","even","evening","event","eventually","ever","every","everybody",
  "everyone","everything","everywhere","evidence","exact","exactly","examine","example",
  "excellent","except","exchange","excited","excitement","exciting","exclaimed","exercise",
  "exist","expect","experience","experiment","explain","explanation","explore","express",
  "expression","extra","eye","face","facing","fact","factor","factory",
  "failed","fair","fairly","fall","fallen","familiar","family","famous",
  "far","farm","farmer","farther","fast","fastened","faster","fat",
  "father","favorite","fear","feathers","feature","fed","feed","feel",
  "feet","fell","fellow","felt","fence","few","fewer","field",
  "fierce","fifteen","fifth","fifty","fight","fighting","figure","fill",
  "film","final","finally","find","fine","finest","finger","finish",
  "fire","fireplace","firm","first","fish","five","fix","flag",
  "flame","flat","flew","flies","flight","floating","floor","flow",
  "flower","fly","fog","folks","follow","food","foot","football",
  "for","force","foreign","forest","forget","forgot","forgotten","form",
  "former","fort","forth","forty","forward","fought","found","four",
  "fourth","fox","frame","free","freedom","frequently","fresh","friend",
  "friendly","frighten","frog","from","front","frozen","fruit","fuel",
  "full","fully","fun","function","funny","fur","furniture","further",
  "future","gain","game","garage","garden","gas","gasoline","gate",
  "gather","gave","general","generally","gentle","gently","get","getting",
  "giant","gift","girl","give","given","giving","glad","glass",
  "globe","go","goes","gold","golden","gone","good","goose",
  "got","government","grabbed","grade","gradually","grain","grandfather","grandmother",
  "graph","grass","gravity","gray","great","greater","greatest","greatly",
  "green","grew","ground","group","grow","grown","growth","guard",
  "guess","guide","gulf","gun","habit","had","hair","half",
  "halfway","hall","hand","handle","handsome","hang","happen","happened",
  "happily","happy","harbor","hard","harder","hardly","has","hat",
  "have","having","hay","he","headed","heading","health","heard",
  "hearing","heart","heat","heavy","height","held","hello","help",
  "helpful","her","herd","here","herself","hidden","hide","high",
  "higher","highest","highway","hill","him","himself","his","history",
  "hit","hold","hole","hollow","home","honor","hope","horn",
  "horse","hospital","hot","hour","house","how","however","huge",
  "human","hundred","hung","hungry","hunt","hunter","hurried","hurry",
  "hurt","husband","ice","idea","identity","if","ill","image",
  "imagine","immediately","importance","important","impossible","improve","in","inch",
  "include","including","income","increase","indeed","independent","indicate","individual",
  "industrial","industry","influence","information","inside","instance","instant","instead",
  "instrument","interest","interior","into","introduced","invented","involved","iron",
  "is","island","it","its","itself","jack","jar","jet",
  "job","join","joined","journey","joy","judge","jump","jungle",
  "just","keep","kept","key","kids","kill","kind","kitchen",
  "knew","knife","know","knowledge","known","label","labor","lack",
  "lady","laid","lake","lamp","land","language","large","larger",
  "largest","last","late","later","laugh","law","lay","layers",
  "lead","leader","leaf","learn","least","leather","leave","leaving",
  "led","left","leg","length","lesson","let","letter","level",
  "library","lie","life","lift","light","like","likely","limited",
  "line","lion","lips","liquid","list","listen","little","live",
  "living","load","local","locate","location","log","lonely","long",
  "longer","look","loose","lose","loss","lost","lot","loud",
  "love","lovely","low","lower","luck","lucky","lunch","lungs",
  "lying","machine","machinery","mad","made","magic","magnet","mail",
  "main","mainly","major","make","making","man","managed","manner",
  "manufacturing","many","map","mark","market","married","mass","massage",
  "master","material","mathematics","matter","may","maybe","me","meal",
  "mean","means","meant","measure","meat","medicine","meet","melted",
  "member","memory","men","mental","merely","met","metal","method",
  "mice","middle","might","mighty","mile","military","milk","mill",
  "mind","mine","minerals","minute","mirror","missing","mission","mistake",
  "mix","mixture","model","modern","molecular","moment","money","monkey",
  "month","mood","moon","more","morning","most","mostly","mother",
  "motion","motor","mountain","mouse","mouth","move","movement","movie",
  "moving","mud","muscle","music","musical","must","my","myself",
  "mysterious","nails","name","nation","national","native","natural","naturally",
  "nature","near","nearby","nearer","nearest","nearly","necessary","neck",
  "needed","needle","needs","negative","neighbor","neighborhood","nervous","nest",
  "never","new","news","newspaper","next","nice","night","nine",
  "no","nobody","nodded","noise","none","noon","nor","north",
  "nose","not","note","noted","nothing","notice","noun","now",
  "number","numeral","nuts","object","observe","obtain","occasionally","occur",
  "ocean","of","off","offer","office","officer","official","oil",
  "old","older","oldest","on","once","one","only","onto",
  "open","operation","opinion","opportunity","opposite","or","orange","orbit",
  "order","ordinary","organization","organized","origin","original","other","ought",
  "our","ourselves","out","outer","outline","outside","over","own",
  "owner","oxygen","pack","package","page","paid","pain","paint",
  "pair","palace","pale","pan","paper","paragraph","parallel","parent",
  "park","part","particles","particular","particularly","partly","parts","party",
  "pass","passage","past","path","pattern","pay","peace","pen",
  "pencil","people","per","percent","perfect","perfectly","perhaps","period",
  "person","personal","pet","phrase","physical","piano","pick","picture",
  "pictured","pie","piece","pig","pile","pilot","pine","pink",
  "pipe","pitch","place","plain","plan","plane","planet","planned",
  "planning","plant","plastic","plate","plates","play","pleasant","please",
  "pleasure","plenty","plural","plus","pocket","poem","poet","poetry",
  "point","pole","police","policeman","political","pond","pony","pool",
  "poor","popular","population","porch","port","position","positive","possible",
  "possibly","post","pot","potatoes","pound","pour","powder","power",
  "powerful","practical","practice","prepare","present","president","press","pressure",
  "pretty","prevent","previous","price","pride","primitive","principal","principle",
  "printed","private","prize","probably","problem","process","produce","product",
  "production","program","progress","promised","proper","properly","property","protection",
  "proud","prove","provide","public","pull","pupil","pure","purple",
  "purpose","push","put","putting","quarter","queen","question","quick",
  "quickly","quiet","quietly","quite","rabbit","race","radio","railroad",
  "rain","raise","ran","ranch","range","rapidly","rate","rather",
  "raw","rays","reach","read","reader","ready","real","realize",
  "rear","reason","recall","receive","recent","recently","recognize","record",
  "red","refer","refused","region","regular","related","relationship","religious",
  "remain","remarkable","remember","remove","repeat","replace","replied","report",
  "represent","require","research","respect","rest","result","return","review",
  "rhyme","rhythm","rice","rich","ride","riding","right","ring",
  "rise","rising","river","road","roar","rock","rocket","rocky",
  "rod","roll","roof","room","root","rope","rose","rough",
  "round","route","row","rubbed","rubber","rule","ruler","run",
  "running","rush","sad","saddle","safe","safety","said","sail",
  "sale","salmon","salt","same","sand","sang","sat","satellites",
  "satisfied","save","saved","saw","say","scale","scared","scene",
  "school","science","scientific","scientist","score","screen","sea","search",
  "season","seat","second","secret","section","see","seed","seeing",
  "seems","seen","seldom","select","selection","sell","send","sense",
  "sent","sentence","separate","series","serious","serve","service","sets",
  "setting","settle","settlers","seven","several","shade","shadow","shake",
  "shaking","shall","shallow","shape","share","sharp","she","sheep",
  "sheet","shelf","shells","shelter","shine","shinning","ship","shirt",
  "shoe","shoot","shop","shore","short","shorter","shot","should",
  "shoulder","shout","show","shown","shut","sick","sides","sight",
  "sign","signal","silence","silent","silk","silly","silver","similar",
  "simple","simplest","simply","since","sing","single","sink","sister",
  "sit","sitting","situation","six","size","skill","skin","sky",
  "slabs","slave","sleep","slept","slide","slight","slightly","slip",
  "slipped","slope","slow","slowly","small","smaller","smallest","smell",
  "smile","smoke","smooth","snake","snow","so","soap","social",
  "society","soft","softly","soil","solar","sold","soldier","solid",
  "solution","solve","some","somebody","somehow","someone","something","sometime",
  "somewhere","son","song","soon","sort","sound","source","south",
  "southern","space","speak","special","species","specific","speech","speed",
  "spell","spend","spent","spider","spin","spirit","spite","split",
  "spoken","sport","spread","spring","square","stage","stairs","stand",
  "standard","star","stared","start","state","statement","station","stay",
  "steady","steam","steel","steep","stems","step","stepped","stick",
  "stiff","still","stock","stomach","stone","stood","stop","stopped",
  "store","storm","story","stove","straight","strange","stranger","straw",
  "stream","street","strength","stretch","strike","string","strip","strong",
  "stronger","struck","structure","struggle","stuck","student","studied","studying",
  "subject","substance","success","successful","such","sudden","suddenly","sugar",
  "suggest","suit","sum","summer","sun","sunlight","supper","supply",
  "support","suppose","sure","surface","surprise","surrounded","swam","sweet",
  "swept","swim","swimming","swing","swung","syllable","symbol","system",
  "table","tail","take","taken","tales","talk","tall","tank",
  "tape","task","taste","taught","tax","tea","teach","teacher",
  "team","tears","teeth","telephone","television","tell","temperature","ten",
  "tent","term","terrible","test","than","thank","that","thee",
  "them","themselves","then","theory","there","therefore","these","they",
  "thick","thin","thing","think","third","thirty","this","those",
  "thou","though","thought","thousand","thread","three","threw","throat",
  "through","throughout","throw","thrown","thumb","thus","thy","tide",
  "tie","tight","tightly","till","time","tin","tiny","tip",
  "tired","title","to","tobacco","today","together","told","tomorrow",
  "tone","tongue","tonight","too","took","tool","top","topic",
  "torn","total","touch","toward","tower","town","toy","trace",
  "track","trade","traffic","trail","train","transportation","trap","travel",
  "treated","tree","triangle","tribe","trick","tried","trip","troops",
  "tropical","trouble","truck","trunk","truth","try","tube","tune",
  "turn","twelve","twenty","twice","two","type","typical","uncle",
  "under","underline","understanding","unhappy","union","unit","universe","unknown",
  "unless","until","unusual","up","upon","upper","upward","us",
  "use","useful","using","usual","usually","valley","valuable","value",
  "vapor","variety","various","vast","vegetable","verb","vertical","very",
  "vessels","victory","view","village","visit","visitor","voice","volume",
  "vote","vowel","voyage","wagon","wait","walk","wall","want",
  "war","warm","warn","was","wash","waste","watch","water",
  "wave","way","we","weak","wealth","wear","weather","week",
  "weigh","weight","welcome","well","went","were","west","western",
  "wet","whale","what","whatever","wheat","wheel","when","whenever",
  "where","wherever","whether","which","while","whispered","whistle","white",
  "who","whole","whom","whose","why","wide","widely","wife",
  "wild","will","willing","win","wind","window","wing","winter",
  "wire","wise","wish","with","within","without","wolf","women",
  "won","wonder","wonderful","wood","wooden","wool","word","wore",
  "work","worker","world","worried","worry","worse","worth","would",
  "wrapped","write","writer","writing","written","wrong","wrote","yard",
  "year","yellow","yes","yesterday","yet","you","young","younger",
  "your","yourself","youth","zero","zebra","zipper","zoo","zulu"
];

let scene, renderer, camera, canvas;

let cameraRadius, cameraAngle;

let lastTimestamp = 0, dt;

const keyEnum = {}, objects = {};

let peer, connections = [], serverID, peerID, hosting, nickname;

class Player {
	constructor(controls) {
		this.xVel = 0;
		this.yVel = 0;
		this.zVel = 0;

		this.controls = controls;

		this.walkingSpeed = 10;
		this.sprintFactor = 2;
		this.speed = this.walkingSpeed;
		this.sprinting = false;

		this.sensitivity = 0.003;

		this.onGround = true;
		this.jumpVel = 8;
		this.gravity = this.jumpVel * 2.5;
		// w s a d jump sprint

		const gltf = assets.copy('player.glb');
		const mesh = gltf.scene;
		const animations = gltf.animations;
		let actions = [], activeAction;

		mesh.traverse( node => {
			if (node.isMesh) {
				node.castShadow = true;
				node.receiveShadow = true;
			}
		} );

		mesh.rotation.y = 180 * Math.PI/180

		// camera setting
		camera.position.set( -2, 10, -15);
		camera.rotation.set(-160 * Math.PI/180, 0, 180 * Math.PI/180);
		cameraRadius = Math.sqrt(camera.position.z*camera.position.z + camera.position.y*camera.position.y);
		cameraAngle = Math.acos(-camera.position.z/cameraRadius);
		mesh.add( camera );

		const gridHelper = new THREE.GridHelper( 1000, 1000, 0x0000ff, 0x808080  );
		scene.add( gridHelper );

		// Animation
		const mixer = new THREE.AnimationMixer( mesh );

		for (let i = 0; i < animations.length; i ++) {
			const clip = animations[i];
			const action = mixer.clipAction( clip );
			if (clip.name === 'Jump') {
				action.setLoop( THREE.LoopOnce )
			}
			actions[ clip.name ] = action;
		}

		activeAction = actions[ 'Idle' ];
		activeAction.play();

		scene.add(mesh);

		// set to this
		this.mixer = mixer;
		this.actions = actions;
		this.activeAction = activeAction;
		this.mesh = mesh;

		// event listeners
		canvas.addEventListener('click', () => {
			document.body.requestPointerLock();
			if (document.body.requestFullscreen) {
				document.body.requestFullscreen();
			} else if (document.body.mozRequestFullScreen) {
				document.body.mozRequestFullScreen();
			} else if (document.body.webkitRequestFullscreen) {
				document.body.webkitRequestFullscreen();
			} else if (document.body.msRequestFullscreen) {
				document.body.msRequestFullscreen();
			}
		});

		window.addEventListener('blur', event => {
			for (const property in keyEnum) {
				keyEnum[property] = false;
			}
		});

		window.addEventListener( 'resize', () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		});

		document.addEventListener('mousemove', event => {
			let dx = event.movementX * this.sensitivity;
			const dy = event.movementY * this.sensitivity;
			const newCameraAngle = cameraAngle + dy;
			if (dx != 0) {
				if (dx > 0.1)
					dx = 0.1;
				this.mesh.rotation.y -= dx;
			}
			if (dy != 0 && newCameraAngle < 1.1 && newCameraAngle > 0.1) {
				cameraAngle = newCameraAngle;
				camera.position.z = -Math.cos(cameraAngle) * cameraRadius;
				camera.position.y = Math.sin(cameraAngle) * cameraRadius;
				camera.rotation.x += dy;
			}
		});

		document.addEventListener('keydown', event => {
			keyEnum[event.key.toLowerCase()] = true;
		});

		document.addEventListener('keyup', event => {
			keyEnum[event.key.toLowerCase()] = false;
		});

		document.addEventListener('wheel', event => {
			if (event.wheelDeltaY < 0) {
				const newZoom = camera.zoom - 0.05;
				if (newZoom > 0.65)
					camera.zoom = newZoom;
				else
					camera.zoom = 0.65;
			}
			else {
				const newZoom = camera.zoom + 0.05;
				if (newZoom < 1.65)
					camera.zoom = newZoom;
				else
					camera.zoom = 1.65;
			}
			camera.updateProjectionMatrix();
		});

		requestAnimationFrame(animate);
	}

	move() {
		const pos = this.mesh.position;
		const controls = this.controls;
		const newYVel = (this.yVel - this.gravity * dt) * dt;
		let speed = this.speed;

		let xVel = 0;
		let yVel = this.yVel;
		let zVel = 0;

		if (pos.y + newYVel > 0) {
			yVel -= this.gravity * dt;
		} else if (yVel < 0) {
			yVel = 0;
			pos.y = 0;
		}

		if (keyEnum[controls[0]]) {
			zVel -= 1;
		}
		if (keyEnum[controls[1]]) {
			zVel += 1;
		}
		if (keyEnum[controls[2]]) {
			xVel -= 1;
		}
		if (keyEnum[controls[3]]) {
			xVel += 1;
		}
		if (pos.y === 0) {
			if (keyEnum[controls[4]]) {
				yVel += this.jumpVel;
				fadeToAction.call(this, 'Jump', 0.2, 0.);
			}
			if (keyEnum[controls[5]]) {
				speed *= this.sprintFactor;
			}
		}

		const magnitude = Math.sqrt(xVel*xVel + zVel*zVel);
		if (magnitude > 1) {
			xVel = xVel / magnitude;
			zVel = zVel / magnitude;
		}

		let dir = 1
		if (xVel > 0 || zVel > 0) {
			dir = -1;
		}

		if (pos.y === 0) { // maybe too spammy? TODO
			if (speed > this.walkingSpeed || speed > this.walkingSpeed) {
				fadeToAction.call(this, 'Running', 0.2, dir);
			}
			else if (Math.abs(xVel) > 0 || Math.abs(zVel) > 0) {
				fadeToAction.call(this, 'Walking', 0.2, dir);
			}
			else {
				fadeToAction.call(this, 'Idle', 0.2);
			}
		}

		pos.x += (Math.sin(this.mesh.rotation.y + Math.PI) * zVel - Math.cos(this.mesh.rotation.y) * xVel) * dt * speed;
		pos.z += (Math.cos(this.mesh.rotation.y + Math.PI) * zVel + Math.sin(this.mesh.rotation.y) * xVel) * dt * speed;
		pos.y += yVel * dt;

		this.yVel = yVel;

		this.mesh.position.set(pos.x, pos.y, pos.z);
	}

	sendPacket() {
		const pos = this.mesh.position;
		const data = {
			id: peerID,
			type: 'update',
			pos: {
				x: pos.x,
				y: pos.y,
				z: pos.z
			},
			rotationY: this.mesh.rotation.y,
			animationName: this.activeAction['_clip']['name'],
			animationDir: this.activeAction.timeScale
		}

		for (const c of Object.values(connections)) {
			c[0].send(data);
		}
	}

	update() {
		this.move();
		this.mixer.update(dt);
		this.sendPacket();
	}
}

class OtherPlayer {
	constructor(id) {
		this.pos = new THREE.Vector3(0, 0, 0);
		this.rotationY = 0;
		this.id = id;

		console.log(id)

		if (hosting) {
			connections[id][0].send({type: 'playerList', playerList: Object.keys(connections)});
		}

		// gltf models
		const gltf = assets.copy('player.glb');
		const mesh = gltf.scene;
		const animations = gltf.animations;
		let actions = [], activeAction;
		const animationName = 'Idle';

		mesh.traverse( node => {
			if (node.isMesh) {
				node.castShadow = true;
				node.receiveShadow = true;
			}
		} );

		// Animation
		const mixer = new THREE.AnimationMixer( mesh );

		for (let i = 0; i < animations.length; i ++) {
			const clip = animations[i];
			const action = mixer.clipAction( clip );
			if (clip.name === 'Jump') {
				action.setLoop( THREE.LoopOnce )
			}
			actions[ clip.name ] = action;
		}

		activeAction = actions[ animationName ];
		activeAction.play();

		// set to this
		this.mixer = mixer;
		this.actions = actions;
		this.activeAction = activeAction;
		this.animationName = animationName;
		this.animationDir = 1;
		this.mesh = mesh;

		objects[id] = this;
		scene.add(mesh);
	}

	delete() {
		scene.remove(this.mesh);
	}

	update() {
		const pos = this.pos;
		this.mesh.position.set(pos.x, pos.y, pos.z);
		this.mesh.rotation.y = this.rotationY;
		this.mixer.update(dt);
		fadeToAction.call(this, this.animationName, 0.2, this.animationDir);
	}

	addOverhead(message) {
		console.log('added overhead')
		const fontsize = 24;
		const tempCanvas = document.createElement('canvas');
		tempCanvas.width = 512;
		tempCanvas.height = 256;
		const context = tempCanvas.getContext('2d');
		context.font = 'Bold ' + fontsize + 'px sans-serif';
		context.fillStyle   = 'rgba(255, 255, 255, 0.5)';
		context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
		context.fillStyle = '#000';
		context.fillText( message, (tempCanvas.width)/2 - context.measureText(message).width/2, fontsize);

		const texture = new THREE.Texture(tempCanvas)
		texture.needsUpdate = true;
		const sprite = new THREE.Sprite( new THREE.SpriteMaterial( { map: texture} ) );
		sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);

		const overhead = sprite;
		overhead.position.setY(2.8);
		this.mesh.add(overhead);
	}
}

const assets = {
	copy(asset) {
		const gltf = this[asset]
		const clone = {
			animations: gltf.animations,
			scene: gltf.scene.clone()
		};

		const skinnedMeshes = {};

		gltf.scene.traverse(node => {
			if (node.isSkinnedMesh) {
				skinnedMeshes[node.name] = node;
			}
		});

		const cloneBones = {};
		const cloneSkinnedMeshes = {};

		clone.scene.traverse(node => {
			if (node.isBone) {
				cloneBones[node.name] = node;
			}

			if (node.isSkinnedMesh) {
				cloneSkinnedMeshes[node.name] = node;
			}
		});

		for (let name in skinnedMeshes) {
			const skinnedMesh = skinnedMeshes[name];
			const skeleton = skinnedMesh.skeleton;
			const cloneSkinnedMesh = cloneSkinnedMeshes[name];

			const orderedCloneBones = [];

			for (let i = 0; i < skeleton.bones.length; ++i) {
				const cloneBone = cloneBones[skeleton.bones[i].name];
				orderedCloneBones.push(cloneBone);
			}

			cloneSkinnedMesh.bind(
				new THREE.Skeleton(orderedCloneBones, skeleton.boneInverses),
				cloneSkinnedMesh.matrixWorld);
		}

		return clone;
	}
};

function init() {
	let geo, mat, mesh;

	if (canvas !== undefined)
		return

	//canvas
	canvas = document.getElementById('c');
	document.getElementById('log').textContent = 'Server Code: ' + serverID;
	document.getElementById('launcher').remove();
	document.getElementById('loading').remove();
	document.getElementById('game').style.display = 'block';

	//scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x0080ff );
	scene.fog = new THREE.Fog(new THREE.Color( 0x0080ff ), 150, 200);

	// camera
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );

	// renderer
	renderer = new THREE.WebGLRenderer({ canvas: canvas });
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;

	// lighting
	const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
	hemiLight.color.setHSL( 0.6, 1, 0.6 );
	hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
	hemiLight.position.set( 0, 100, 0 );
	scene.add( hemiLight );

	const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
	scene.add( hemiLightHelper );

	const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
	dirLight.color.setHSL( 0.1, 1, 0.95 );
	dirLight.position.set( - 1, 1.75, 1 );
	dirLight.position.multiplyScalar( 100 );
	scene.add( dirLight );

	dirLight.castShadow = true;

	dirLight.shadow.mapSize.width = 2048;
	dirLight.shadow.mapSize.height = 2048;

	var d = 50;

	dirLight.shadow.camera.left = - d;
	dirLight.shadow.camera.right = d;
	dirLight.shadow.camera.top = d;
	dirLight.shadow.camera.bottom = - d;

	dirLight.shadow.camera.far = 3500;
	dirLight.shadow.bias = - 0.0001;

	const dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 10 );
	scene.add( dirLightHeper );

	//floor
	geo = new THREE.PlaneBufferGeometry( 2000, 2000 );
	mat = new THREE.MeshPhongMaterial( {color: 0x718E3E});
	mesh = new THREE.Mesh( geo, mat);
	mesh.position.y = 0;
	mesh.rotation.x = - Math.PI / 2;
	mesh.receiveShadow = true;
	scene.add( mesh );

	//player
	objects['player'] = new Player(['w', 's', 'a', 'd', ' ', 'shift']);
}

function fadeToAction(name, duration, timeScale = 1) {
	if (this.actions[ name ] === this.activeAction && this.activeAction.timeScale === timeScale) {
		return
	}

	const previousAction = this.activeAction;
	this.activeAction = this.actions[ name ];

	previousAction.fadeOut( duration );

	this.activeAction
		.reset()
		.setEffectiveTimeScale( timeScale )
		.setEffectiveWeight( 1 )
		.fadeIn( duration )
		.play();
}

function animate(timestamp) {
	timestamp /= 1000;
	dt = timestamp - lastTimestamp;
	lastTimestamp = timestamp;

	for (const property in objects) {
		objects[property].update();
	}

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
};

function addNewConnection(conn) {
	const id = conn.peer;

	if (id === peerID || connections.hasOwnProperty(id))
		return;

	conn.on('open', () => {
		if (connections.hasOwnProperty(id))
			return;
		if (id === serverID) {
			init();
		}
		connections[id] = [conn];
		new OtherPlayer(id);
		conn.send({
			type: 'overhead',
			id: peerID,
			nickname: nickname
		})
	});

	conn.on('data', (data) => {
		if (objects.hasOwnProperty(data.id)) {
			const object = objects[id];
			switch (data.type) {
				case 'update':
					const pos = data.pos;
					object.pos.set(pos.x, pos.y, pos.z);
					object.rotationY = data.rotationY;
					object.animationName = data.animationName;
					object.animationDir = data.animationDir;
					break;
				case 'overhead':
					object.addOverhead(data.nickname);
					break;
			}
		} else {
			switch (data.type) {
				case 'playerList':
					const playerList = data.playerList;
					for (let i = 0; i < playerList.length; i++)
						addNewConnection(peer.connect(playerList[i]));
					break;
			}
		}
	});

	conn.on('error', (err) => {
		const conn = peer.connect(id);
		addNewConnection(conn);
	})

	conn.on('close', () => {
		const id = conn.peer;
		if (objects[id]) {
			objects[id].delete();
			delete objects[id];
		}
		delete connections[id];
	})
}

function newPeer() {
	const options = {
		secure: true,
		host: 'peerjs-cloud9c.herokuapp.com', 
	}

	if (hosting) {
		let id = "";
		for (let i = 0; i < 3; i++) {
			id += wordList.splice(Math.floor(Math.random()*wordList.length), 1).toString();
		}
		peer = new Peer(id, options);
	} else {
		peer = new Peer(options);
	}

	peer.on('open', (id) => {
		peerID = id;
		if (hosting) {
			serverID = id;
			init();
		} else {
			const conn = peer.connect(serverID);
			addNewConnection(conn);
		}
	});

	peer.on('connection', addNewConnection);

	peer.on('error', (err) => { //TODO, add all errors
		if (err.type === 'unavailable-id')
			newPeer();
		console.log(err, err.type);
	});

	peer.on('disconnected', () => {
		console.log("reconnecting")
		peer.reconnect();
	});
}

function loadGame(event) {
	event.preventDefault();
	document.getElementById('joinSubmit').removeEventListener('submit', loadGame);
	document.getElementById('hostSubmit').removeEventListener('submit', loadGame);
	document.getElementById('launcher').style.display = 'none';
	document.getElementById('loading').style.display = 'flex';

	const manager = new THREE.LoadingManager();
	const modelLoader = new GLTFLoader(manager);
	const models = ['player.glb'];

	for (let i = 0; i < models.length; i++) {
		modelLoader.load('assets/models/' + models[i], gltf => {
			assets[models[i]] = gltf;
		});
	}

	manager.onProgress = (url, itemsLoaded, itemsTotal) => {
		document.getElementById('loadingInfo').textContent = 'Loading: ' + url;
		document.getElementById('barPercentage').style.width = itemsLoaded / itemsTotal * 100 + '%';
	}

	manager.onLoad = () => {
		hosting = event.target.id === 'hostSubmit';
		document.getElementById('loadingInfo').textContent = 'Connecting to server...';
		nickname = document.getElementsByClassName('nickname')[+hosting].value;
		localStorage.setItem('nickname', nickname);
		serverID = document.getElementById('join').value.replace(/\s/g,'');

		newPeer();

		window.addEventListener('beforeunload', (event) => {
			event.preventDefault();
			event.returnValue = '';
		});

		window.addEventListener('unload', () => {
			peer.destroy();
		})
	}
}

document.getElementById('joinSubmit').addEventListener('submit', loadGame);
document.getElementById('hostSubmit').addEventListener('submit', loadGame);
document.getElementById('nextButton').addEventListener('click', () => {
	document.getElementById('splashPage').style.display = 'none';
	document.getElementById('hostSubmit').style.display = 'block';
})

window.addEventListener('load', () => {
	const oldNickname = localStorage.getItem('nickname');
	if (oldNickname !== null) {
		document.getElementsByClassName('nickname')[0].value = oldNickname;
		document.getElementsByClassName('nickname')[1].value = oldNickname;
	}
});