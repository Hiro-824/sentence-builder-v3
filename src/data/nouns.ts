import { Generator, NounConfig } from "@/grammar/generator";
import { Block } from "@/models/block";
import { timeBlocks } from "./time-nominals";

const generator = new Generator();

const configBook: NounConfig = {
    id: "noun_book",
    isCountable: true,
    singularForm: "book",
    pluralForm: "books",
    translation: "本"
};

const configChild: NounConfig = {
    id: "noun_child",
    isCountable: true,
    singularForm: "child",
    pluralForm: "children",
    translation: "子供",
    pluralTranslation: "子供たち"
};

const configInformation: NounConfig = {
    id: "noun_information",
    isCountable: false,
    singularForm: "information",
    translation: "情報"
};

const configWater: NounConfig = {
    id: "noun_water",
    isCountable: false,
    singularForm: "water",
    translation: "水"
};

const configBird: NounConfig = {
    id: "noun_bird",
    isCountable: true,
    singularForm: "bird",
    pluralForm: "birds",
    translation: "鳥"
};

const configDog: NounConfig = {
    id: "noun_dog",
    isCountable: true,
    singularForm: "dog",
    pluralForm: "dogs",
    translation: "犬"
};

const configCat: NounConfig = {
    id: "noun_cat",
    isCountable: true,
    singularForm: "cat",
    pluralForm: "cats",
    translation: "猫"
};

const configHand: NounConfig = {
    id: "noun_hand",
    isCountable: true,
    singularForm: "hand",
    pluralForm: "hands",
    translation: "手"
};

const configStudent: NounConfig = {
    id: "noun_student",
    isCountable: true,
    singularForm: "student",
    pluralForm: "students",
    translation: "学生"
};

const configName: NounConfig = {
    id: "noun_name",
    isCountable: true,
    singularForm: "name",
    pluralForm: "names",
    translation: "名前"
};

const configBag: NounConfig = {
    id: "noun_name",
    isCountable: true,
    singularForm: "bag",
    pluralForm: "bags",
    translation: "かばん"
};

const configBush: NounConfig = {
    id: "noun_bush",
    isCountable: true,
    singularForm: "bush",
    pluralForm: "bushes",
    translation: "低木"
};

const configPen: NounConfig = {
    id: "noun_pen",
    isCountable: true,
    singularForm: "pen",
    pluralForm: "pens",
    translation: "ペン"
};

const configTeacher: NounConfig = {
    id: "noun_teacher",
    isCountable: true,
    singularForm: "teacher",
    pluralForm: "teachers",
    translation: "先生"
};

const configBus: NounConfig = {
    id: "noun_bus",
    isCountable: true,
    singularForm: "bus",
    pluralForm: "buses",
    translation: "バス"
};

const configStation: NounConfig = {
    id: "noun_station",
    isCountable: true,
    singularForm: "station",
    pluralForm: "stations",
    translation: "駅"
};

const configBoy: NounConfig = {
    id: "noun_boy",
    isCountable: true,
    singularForm: "boy",
    pluralForm: "boys",
    translation: "少年",
    pluralTranslation: "少年たち"
};

const configGirl: NounConfig = {
    id: "noun_girl",
    isCountable: true,
    singularForm: "girl",
    pluralForm: "girls",
    translation: "少女",
    pluralTranslation: "少女たち"
};

const configMan: NounConfig = {
    id: "noun_man",
    isCountable: true,
    singularForm: "man",
    pluralForm: "men",
    translation: "男性",
    pluralTranslation: "男性たち"
};

const configWoman: NounConfig = {
    id: "noun_woman",
    isCountable: true,
    singularForm: "woman",
    pluralForm: "women",
    translation: "女性",
    pluralTranslation: "女性たち"
};

const configHouse: NounConfig = {
    id: "noun_house",
    isCountable: true,
    singularForm: "house",
    pluralForm: "houses",
    translation: "家"
};

const configRoom: NounConfig = {
    id: "noun_room",
    isCountable: true,
    singularForm: "room",
    pluralForm: "rooms",
    translation: "部屋"
};

const configTable: NounConfig = {
    id: "noun_table",
    isCountable: true,
    singularForm: "table",
    pluralForm: "tables",
    translation: "テーブル"
};

const configPhone: NounConfig = {
    id: "noun_phone",
    isCountable: true,
    singularForm: "phone",
    pluralForm: "phones",
    translation: "電話"
};

const configBathroom: NounConfig = {
    id: "noun_bathroom",
    isCountable: true,
    singularForm: "bathroom",
    pluralForm: "bathrooms",
    translation: "浴室"
};

const configSchool: NounConfig = {
    id: "noun_school",
    isCountable: true,
    singularForm: "school",
    pluralForm: "schools",
    translation: "学校"
};

const configClassroom: NounConfig = {
    id: "noun_classroom",
    isCountable: true,
    singularForm: "classroom",
    pluralForm: "classrooms",
    translation: "教室"
};

const configLesson: NounConfig = {
    id: "noun_lesson",
    isCountable: true,
    singularForm: "lesson",
    pluralForm: "lessons",
    translation: "授業"
};

const configHomework: NounConfig = {
    id: "noun_homework",
    isCountable: false,
    singularForm: "homework",
    translation: "宿題"
};

