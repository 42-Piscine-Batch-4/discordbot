# Piscine 4 Discord Bot

We the Piscine 4 people have created this!

# Getting Started

Thank you for choosing our Discord bot! Follow the steps below to set up and run the bot on your local machine.

## Prerequisites

Before getting started, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 16.x or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js installation)

<details>

<summary>Installing via NVM</summary>
   
   - After [installing nvm](https://github.com/nvm-sh/nvm/), run:
     
     - `nvm install --lts`
     - `nvm use --lts`
</details>

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/42-Piscine-Batch-4/discordbot.git
   ```

2. Navigate to the project directory:

   ```bash
   cd discordbot
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

#### Setting up the environmental variables

1. Create a `.env` file in the project's root directory (where the .gitignore file is)

2. Our goal is to make the `.env` file look something like this:

```env
BOT_TOKEN=SOMEVERYLONGSTRING
CLIENT_ID=SOMEVERYLONGSTRING
NIGHT_API_KEY=SOMEVERYLONGSTRING
```

3. To get the values, first go to the [application developer portal](https://discord.com/developers/applications) and click on "New Application".
4. You will now be in the bot application page. Under "SETTINGS" on the left panel, click "Bot" and click "Reset Token".

5. This will be your `BOT_TOKEN`. Copy it into your `.env` file.

6. Scroll down to `Privileged Gateway Intents` and enable everything inside.

7. Click on OAuth2 in the left panel. You will find your `CLIENT_ID` under "Client Information". Copy it into your `.env` file.

8. Check the pinned messages in our Discord's project channel for the `NIGHT_API_KEY`, then copy it into your `.env` file.

9. Go back to the Discord developer page.

10. Under Installation, set the Authorization Methods to Guild Install.

11. Under Install Link, click on the dropdown and select `Discord Provided Link`.

12. Under Default Install Settings, set the Guild Install scopes to `applications.commands` and `bot`, with permissions set to `Administrator`.

13. Now use the `Discord Provided Link` to add your bot to the server!

> [!NOTE]
> Do not share the contents in your `.env` file!

## Running the Bot

To run the bot in development mode, use the following command:

```bash
npm run dev
```

This will start the bot using `tsx` to watch for changes in the `src/index.ts` file and automatically restart the bot when changes are detected.

You will not have to recompile or exit the terminal when making changes, just save your files and your changes should reflect.

## Okay I have finished developing, how do I test it?

The command `npm run command` is provided in `package.json`.

You will just need to run `npm run command` on your terminal, and it will refresh the commands of the application.

This will transpile the TypeScript code into JavaScript and bundle it using `tsup`.

<details>
   <summary>[Alias examples]</summary>
   
This will make your life easier:

```bash
alias rdev="npm run command ; npm run dev"
```

NVM:

```bash
alias nvrdev="nvm use --lts ; npm run commands ; npm run dev"
```

</details>

## Usage

Once the bot is running, it will be ready to respond to commands in your Discord server. Invite the bot to your server using the OAuth2 URL generated by your Discord application.

# Contributing Guide

Thank you for considering contributing to our Discord bot project! Your contributions help improve the functionality and maintainability of the bot for everyone. Before you start contributing, please read through this guide to understand the contribution process.

## How to Contribute

### 1. Clone the Repository

Clone your repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/discordbot.git
```

### 2. Set Up Development Environment

Before making any changes, ensure you have Node.js and npm installed on your machine. Then, install project dependencies by running:

```bash
npm install
```

### 3. Making Changes

#### Adding a New Command

- If you're adding a new command, create a new TypeScript file for the command in the `src/commands` folder.
- Update the `index.ts` file in the `src/commands` folder to include the new command.

#### Testing Changes

- Run the bot in development mode using the following command:

  ```bash
  npm run command ; npm run dev
  ```

- Test your changes thoroughly to ensure they work as expected. Interact with the bot in your Discord server to verify the functionality of your changes.

### 4. Committing Changes

Once you're satisfied with your changes, commit them with descriptive commit messages. Make sure to follow the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) format if possible.

### 5. Push Changes

The `main` branch will be protected, so you will not be able to `git push` to it.

In order for your changes to apply, you will have to create **Pull Requests!**.
You can read more about it in this [Tutorial](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

> [!NOTE]
> Do not be afraid to try and mess around a bit. It is okay to make mistakes!

#### My usual flow

1. `git checkout main` - Going to main branch for the most updated released version.
2. `git pull` - Ensuring that my main branch is updated with the lastest changes.
3. `git checkout -b <branch_name>` - Create a new branch to make my changes.
4. I will then code and commit accordingly.
5. `git fetch && git merge origin/main` - After I'm done, I will merge my changes with the remote version of
   the `main` branch and fix any merge conflicts along the way.
6. `git push` - I will then push my changes to the remote, my branch will then be uploaded to GitHub.
7. Create pull request - Creating pull request and setting the merge target to `main` branch.
8. Wait for approval.
9. Done!

### 6. Create a Pull Request

Finally, navigate to your forked repository on GitHub and create a pull request (PR) from your branch to the `main` branch of the original repository. Provide a clear description of your changes in the PR.

## Code Review

Your PR will undergo a code review by project maintainers. They may provide feedback or request changes before merging your code into the main project.

## Conventions!

There are three conventions that are important in this project.

### Branch Names

Branch names should follow the branch naming convention of git.

_For example:_ `feat/add-emoji-support`.

Check out this [Article](https://medium.com/@shinjithkanhangad/git-good-best-practices-for-branch-naming-and-commit-messages-a903b9f08d68#:~:text=Branch%20Naming%20Conventions,-Basics&text=Use%20Hyphens%3A%20Use%20hyphens%20to,%2FfixLoginIssue%20or%20bugfix%2Ffix_login_issue.) for more information.

### Commit Names

Commit names follow the same convention as above.

_For example:_ `feat: add command to handle emoji inputs`.

Check out this [Article](https://www.conventionalcommits.org/en/v1.0.0/) for more information.

### Coding Conventions

Not to worry, the coding convention isn't too troublesome. It is recommended that you code using Visual Studio Code as the recommended plugins can be found there.

This project will be utilizing `prettier`, which is essentially a code formatter that will automatically format your code.

Check out this [Article](https://www.digitalocean.com/community/tutorials/how-to-format-code-with-prettier-in-visual-studio-code) for a really informative way of using
prettier and tutorial on how to install and format.

At the root of the project, there will be a `.prettierrc` file which will determine the coding
style of this project, and ensuring that every code written and committed will look correct.

## Conclusion

Thank you for contributing to our Discord bot project! Your contributions help improve the bot for all users. If you have any questions or need assistance, feel free to reach out to the project maintainers.

Happy coding!

# All the best!

Good luck with coding! Feel free to ask any team members for information if you're confused about anything.
