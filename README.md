# Wordle



## Description

Wordle is an emulation of the Wordle game run by the New York Times. In the game, the users get a limited number of guesses to identify an unknown five-letter reference word. Users guess the word by entering a valid five-letter word. Users get feedback on the letters within the word to guide their guesses. This feedback includes the following:
- A green highlighted letter means that the letter is in the reference word and in the correct location. 
- A yellow highlighted letter means that the letter is in the reference word but not in the correct location. 
- A black highlighted letter means that the letter is not in the reference word.

Our Wordle implementation allows the user to have six guesses. It also includes a variety of themed games, each with associated backgrounds and word lists. 

The frontend development of the application will utilize HTML and CSS. Each group member is also in SWE2511- Web Applications, so we will use this project to develop the HTML and CSS skills we learned in the class. The backend development of the application will utilize Python. Python is versatile and can easily be incorporated with the frontend of the application.

Challenges and additional features will be added here as we develop the project.

## Installation Instructions 

Before you can run Wordle, make sure that you have Python 3.7 or later installed on your machine. 

### Step 1: Clone the Repository

First, clone this repository to your local machine using `git`:

```git clone https://gitlab.com/msoe.edu/sdl/y24-swe2710-121-pez/pez-groupc.git```

### Step 2: Navigate to the Directory

Navigate to the cloned repository's directory:

```cd pez-groupc```

### Step 3: Install Live Server

On VS Code, go to the extensions tab and search for "Live Server". Install this extension to your machine.

```cd pez-groupc```

## Running the App

To start the server, right-click on the file and select "Run with live server"

Open your browser and navigate to http://localhost:5000 to start using Wordle!

## How to branch out and push back in

#### Create a New Branch
Before you start your work, it's a good practice to create a new branch. This ensures that the master branch only contains finalized, reviewed code.

```# Create a new branch and switch to it```
```git checkout -b <branch-name>```

You can check which branch you are in using
```git branch```

Then you can commit your changes 

```git add .```

```git commit -m "<message>"```

and then push your branch to a remote repo

```# Push your branch to the remote repository```

```git push -u origin <branch-name>```

Then it should create a PR which you can click on from the command line


## How to play Wordle

Wordle is a word puzzle game where players try to guess a five-letter word within six attempts. Start by guessing any five-letter word. After each guess, tiles change color: green for correct letters in the right spot, yellow for correct letters in the wrong spot, and gray for letters not in the word. Using these hints, adjust your guesses strategically. Aim to deduce the target word within your six tries.

## Team

### Ethan Houseworth

(913)-207-5180 

houseworthe@msoe.edu

### Kadie Degner

(262)379-4004

degnerk@msoe.edu

### Alton Wimer

(262)-233-0734 

wimera@msoe.edu

### Ryan Malvey

(651)-894-3350 

malveyr@msoe.edu

## Credits

The whole team worked on this project