const configExam: NounConfig = {
    id: "noun_exam",
    isCountable: true,
    singularForm: "exam",
    pluralForm: "exams",
    translation: "試験"
};

const configTextbook: NounConfig = {
    id: "noun_textbook",
    isCountable: true,
    singularForm: "textbook",
    pluralForm: "textbooks",
    translation: "教科書"
};

const configOffice: NounConfig = {
    id: "noun_office",
    isCountable: true,
    singularForm: "office",
    pluralForm: "offices",
    translation: "オフィス"
};

const configManager: NounConfig = {
    id: "noun_manager",
    isCountable: true,
    singularForm: "manager",
    pluralForm: "managers",
    translation: "マネージャー"
};

const configClient: NounConfig = {
    id: "noun_client",
    isCountable: true,
    singularForm: "client",
    pluralForm: "clients",
    translation: "クライアント"
};

const configMeeting: NounConfig = {
    id: "noun_meeting",
    isCountable: true,
    singularForm: "meeting",
    pluralForm: "meetings",
    translation: "会議"
};

const configProject: NounConfig = {
    id: "noun_project",
    isCountable: true,
    singularForm: "project",
    pluralForm: "projects",
    translation: "プロジェクト"
};

const configDeadline: NounConfig = {
    id: "noun_deadline",
    isCountable: true,
    singularForm: "deadline",
    pluralForm: "deadlines",
    translation: "締め切り"
};

const configAirport: NounConfig = {
    id: "noun_airport",
    isCountable: true,
    singularForm: "airport",
    pluralForm: "airports",
    translation: "空港"
};

const configTicket: NounConfig = {
    id: "noun_ticket",
    isCountable: true,
    singularForm: "ticket",
    pluralForm: "tickets",
    translation: "チケット"
};

const configTrain: NounConfig = {
    id: "noun_train",
    isCountable: true,
    singularForm: "train",
    pluralForm: "trains",
    translation: "電車"
};

const configLuggage: NounConfig = {
    id: "noun_luggage",
    isCountable: false,
    singularForm: "luggage",
    translation: "荷物"
};

const configHotel: NounConfig = {
    id: "noun_hotel",
    isCountable: true,
    singularForm: "hotel",
    pluralForm: "hotels",
    translation: "ホテル"
};

const configPassport: NounConfig = {
    id: "noun_passport",
    isCountable: true,
    singularForm: "passport",
    pluralForm: "passports",
    translation: "パスポート"
};

const configHospital: NounConfig = {
    id: "noun_hospital",
    isCountable: true,
    singularForm: "hospital",
    pluralForm: "hospitals",
    translation: "病院"
};

const configDoctor: NounConfig = {
    id: "noun_doctor",
    isCountable: true,
    singularForm: "doctor",
    pluralForm: "doctors",
    translation: "医者"
};

const configNurse: NounConfig = {
    id: "noun_nurse",
    isCountable: true,
    singularForm: "nurse",
    pluralForm: "nurses",
    translation: "看護師"
};

const configMedicine: NounConfig = {
    id: "noun_medicine",
    isCountable: false,
    singularForm: "medicine",
    translation: "薬"
};

const configAppointment: NounConfig = {
    id: "noun_appointment",
    isCountable: true,
    singularForm: "appointment",
    pluralForm: "appointments",
    translation: "予約"
};

const configSymptom: NounConfig = {
    id: "noun_symptom",
    isCountable: true,
    singularForm: "symptom",
    pluralForm: "symptoms",
    translation: "症状"
};

const configPatient: NounConfig = {
    id: "noun_patient",
    isCountable: true,
    singularForm: "patient",
    pluralForm: "patients",
    translation: "患者"
};

const configKitchen: NounConfig = {
    id: "noun_kitchen",
    isCountable: true,
    singularForm: "kitchen",
    pluralForm: "kitchens",
    translation: "台所"
};

const configRecipe: NounConfig = {
    id: "noun_recipe",
    isCountable: true,
    singularForm: "recipe",
    pluralForm: "recipes",
    translation: "レシピ"
};

const configIngredient: NounConfig = {
    id: "noun_ingredient",
    isCountable: true,
    singularForm: "ingredient",
    pluralForm: "ingredients",
    translation: "材料"
};

const configMeal: NounConfig = {
    id: "noun_meal",
    isCountable: true,
    singularForm: "meal",
    pluralForm: "meals",
    translation: "食事"
};

const configChef: NounConfig = {
    id: "noun_chef",
    isCountable: true,
    singularForm: "chef",
    pluralForm: "chefs",
    translation: "シェフ"
};

const configVegetable: NounConfig = {
    id: "noun_vegetable",
    isCountable: true,
    singularForm: "vegetable",
    pluralForm: "vegetables",
    translation: "野菜"
};

const configDessert: NounConfig = {
    id: "noun_dessert",
    isCountable: true,
    singularForm: "dessert",
    pluralForm: "desserts",
    translation: "デザート"
};

const configForest: NounConfig = {
    id: "noun_forest",
    isCountable: true,
    singularForm: "forest",
    pluralForm: "forests",
    translation: "森"
};

const configRiver: NounConfig = {
    id: "noun_river",
    isCountable: true,
    singularForm: "river",
    pluralForm: "rivers",
    translation: "川"
};

