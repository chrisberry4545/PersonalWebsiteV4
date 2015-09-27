(function () {
    'use strict';

    angular.module('projects', [])
           .service('projectsService', ['$q', ProjectsService]);

    function ProjectsService($q) {

        function ProjectElement(title, description, additionalDescBullets, image, imageAlt, link, linkName, linkIcon, skills, year, projFaIcon) {
            var self = this;
            self.title = title;
            self.description = description;
            self.additionalDescBullets = additionalDescBullets;
            self.image = image;
            self.imageAlt = imageAlt;
            self.link = link;
            self.linkName = linkName;
            self.linkIcon = linkIcon;
            self.skills = skills;
            self.year = year;
            self.projFaIcon = projFaIcon;

            self.githubLink = null;
            self.githubLinkText = viewOnGithubStr;
            self.githubLinkIcon = githubSVG;

            self.blurredImage = 'Images/GBC/GBCHomeBlurred.png';
        }

        var visitTheSiteStr = "To the site";
        var viewInPlayStoreStr = "Play store";
        var viewOnGithubStr = "GitHub";

        var timelineStartUrl = "Images/Timeline/";
        var generalStartUrl = "Images/General/";

        var cogsSVG = "cogs";
        var webSVG = "globe";
        var androidSVG = "android";
        var uniSVG = "university";
        var clockSVG = "clock-o";

        var githubSVG = "github";
        var globeSVG = "globe";
        var playSVG = "play";

        var bikeTrackerPebble = new ProjectElement(
            "London TFL Bike Point Tracker",
            "An app for Pebble Smartwatches which uses TFL data to find the bike point nearest to the user."
            + "The app then uses the watches compass to direct the user towards the bike point.",
            [

            ],
            "Images/PebbleBikeTracker/londonbike600x375.jpg",
            "Image of the app on pebble",
            null,
            null,
            null,
            ["C", "JavaScript"],
            "2015",
            clockSVG
            );
        bikeTrackerPebble.githubLink = 'https://github.com/chrisberry4545/BikeTracker';

        var gbc = new ProjectElement(
            "Great British Chefs",
            "Working as part of a small team we delivered a whole new site design and custom built CMS solution which will allow Great British Chefs to release stunning content on a fast and responsive site. My work included:",
            [
                "User registration and login (with Facebook integration)",
                "A complete user favouriting system (binder) which utilised HTML5 local storage alongside server storage to keep the site feeling fast",
                "User profile and settings",
                "A restaurant search web app",
                "Page recirculation",
                "Custom video players and image galleries",
                "Fast recipe filters",
                "Page templates (Recipes, Recipe Collections, Restaurants etc.)",
                "Mentoring Junior staff"
            ],
            "Images/GBC/GBCHome600x375.jpg",
            "Great British Chefs Homepage",
            "http://www.greatbritishchefs.com",
            visitTheSiteStr,
            globeSVG,
            ["C# (MVC)", "Javascript (KnockoutJS, JQuery)", "SQL", "CSS", "HTML"],
            "2015 - Present",
            cogsSVG);

        var houseOwage = new ProjectElement(
            "House owage web app",
            "Application I created to manage money with my housemates. It has solved the problem we had of tracking who owes who and provides useful information like payment histories.",
            [],
            "Images/HouseOwage/houseOwageScreenshot600x375.jpg",
            "Great British Chefs Homepage",
            null,
            null,
            null,
            ["C# (MVC)", "SQL", "Javascript", "CSS", "HTML"],
            "2015",
            webSVG);
        houseOwage.githubLink = "https://github.com/chrisberry4545/HouseOwage";

        var librarians = new ProjectElement(
            "The Librarians app",
            "The Librarians wanted to release their most recent EP as a mobile app. The app lets fans play the EP and read about the band. Features include:",
            [
                "Spinner to choose tracks",
                "Full music controls",
                "Tracks continue to play in a service when user leaves the app and can be accessed from the phone menu"
            ],
            "Images/Librarians/librariansTabletScreenshot600x375.jpg",
            "Librarians app phone screenshot",
            "https://play.google.com/store/apps/details?id=chris.librariansep",
            viewInPlayStoreStr,
            playSVG,
            ["Android"],
            "2014",
            androidSVG);
        librarians.githubLink = "https://github.com/chrisberry4545/LibrariansEP";


        var parabolaSoftware = new ProjectElement(
            "Parabola Software",
            "While working at Parabola I produced software for a range of clients, including colleges, charities and housing associations. This included:",
            [
                "An Online Enrolment Application for a college which communicates with their main SharePoint site using Web API 2. The solution was later extended to allow payments via WorldPay. I took full ownership of the project and handled most of the analysis and development.",
                "SharePoint layouts and controls for client websites.",
                "A cloud based web application for caretakers to record fire safety checks on a mobile device. Reports were created for their head office from this data.",
                "A cloud based web application for a charity to record details of contact with potential donors.",
                "Upgrading Parabola’s website to be responsive while remaining fully compatible with Orchard CMS.",
                "A tool to migrate data from Umbraco CMS to a SharePoint 2013 site.",
                "Upgrades to an MVC College application."
            ],
            "Images/Parabola/ParabolaTablet600x375.jpg",
            "Parabola responsive website screenshot",
            "http://www.parabolasoft.co.uk/",
            "To the company site",
            globeSVG,
            ["C# (Web API 2, MVC)", "Javascript (AngularJS, JQuery)", "SQL", "SharePoint", "CSS", "HTML"],
            "2013 - 2014",
            cogsSVG);

        var animalAdjetives = new ProjectElement(
            "Animal Adjectives",
            "Throbbing Goat, Lecherous Yellow Eyed Penguin and Soggy Great White Shark. "
                    + "Animal Adjectives entertains through combining random adjectives with random animals which can have hilarious outcomes. Other features include:",
            [
                "Sharing to Facebook",
                "New animal adjectives appear regularly as notifications",
                "Favourites",
                "Limited user settings"
            ],
            "Images/AnimalAdjectives/AATabletScreen600x375.jpg",
            "Animal Adjectives Screenshot - Crusty Birman",
            "https://play.google.com/store/apps/details?id=chrisb.animaladjectives&hl=en_GB",
            viewInPlayStoreStr,
            playSVG,
            ["Android"],
            "2014",
            androidSVG);
        animalAdjetives.githubLink = "https://github.com/chrisberry4545/AnimalAdjectives";

        var mtgMirror = new ProjectElement(
            "MTG Mirror",
            "MTG Mirror is a web app for fans of the popular card game Magic: the Gathering. It simulates certain aspects of the game for players to practice.",
            [
                "Proven to be a popular app with 40,000 - 80,000 sessions a month",
                "Single page app built using AngularJS, the app does all the processing on the client side",
                "Uses app manifest to cache most of the app so it runs quickly after initial load, and notifies users when an update has been downloaded, prompting them to refresh",
                "ChartJS used to display the player's stats"
            ],
            "Images/MTGMirror/draftSimScreenshot600x375.jpg",
            "Draft simulator screenshot",
            "http://mtgmirror.com",
            visitTheSiteStr,
            globeSVG,
            ["Javascript (AngularJS)", "CSS (Bootstrap)", "HTML"],
            "2013 - Present",
            webSVG);
        mtgMirror.githubLink = "https://github.com/chrisberry4545/MTGWeb";

        var dissertation = new ProjectElement(
            "MSc. Dissertation",
            "For my MSc. Dissertation I studied the application of Reinforced Learning through self play to the game of Monopoly. I used this technique to produce an artificial intelligence which performed well against humans in a game of Monopoly.",
            [],
            "Images/Dissertation/monopolycombined600x375.jpg",
            "Great British Chefs Homepage",
            "https://sites.google.com/site/chrisberry4545/dissertation",
            visitTheSiteStr,
            globeSVG,
            ["Java (Swing)"],
            "2013",
            uniSVG);

        var projects = [
            bikeTrackerPebble,
            gbc,
            houseOwage,
            parabolaSoftware,
            mtgMirror,
            librarians,
            animalAdjetives,
            dissertation
        ];
        
        function KeySkill(name, icon, skillbreakdown) {
            this.name = name;
            this.icon = icon;
            this.skillbreakdown = skillbreakdown;
        }
        var keySkills = [
            new KeySkill('C#',
                'fa-server',
                ['MVC', 'Entity Framework', 'Web Api 2', 'LINQ']),
            new KeySkill('Javascript',
                'fa-file-text',
                ['KnockoutJS', 'AngularJS', 'jQuery']),
            new KeySkill('CSS',
                'fa-css3',
                ['Sass']),
            new KeySkill('HTML', 'fa-html5', ''),
            new KeySkill('SQL',
                'fa-database',
                ''),
            new KeySkill('Android', 'fa-android', '')
        ];

        // Promise-based API
        return {
            loadAllProjects: function () {
                // Simulate async nature of real remote calls
                return $q.when(projects);
            },

            loadAllKeySkills: function() {
                return $q.when(keySkills);
            }
        };
    }

})();
