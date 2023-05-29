# Issue

## Why doesn't my asynchronous task complete?

Grunt use the `registerMultiTask` + `this.async()` + `done()`, if the done not execute, the `grunt` process will exit.

It's describe here : <https://gruntjs.com/frequently-asked-questions#why-doesn-t-my-asynchronous-task-complete>.

My test here (only about without done() ): <https://github.com/volnet/grunt-testasynctasks>

I check your code, you have write done in `.then(()=>done)` and `.catch(done)` in tasks/crx.js, but when I run my code with multi tasks, it is not stabled.

I add the interval timer to fix the bug.

## Why not pull request

> This repository has been archived by the owner on Sep 5, 2020. It is now read-only.

The repository not accept the pull request.