const configMountain: NounConfig = {
    id: "noun_mountain",
    isCountable: true,
    singularForm: "mountain",
    pluralForm: "mountains",
    translation: "山"
};

const configTree: NounConfig = {
    id: "noun_tree",
    isCountable: true,
    singularForm: "tree",
    pluralForm: "trees",
    translation: "木"
};

const configWeather: NounConfig = {
    id: "noun_weather",
    isCountable: false,
    singularForm: "weather",
    translation: "天気"
};

const configClimate: NounConfig = {
    id: "noun_climate",
    isCountable: false,
    singularForm: "climate",
    translation: "気候"
};

const configOcean: NounConfig = {
    id: "noun_ocean",
    isCountable: true,
    singularForm: "ocean",
    pluralForm: "oceans",
    translation: "海"
};

const configComputer: NounConfig = {
    id: "noun_computer",
    isCountable: true,
    singularForm: "computer",
    pluralForm: "computers",
    translation: "コンピュータ"
};

const configInternet: NounConfig = {
    id: "noun_internet",
    isCountable: false,
    singularForm: "internet",
    translation: "インターネット"
};

const configSoftware: NounConfig = {
    id: "noun_software",
    isCountable: false,
    singularForm: "software",
    translation: "ソフトウェア"
};

const configCamera: NounConfig = {
    id: "noun_camera",
    isCountable: true,
    singularForm: "camera",
    pluralForm: "cameras",
    translation: "カメラ"
};

const configMessage: NounConfig = {
    id: "noun_message",
    isCountable: true,
    singularForm: "message",
    pluralForm: "messages",
    translation: "メッセージ"
};

const configRobot: NounConfig = {
    id: "noun_robot",
    isCountable: true,
    singularForm: "robot",
    pluralForm: "robots",
    translation: "ロボット"
};

const configGame: NounConfig = {
    id: "noun_game",
    isCountable: true,
    singularForm: "game",
    pluralForm: "games",
    translation: "ゲーム"
};

const configMatch: NounConfig = {
    id: "noun_match",
    isCountable: true,
    singularForm: "match",
    pluralForm: "matches",
    translation: "試合"
};

const configPlayer: NounConfig = {
    id: "noun_player",
    isCountable: true,
    singularForm: "player",
    pluralForm: "players",
    translation: "選手"
};

const configStadium: NounConfig = {
    id: "noun_stadium",
    isCountable: true,
    singularForm: "stadium",
    pluralForm: "stadiums",
    translation: "スタジアム"
};

const configTeam: NounConfig = {
    id: "noun_team",
    isCountable: true,
    singularForm: "team",
    pluralForm: "teams",
    translation: "チーム"
};

const configExercise: NounConfig = {
    id: "noun_exercise",
    isCountable: false,
    singularForm: "exercise",
    translation: "運動"
};

const configHobby: NounConfig = {
    id: "noun_hobby",
    isCountable: true,
    singularForm: "hobby",
    pluralForm: "hobbies",
    translation: "趣味"
};

const configPerson: NounConfig = {
    id: "noun_person",
    isCountable: true,
    singularForm: "person",
    pluralForm: "people",
    translation: "人",
    pluralTranslation: "人々"
};

const configFamily: NounConfig = {
    id: "noun_family",
    isCountable: true,
    singularForm: "family",
    pluralForm: "families",
    translation: "家族"
};

const configFriend: NounConfig = {
    id: "noun_friend",
    isCountable: true,
    singularForm: "friend",
    pluralForm: "friends",
    translation: "友達"
};

const configParent: NounConfig = {
    id: "noun_parent",
    isCountable: true,
    singularForm: "parent",
    pluralForm: "parents",
    translation: "親",
    pluralTranslation: "親たち"
};

const configMother: NounConfig = {
    id: "noun_mother",
    isCountable: true,
    singularForm: "mother",
    pluralForm: "mothers",
    translation: "母親",
    pluralTranslation: "母親たち"
};

const configFather: NounConfig = {
    id: "noun_father",
    isCountable: true,
    singularForm: "father",
    pluralForm: "fathers",
    translation: "父親",
    pluralTranslation: "父親たち"
};

const configSon: NounConfig = {
    id: "noun_son",
    isCountable: true,
    singularForm: "son",
    pluralForm: "sons",
    translation: "息子",
    pluralTranslation: "息子たち"
};

const configDaughter: NounConfig = {
    id: "noun_daughter",
    isCountable: true,
    singularForm: "daughter",
    pluralForm: "daughters",
    translation: "娘",
    pluralTranslation: "娘たち"
};

const configBaby: NounConfig = {
    id: "noun_baby",
    isCountable: true,
    singularForm: "baby",
    pluralForm: "babies",
    translation: "赤ちゃん",
    pluralTranslation: "赤ちゃんたち"
};

const configNeighbor: NounConfig = {
    id: "noun_neighbor",
    isCountable: true,
    singularForm: "neighbor",
    pluralForm: "neighbors",
    translation: "隣人",
    pluralTranslation: "隣人たち"
};

const configJob: NounConfig = {
    id: "noun_job",
    isCountable: true,
    singularForm: "job",
    pluralForm: "jobs",
    translation: "仕事"
};

