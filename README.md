# Piscine 4 Discord Bot

We the Piscine 4 people have created this!

## How do I contribute?

You will first have to clone this repository, and ensure that you are always on the latest changes by
periodically running `git pull`.

You will be working on features that you thought of on your own, or features that we have discussed
that you would love to try doing.

### How is code contribution flow done?

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
5. `git merge origin/main` - After I'm done, I will merge my changes with the remote version of
   the `main` branch and fix any merge conflicts along the way.
6. `git push` - I will then push my changes to the remote, my branch will then be uploaded to GitHub.
7. Create pull request - Creating pull request and setting the merge target to `main` branch.
8. Wait for approval.
9. Done!

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

Not to worry, the coding convention isn't too troublesome. It is recommended that you code
using Visual Studio Code as the recommended plugins can be found there.

This project will be utilizing `prettier`, which is essentially a code formatter that will automatically format your code.

Check out this [Article](https://www.digitalocean.com/community/tutorials/how-to-format-code-with-prettier-in-visual-studio-code) for a really informative way of using
prettier and tutorial on how to install and format.

At the root of the project, there will be a `.prettierrc` file which will determine the coding
style of this project, and ensuring that every code written and committed will look correct.

# All the best!

Good luck with coding! Feel free to ask any team members for information if you're confused about anything.