const configWork: NounConfig = {
    id: "noun_work",
    isCountable: false,
    singularForm: "work",
    translation: "仕事"
};

const configCompany: NounConfig = {
    id: "noun_company",
    isCountable: true,
    singularForm: "company",
    pluralForm: "companies",
    translation: "会社"
};

const configMoney: NounConfig = {
    id: "noun_money",
    isCountable: false,
    singularForm: "money",
    translation: "お金"
};

const configFood: NounConfig = {
    id: "noun_food",
    isCountable: false,
    singularForm: "food",
    translation: "食べ物"
};

const configClothing: NounConfig = {
    id: "noun_clothing",
    isCountable: false,
    singularForm: "clothing",
    translation: "衣服"
};

const configAir: NounConfig = {
    id: "noun_air",
    isCountable: false,
    singularForm: "air",
    translation: "空気"
};

const configTimeConcept: NounConfig = {
    id: "noun_time",
    isCountable: false,
    singularForm: "time",
    translation: "時間"
};

const configLife: NounConfig = {
    id: "noun_life",
    isCountable: true,
    singularForm: "life",
    pluralForm: "lives",
    translation: "人生"
};

const configWorld: NounConfig = {
    id: "noun_world",
    isCountable: true,
    singularForm: "world",
    pluralForm: "worlds",
    translation: "世界"
};

const configThing: NounConfig = {
    id: "noun_thing",
    isCountable: true,
    singularForm: "thing",
    pluralForm: "things",
    translation: "物"
};

const configWay: NounConfig = {
    id: "noun_way",
    isCountable: true,
    singularForm: "way",
    pluralForm: "ways",
    translation: "方法"
};

const configProblem: NounConfig = {
    id: "noun_problem",
    isCountable: true,
    singularForm: "problem",
    pluralForm: "problems",
    translation: "問題"
};

const configIdea: NounConfig = {
    id: "noun_idea",
    isCountable: true,
    singularForm: "idea",
    pluralForm: "ideas",
    translation: "アイデア"
};

const configQuestion: NounConfig = {
    id: "noun_question",
    isCountable: true,
    singularForm: "question",
    pluralForm: "questions",
    translation: "質問"
};

const configAnswer: NounConfig = {
    id: "noun_answer",
    isCountable: true,
    singularForm: "answer",
    pluralForm: "answers",
    translation: "答え"
};

const configStory: NounConfig = {
    id: "noun_story",
    isCountable: true,
    singularForm: "story",
    pluralForm: "stories",
    translation: "物語"
};

const configLanguage: NounConfig = {
    id: "noun_language",
    isCountable: true,
    singularForm: "language",
    pluralForm: "languages",
    translation: "言語"
};

const configGrammar: NounConfig = {
    id: "noun_grammar",
    isCountable: false,
    singularForm: "grammar",
    translation: "文法"
};

const configMusic: NounConfig = {
    id: "noun_music",
    isCountable: false,
    singularForm: "music",
    translation: "音楽"
};

const configMovie: NounConfig = {
    id: "noun_movie",
    isCountable: true,
    singularForm: "movie",
    pluralForm: "movies",
    translation: "映画"
};

const configNews: NounConfig = {
    id: "noun_news",
    isCountable: false,
    singularForm: "news",
    translation: "ニュース"
};

const configCity: NounConfig = {
    id: "noun_city",
    isCountable: true,
    singularForm: "city",
    pluralForm: "cities",
    translation: "都市"
};

const configTown: NounConfig = {
    id: "noun_town",
    isCountable: true,
    singularForm: "town",
    pluralForm: "towns",
    translation: "町"
};

const configCountry: NounConfig = {
    id: "noun_country",
    isCountable: true,
    singularForm: "country",
    pluralForm: "countries",
    translation: "国"
};

const configStreet: NounConfig = {
    id: "noun_street",
    isCountable: true,
    singularForm: "street",
    pluralForm: "streets",
    translation: "通り"
};

const configRoad: NounConfig = {
    id: "noun_road",
    isCountable: true,
    singularForm: "road",
    pluralForm: "roads",
    translation: "道路"
};

const configStore: NounConfig = {
    id: "noun_store",
    isCountable: true,
    singularForm: "store",
    pluralForm: "stores",
    translation: "店"
};

const configRestaurant: NounConfig = {
    id: "noun_restaurant",
    isCountable: true,
    singularForm: "restaurant",
    pluralForm: "restaurants",
    translation: "レストラン"
};

const configMarket: NounConfig = {
    id: "noun_market",
    isCountable: true,
    singularForm: "market",
    pluralForm: "markets",
    translation: "市場"
};

const configPark: NounConfig = {
    id: "noun_park",
    isCountable: true,
    singularForm: "park",
    pluralForm: "parks",
    translation: "公園"
};

const configLibrary: NounConfig = {
    id: "noun_library",
    isCountable: true,
    singularForm: "library",
    pluralForm: "libraries",
    translation: "図書館"
};

const configApartment: NounConfig = {
    id: "noun_apartment",
    isCountable: true,
    singularForm: "apartment",
    pluralForm: "apartments",
    translation: "アパート"
};

const configCar: NounConfig = {
    id: "noun_car",
    isCountable: true,
    singularForm: "car",
    pluralForm: "cars",
    translation: "車"
};

const configBicycle: NounConfig = {
    id: "noun_bicycle",
    isCountable: true,
    singularForm: "bicycle",
    pluralForm: "bicycles",
    translation: "自転車"
};

const configChair: NounConfig = {
    id: "noun_chair",
    isCountable: true,
    singularForm: "chair",
    pluralForm: "chairs",
    translation: "椅子"
};

const configBed: NounConfig = {
    id: "noun_bed",
    isCountable: true,
    singularForm: "bed",
    pluralForm: "beds",
    translation: "ベッド"
};

const configDoor: NounConfig = {
    id: "noun_door",
    isCountable: true,
    singularForm: "door",
    pluralForm: "doors",
    translation: "ドア"
};

const configWindow: NounConfig = {
    id: "noun_window",
    isCountable: true,
    singularForm: "window",
    pluralForm: "windows",
    translation: "窓"
};

const configPlace: NounConfig = {
    id: "noun_place",
    isCountable: true,
    singularForm: "place",
    pluralForm: "places",
    translation: "場所"
};

const configCase: NounConfig = {
    id: "noun_case",
    isCountable: true,
    singularForm: "case",
    pluralForm: "cases",
    translation: "場合"
};

const configPoint: NounConfig = {
    id: "noun_point",
    isCountable: true,
    singularForm: "point",
    pluralForm: "points",
    translation: "ポイント"
};

const configGovernment: NounConfig = {
    id: "noun_government",
    isCountable: true,
    singularForm: "government",
    pluralForm: "governments",
    translation: "政府"
};

const configNumber: NounConfig = {
    id: "noun_number",
    isCountable: true,
    singularForm: "number",
    pluralForm: "numbers",
    translation: "数"
};

const configGroup: NounConfig = {
    id: "noun_group",
    isCountable: true,
    singularForm: "group",
    pluralForm: "groups",
    translation: "グループ"
};

const configFact: NounConfig = {
    id: "noun_fact",
    isCountable: true,
    singularForm: "fact",
    pluralForm: "facts",
    translation: "事実"
};

const configHome: NounConfig = {
    id: "noun_home",
    isCountable: true,
    singularForm: "home",
    pluralForm: "homes",
    translation: "家庭"
};

const configIssue: NounConfig = {
    id: "noun_issue",
    isCountable: true,
    singularForm: "issue",
    pluralForm: "issues",
    translation: "問題点"
};

const configSide: NounConfig = {
    id: "noun_side",
    isCountable: true,
    singularForm: "side",
    pluralForm: "sides",
    translation: "側"
};

const configCommunity: NounConfig = {
    id: "noun_community",
    isCountable: true,
    singularForm: "community",
    pluralForm: "communities",
    translation: "コミュニティ"
};

const configPresident: NounConfig = {
    id: "noun_president",
    isCountable: true,
    singularForm: "president",
    pluralForm: "presidents",
    translation: "大統領"
};

const configMinute: NounConfig = {
    id: "noun_minute",
    isCountable: true,
    singularForm: "minute",
    pluralForm: "minutes",
    translation: "分"
};

const configBody: NounConfig = {
    id: "noun_body",
    isCountable: true,
    singularForm: "body",
    pluralForm: "bodies",
    translation: "体"
};

const configFace: NounConfig = {
    id: "noun_face",
    isCountable: true,
    singularForm: "face",
    pluralForm: "faces",
    translation: "顔"
};

const configEye: NounConfig = {
    id: "noun_eye",
    isCountable: true,
    singularForm: "eye",
    pluralForm: "eyes",
    translation: "目"
};

const configHead: NounConfig = {
    id: "noun_head",
    isCountable: true,
    singularForm: "head",
    pluralForm: "heads",
    translation: "頭"
};

const configEar: NounConfig = {
    id: "noun_ear",
    isCountable: true,
    singularForm: "ear",
    pluralForm: "ears",
    translation: "耳"
};

const configMouth: NounConfig = {
    id: "noun_mouth",
    isCountable: true,
    singularForm: "mouth",
    pluralForm: "mouths",
    translation: "口"
};

const configFoot: NounConfig = {
    id: "noun_foot",
    isCountable: true,
    singularForm: "foot",
    pluralForm: "feet",
    translation: "足"
};

const configLeg: NounConfig = {
    id: "noun_leg",
    isCountable: true,
    singularForm: "leg",
    pluralForm: "legs",
    translation: "脚"
};

const configArm: NounConfig = {
    id: "noun_arm",
    isCountable: true,
    singularForm: "arm",
    pluralForm: "arms",
    translation: "腕"
};

const configBackPart: NounConfig = {
    id: "noun_back",
    isCountable: true,
    singularForm: "back",
    pluralForm: "backs",
    translation: "背中"
};

const configHeart: NounConfig = {
    id: "noun_heart",
    isCountable: true,
    singularForm: "heart",
    pluralForm: "hearts",
    translation: "心臓"
};

const configHealth: NounConfig = {
    id: "noun_health",
    isCountable: false,
    singularForm: "health",
    translation: "健康"
};

const configLove: NounConfig = {
    id: "noun_love",
    isCountable: false,
    singularForm: "love",
    translation: "愛"
};

const configPart: NounConfig = {
    id: "noun_part",
    isCountable: true,
    singularForm: "part",
    pluralForm: "parts",
    translation: "部分"
};

const configArea: NounConfig = {
    id: "noun_area",
    isCountable: true,
    singularForm: "area",
    pluralForm: "areas",
    translation: "地域"
};

const configState: NounConfig = {
    id: "noun_state",
    isCountable: true,
    singularForm: "state",
    pluralForm: "states",
    translation: "州"
};

const configService: NounConfig = {
    id: "noun_service",
    isCountable: true,
    singularForm: "service",
    pluralForm: "services",
    translation: "サービス"
};

const configLaw: NounConfig = {
    id: "noun_law",
    isCountable: true,
    singularForm: "law",
    pluralForm: "laws",
    translation: "法律"
};

const configPower: NounConfig = {
    id: "noun_power",
    isCountable: true,
    singularForm: "power",
    pluralForm: "powers",
    translation: "力"
};

const configExample: NounConfig = {
    id: "noun_example",
    isCountable: true,
    singularForm: "example",
    pluralForm: "examples",
    translation: "例"
};

const configKind: NounConfig = {
    id: "noun_kind",
    isCountable: true,
    singularForm: "kind",
    pluralForm: "kinds",
    translation: "種類"
};

const configKid: NounConfig = {
    id: "noun_kid",
    isCountable: true,
    singularForm: "kid",
    pluralForm: "kids",
    translation: "子供"
};

const configInterest: NounConfig = {
    id: "noun_interest",
    isCountable: true,
    singularForm: "interest",
    pluralForm: "interests",
    translation: "興味"
};

export const blockBook = generator.createNounBlock(configBook);
export const blockChild = generator.createNounBlock(configChild);
export const blockInformation = generator.createNounBlock(configInformation);
export const blockWater = generator.createNounBlock(configWater);
export const blockDog = generator.createNounBlock(configDog);
export const blockCat = generator.createNounBlock(configCat);
export const blockBird = generator.createNounBlock(configBird);
export const blockHand = generator.createNounBlock(configHand);
export const blockBag = generator.createNounBlock(configBag);
export const blockBush = generator.createNounBlock(configBush);
export const blockStudent = generator.createNounBlock(configStudent);
export const blockName = generator.createNounBlock(configName);
export const blockPen = generator.createNounBlock(configPen);
export const blockTeacher = generator.createNounBlock(configTeacher);
export const blockBus = generator.createNounBlock(configBus);
export const blockStation = generator.createNounBlock(configStation);
export const blockBoy = generator.createNounBlock(configBoy);
export const blockGirl = generator.createNounBlock(configGirl);
export const blockMan = generator.createNounBlock(configMan);
export const blockWoman = generator.createNounBlock(configWoman);
export const blockHouse = generator.createNounBlock(configHouse);
export const blockRoom = generator.createNounBlock(configRoom);
export const blockTable = generator.createNounBlock(configTable);
export const blockPhone = generator.createNounBlock(configPhone);
export const blockBathroom = generator.createNounBlock(configBathroom);
export const blockSchool = generator.createNounBlock(configSchool);
export const blockClassroom = generator.createNounBlock(configClassroom);
export const blockLesson = generator.createNounBlock(configLesson);
export const blockHomework = generator.createNounBlock(configHomework);
export const blockExam = generator.createNounBlock(configExam);
export const blockTextbook = generator.createNounBlock(configTextbook);
export const blockOffice = generator.createNounBlock(configOffice);
export const blockManager = generator.createNounBlock(configManager);
export const blockClient = generator.createNounBlock(configClient);
export const blockMeeting = generator.createNounBlock(configMeeting);
export const blockProject = generator.createNounBlock(configProject);
export const blockDeadline = generator.createNounBlock(configDeadline);
export const blockAirport = generator.createNounBlock(configAirport);
export const blockTicket = generator.createNounBlock(configTicket);
export const blockTrain = generator.createNounBlock(configTrain);
export const blockLuggage = generator.createNounBlock(configLuggage);
export const blockHotel = generator.createNounBlock(configHotel);
export const blockPassport = generator.createNounBlock(configPassport);
export const blockHospital = generator.createNounBlock(configHospital);
export const blockDoctor = generator.createNounBlock(configDoctor);
export const blockNurse = generator.createNounBlock(configNurse);
export const blockMedicine = generator.createNounBlock(configMedicine);
export const blockAppointment = generator.createNounBlock(configAppointment);
export const blockSymptom = generator.createNounBlock(configSymptom);
export const blockPatient = generator.createNounBlock(configPatient);
export const blockKitchen = generator.createNounBlock(configKitchen);
export const blockRecipe = generator.createNounBlock(configRecipe);
export const blockIngredient = generator.createNounBlock(configIngredient);
export const blockMeal = generator.createNounBlock(configMeal);
export const blockChef = generator.createNounBlock(configChef);
export const blockVegetable = generator.createNounBlock(configVegetable);
export const blockDessert = generator.createNounBlock(configDessert);
export const blockForest = generator.createNounBlock(configForest);
export const blockRiver = generator.createNounBlock(configRiver);
export const blockMountain = generator.createNounBlock(configMountain);
export const blockTree = generator.createNounBlock(configTree);
export const blockWeather = generator.createNounBlock(configWeather);
export const blockClimate = generator.createNounBlock(configClimate);
export const blockOcean = generator.createNounBlock(configOcean);
export const blockComputer = generator.createNounBlock(configComputer);
export const blockInternet = generator.createNounBlock(configInternet);
export const blockSoftware = generator.createNounBlock(configSoftware);
export const blockCamera = generator.createNounBlock(configCamera);
export const blockMessage = generator.createNounBlock(configMessage);
export const blockRobot = generator.createNounBlock(configRobot);
export const blockGame = generator.createNounBlock(configGame);
export const blockMatch = generator.createNounBlock(configMatch);
export const blockPlayer = generator.createNounBlock(configPlayer);
export const blockStadium = generator.createNounBlock(configStadium);
export const blockTeam = generator.createNounBlock(configTeam);
export const blockExercise = generator.createNounBlock(configExercise);
export const blockHobby = generator.createNounBlock(configHobby);
export const blockPerson = generator.createNounBlock(configPerson);
export const blockFamily = generator.createNounBlock(configFamily);
export const blockFriend = generator.createNounBlock(configFriend);
export const blockParent = generator.createNounBlock(configParent);
export const blockMother = generator.createNounBlock(configMother);
export const blockFather = generator.createNounBlock(configFather);
export const blockSon = generator.createNounBlock(configSon);
export const blockDaughter = generator.createNounBlock(configDaughter);
export const blockBaby = generator.createNounBlock(configBaby);
export const blockNeighbor = generator.createNounBlock(configNeighbor);
export const blockJob = generator.createNounBlock(configJob);
export const blockWork = generator.createNounBlock(configWork);
export const blockCompany = generator.createNounBlock(configCompany);
export const blockMoney = generator.createNounBlock(configMoney);
export const blockFood = generator.createNounBlock(configFood);
export const blockClothing = generator.createNounBlock(configClothing);
export const blockAir = generator.createNounBlock(configAir);
export const blockTimeConcept = generator.createNounBlock(configTimeConcept);
export const blockLife = generator.createNounBlock(configLife);
export const blockWorld = generator.createNounBlock(configWorld);
export const blockThing = generator.createNounBlock(configThing);
export const blockWay = generator.createNounBlock(configWay);
export const blockProblem = generator.createNounBlock(configProblem);
export const blockIdea = generator.createNounBlock(configIdea);
export const blockQuestion = generator.createNounBlock(configQuestion);
export const blockAnswer = generator.createNounBlock(configAnswer);
export const blockStory = generator.createNounBlock(configStory);
export const blockLanguage = generator.createNounBlock(configLanguage);
export const blockGrammar = generator.createNounBlock(configGrammar);
export const blockMusic = generator.createNounBlock(configMusic);
export const blockMovie = generator.createNounBlock(configMovie);
export const blockNews = generator.createNounBlock(configNews);
export const blockCity = generator.createNounBlock(configCity);
export const blockTown = generator.createNounBlock(configTown);
export const blockCountry = generator.createNounBlock(configCountry);
export const blockStreet = generator.createNounBlock(configStreet);
export const blockRoad = generator.createNounBlock(configRoad);
export const blockStore = generator.createNounBlock(configStore);
export const blockRestaurant = generator.createNounBlock(configRestaurant);
export const blockMarket = generator.createNounBlock(configMarket);
export const blockPark = generator.createNounBlock(configPark);
export const blockLibrary = generator.createNounBlock(configLibrary);
export const blockApartment = generator.createNounBlock(configApartment);
export const blockCar = generator.createNounBlock(configCar);
export const blockBicycle = generator.createNounBlock(configBicycle);
export const blockChair = generator.createNounBlock(configChair);
export const blockBed = generator.createNounBlock(configBed);
export const blockDoor = generator.createNounBlock(configDoor);
export const blockWindow = generator.createNounBlock(configWindow);
export const blockPlace = generator.createNounBlock(configPlace);
export const blockCase = generator.createNounBlock(configCase);
export const blockPoint = generator.createNounBlock(configPoint);
export const blockGovernment = generator.createNounBlock(configGovernment);
export const blockNumber = generator.createNounBlock(configNumber);
export const blockGroup = generator.createNounBlock(configGroup);
export const blockFact = generator.createNounBlock(configFact);
export const blockHome = generator.createNounBlock(configHome);
export const blockIssue = generator.createNounBlock(configIssue);
export const blockSide = generator.createNounBlock(configSide);
export const blockCommunity = generator.createNounBlock(configCommunity);
export const blockPresident = generator.createNounBlock(configPresident);
export const blockMinute = generator.createNounBlock(configMinute);
export const blockBody = generator.createNounBlock(configBody);
export const blockFace = generator.createNounBlock(configFace);
export const blockEye = generator.createNounBlock(configEye);
export const blockHead = generator.createNounBlock(configHead);
export const blockEar = generator.createNounBlock(configEar);
export const blockMouth = generator.createNounBlock(configMouth);
export const blockFoot = generator.createNounBlock(configFoot);
export const blockLeg = generator.createNounBlock(configLeg);
export const blockArm = generator.createNounBlock(configArm);
export const blockBack = generator.createNounBlock(configBackPart);
export const blockHeart = generator.createNounBlock(configHeart);
export const blockHealth = generator.createNounBlock(configHealth);
export const blockLove = generator.createNounBlock(configLove);
export const blockPart = generator.createNounBlock(configPart);
export const blockArea = generator.createNounBlock(configArea);
export const blockState = generator.createNounBlock(configState);
export const blockService = generator.createNounBlock(configService);
export const blockLaw = generator.createNounBlock(configLaw);
export const blockPower = generator.createNounBlock(configPower);
export const blockExample = generator.createNounBlock(configExample);
export const blockKind = generator.createNounBlock(configKind);
export const blockKid = generator.createNounBlock(configKid);
export const blockEnglish = generator.createProperNounBlock("English", "英語");
export const blockJapan = generator.createProperNounBlock("Japan", "日本");
export const blockInterest = generator.createNounBlock(configInterest);

export const blockJohn = generator.createProperNounBlock("John", "ジョン");
export const blockMary = generator.createProperNounBlock("Mary", "メアリー");

const peopleBlocks: Block[] = [
    blockPerson,
    blockMan,
    blockWoman,
    blockBoy,
    blockGirl,
    blockChild,
    blockKid,
    blockBaby,
    blockFamily,
    blockParent,
    blockMother,
    blockFather,
    blockSon,
    blockDaughter,
    blockFriend,
    blockNeighbor,
    blockName,
    blockJohn,
    blockMary,
];

const animalBlocks: Block[] = [
    blockDog,
    blockCat,
    blockBird,
];

const bodyAndHealthBlocks: Block[] = [
    blockBody,
    blockHead,
    blockFace,
    blockEye,
    blockEar,
    blockMouth,
    blockArm,
    blockHand,
    blockLeg,
    blockFoot,
    blockBack,
    blockHeart,
    blockHealth,
    blockHospital,
    blockDoctor,
    blockNurse,
    blockPatient,
    blockSymptom,
    blockMedicine,
    blockAppointment,
];

const homeBlocks: Block[] = [
    blockHome,
    blockHouse,
    blockApartment,
    blockRoom,
    blockBathroom,
    blockKitchen,
    blockTable,
    blockChair,
    blockBed,
    blockDoor,
    blockWindow,
    blockClothing,
    blockBag,
];

const foodBlocks: Block[] = [
    blockFood,
    blockMeal,
    blockRecipe,
    blockIngredient,
    blockVegetable,
    blockDessert,
    blockChef,
    blockRestaurant,
    blockMarket,
];

const educationAndWorkBlocks: Block[] = [
    blockSchool,
    blockClassroom,
    blockStudent,
    blockTeacher,
    blockLesson,
    blockHomework,
    blockExam,
    blockTextbook,
    blockGrammar,
    blockBook,
    blockPen,
    blockOffice,
    blockCompany,
    blockJob,
    blockWork,
    blockManager,
    blockClient,
    blockMeeting,
    blockProject,
    blockDeadline,
    blockService,
    blockMoney,
];

const travelBlocks: Block[] = [
    blockCar,
    blockBicycle,
    blockBus,
    blockTrain,
    blockStation,
    blockAirport,
    blockCountry,
    blockJapan,
    blockTicket,
    blockLuggage,
    blockHotel,
    blockPassport,
];

const societyBlocks: Block[] = [
    blockPlace,
    blockArea,
    blockCity,
    blockTown,
    blockCountry,
    blockState,
    blockCommunity,
    blockGroup,
    blockGovernment,
    blockPresident,
    blockLaw,
    blockStore,
    blockLibrary,
    blockPark,
    blockStreet,
    blockRoad,
];

const natureBlocks: Block[] = [
    blockWeather,
    blockClimate,
    blockAir,
    blockForest,
    blockRiver,
    blockMountain,
    blockTree,
    blockBush,
    blockOcean,
    blockWater,
];

const technologyAndMediaBlocks: Block[] = [
    blockPhone,
    blockComputer,
    blockInternet,
    blockSoftware,
    blockCamera,
    blockRobot,
    blockMessage,
    blockMusic,
    blockMovie,
    blockNews,
];

const sportsAndLeisureBlocks: Block[] = [
    blockTeam,
    blockPlayer,
    blockMatch,
    blockStadium,
    blockGame,
    blockExercise,
    blockHobby,
];

const abstractConceptBlocks: Block[] = [
    blockTimeConcept,
    blockMinute,
    blockLife,
    blockWorld,
    blockThing,
    blockPart,
    blockCase,
    blockPoint,
    blockFact,
    blockIssue,
    blockProblem,
    blockIdea,
    blockQuestion,
    blockAnswer,
    blockStory,
    blockLanguage,
    blockEnglish,
    blockPower,
    blockExample,
    blockKind,
    blockNumber,
    blockLove,
    blockWay,
    blockSide,
    blockInformation,
    blockInterest,
];

export const allNounBlocks: Block[] = [
    ...peopleBlocks,
    ...animalBlocks,
    ...bodyAndHealthBlocks,
    ...homeBlocks,
    ...foodBlocks,
    ...educationAndWorkBlocks,
    ...travelBlocks,
    ...societyBlocks,
    ...natureBlocks,
    ...technologyAndMediaBlocks,
    ...sportsAndLeisureBlocks,
    ...abstractConceptBlocks,
    ...timeBlocks,
];
